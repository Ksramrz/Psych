import Anthropic from '@anthropic-ai/sdk';
import dotenv from 'dotenv';

dotenv.config();

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export interface TokenUsage {
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
}

export interface LLMResponse {
  content: string;
  usage: TokenUsage;
}

// Rate limiting: track requests per user
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMITS = {
  free: 10, // 10 requests per minute
  pro: 100, // 100 requests per minute
  clinic: 500, // 500 requests per minute
};

export function checkRateLimit(
  userId: string,
  tier: 'free' | 'pro' | 'clinic'
): { allowed: boolean; resetIn?: number } {
  const limit = RATE_LIMITS[tier];
  const now = Date.now();
  const userLimit = rateLimitMap.get(userId);

  if (!userLimit || now > userLimit.resetTime) {
    rateLimitMap.set(userId, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true };
  }

  if (userLimit.count >= limit) {
    return {
      allowed: false,
      resetIn: Math.ceil((userLimit.resetTime - now) / 1000),
    };
  }

  userLimit.count++;
  return { allowed: true };
}

export async function callClaude(
  prompt: string,
  systemPrompt?: string,
  maxTokens: number = 4096
): Promise<LLMResponse> {
  try {
    const message = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: maxTokens,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const content = message.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response type from Claude');
    }

    const usage = {
      inputTokens: message.usage.input_tokens,
      outputTokens: message.usage.output_tokens,
      totalTokens: message.usage.input_tokens + message.usage.output_tokens,
    };

    return {
      content: content.text,
      usage,
    };
  } catch (error: any) {
    if (error instanceof Anthropic.APIError) {
      throw new Error(`Claude API error: ${error.message}`);
    }
    throw error;
  }
}

// Token usage tracking for billing
const tokenUsageMap = new Map<string, TokenUsage[]>();

export function trackTokenUsage(userId: string, usage: TokenUsage) {
  const existing = tokenUsageMap.get(userId) || [];
  existing.push(usage);
  tokenUsageMap.set(userId, existing);
}

export function getUserTokenUsage(userId: string): TokenUsage {
  const usages = tokenUsageMap.get(userId) || [];
  return usages.reduce(
    (acc, usage) => ({
      inputTokens: acc.inputTokens + usage.inputTokens,
      outputTokens: acc.outputTokens + usage.outputTokens,
      totalTokens: acc.totalTokens + usage.totalTokens,
    }),
    { inputTokens: 0, outputTokens: 0, totalTokens: 0 }
  );
}



