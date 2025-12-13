import { callClaude, buildSystemPrompt } from './llmClient.js';
import { loadPromptTemplate, buildPrompt } from './promptBuilder.js';
import { retrieveRelevantDocuments, formatRetrievedContext } from '../rag/retriever.js';
import { generateEmbedding } from '../rag/embedder.js';

export interface EthicsCheckResponse {
  isEthical: boolean;
  riskLevel: 'low' | 'medium' | 'high';
  concerns: string[];
  recommendations: string[];
  explanation: string;
}

export async function checkEthics(
  question: string,
  ragContext?: string
): Promise<EthicsCheckResponse> {
  // Retrieve relevant ethical guidelines
  let retrievedContext = ragContext;
  if (!retrievedContext) {
    try {
      const queryEmbedding = await generateEmbedding(question);
      const documents = await retrieveRelevantDocuments(
        question,
        queryEmbedding,
        5,
        'apa' // Focus on APA ethical guidelines
      );
      retrievedContext = await formatRetrievedContext(documents);
    } catch (error) {
      console.error('RAG retrieval error:', error);
      retrievedContext = 'No additional context available.';
    }
  }

  const template = loadPromptTemplate('ethicsCheck');
  const prompt = buildPrompt(template, {
    question,
    ragContext: retrievedContext,
  });

  const systemPrompt = buildSystemPrompt('Ethical Check');

  const response = await callClaude(prompt, systemPrompt);
  const content = response.content;

  // Parse the structured response
  const isEthicalMatch = content.match(/Is This Ethical:\s*(Yes|No|Unclear)/i);
  const riskLevelMatch = content.match(/Risk Level:\s*(Low|Medium|High)/i);
  const concerns = extractList(content, 'Concerns');
  const recommendations = extractList(content, 'Recommendations');
  const explanation = extractField(content, 'Explanation');

  return {
    isEthical: isEthicalMatch?.[1]?.toLowerCase() === 'yes',
    riskLevel: (riskLevelMatch?.[1]?.toLowerCase() as 'low' | 'medium' | 'high') || 'medium',
    concerns,
    recommendations,
    explanation,
  };
}

function extractField(content: string, fieldName: string): string {
  const regex = new RegExp(`${fieldName}:\\s*([^]*?)(?=\\n- [A-Z]|\\n##|$)`, 'i');
  const match = content.match(regex);
  if (!match) return '';

  return match[1].trim();
}

function extractList(content: string, fieldName: string): string[] {
  const field = extractField(content, fieldName);
  if (!field) return [];

  return field
    .split('\n')
    .map((line) => line.replace(/^[-•]\s*/, '').trim())
    .filter((line) => line.length > 0);
}

