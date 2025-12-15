import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function loadPromptTemplate(templateName: string): string {
  // Support both src/ (ts-node) and dist/ (compiled) by trying multiple roots
  const candidatePaths = [
    path.join(__dirname, '../../prompts', `${templateName}.md`),       // dist/services/ai -> dist/prompts (if copied)
    path.join(__dirname, '../../../prompts', `${templateName}.md`),    // dist/services/ai -> backend/prompts
    path.join(process.cwd(), 'prompts', `${templateName}.md`),         // cwd/prompts (runtime cwd = backend)
  ];

  for (const templatePath of candidatePaths) {
    try {
      if (fs.existsSync(templatePath)) {
        return fs.readFileSync(templatePath, 'utf-8');
      }
    } catch (error) {
      // continue to next path
    }
  }

  console.error(`Error loading prompt template ${templateName}: tried:`, candidatePaths);
  throw new Error(`Prompt template ${templateName} not found`);
}

export function buildPrompt(
  template: string,
  variables: Record<string, string>
): string {
  let prompt = template;
  for (const [key, value] of Object.entries(variables)) {
    prompt = prompt.replace(new RegExp(`{{${key}}}`, 'g'), value);
  }
  return prompt;
}

export function buildSystemPrompt(feature: string): string {
  const baseSystemPrompt = `You are ClinicSense, an AI assistant designed to support psychologists and mental health professionals. 

CRITICAL GUIDELINES:
- You are a SUPPORT TOOL, not a replacement for professional judgment
- NEVER provide definitive diagnoses - only suggest possible frameworks and differential diagnoses
- Always include disclaimers that your analysis is for support only
- Respect professional boundaries and ethical guidelines
- Be clear, structured, and professional in all responses
- Focus on evidence-based approaches and established frameworks

You are helping with: ${feature}`;

  return baseSystemPrompt;
}

