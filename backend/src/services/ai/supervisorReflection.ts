import { callClaude, buildSystemPrompt } from './llmClient.js';
import { loadPromptTemplate, buildPrompt } from './promptBuilder.js';
import { retrieveRelevantDocuments, formatRetrievedContext } from '../rag/retriever.js';
import { generateEmbedding } from '../rag/embedder.js';

export interface ReflectionResult {
  reflectiveQuestions: string[];
  alternativePerspectives: string[];
  assessmentSuggestions: string[];
  interventionIdeas: string[];
  considerations: string[];
}

export async function generateReflection(
  caseContext: string,
  ragContext?: string
): Promise<ReflectionResult> {
  // Retrieve relevant documents for supervisor reflection
  let retrievedContext = ragContext;
  if (!retrievedContext) {
    try {
      const queryEmbedding = await generateEmbedding(caseContext);
      const documents = await retrieveRelevantDocuments(
        caseContext,
        queryEmbedding,
        5,
        undefined // Get all types for comprehensive reflection
      );
      retrievedContext = await formatRetrievedContext(documents);
    } catch (error) {
      console.error('RAG retrieval error:', error);
      retrievedContext = 'No additional context available.';
    }
  }

  const template = loadPromptTemplate('supervisorReflection');
  const prompt = buildPrompt(template, {
    caseContext,
    ragContext: retrievedContext,
  });

  const systemPrompt = buildSystemPrompt('Supervisor Reflection');

  const response = await callClaude(prompt, systemPrompt);
  const content = response.content;

  // Parse the structured response
  const reflectiveQuestions = extractList(content, 'Reflective Questions');
  const alternativePerspectives = extractList(content, 'Alternative Perspectives');
  const assessmentSuggestions = extractList(content, 'Assessment Suggestions');
  const interventionIdeas = extractList(content, 'Intervention Ideas');
  const considerations = extractList(content, 'Important Considerations');

  return {
    reflectiveQuestions,
    alternativePerspectives,
    assessmentSuggestions,
    interventionIdeas,
    considerations,
  };
}

function extractList(content: string, fieldName: string): string[] {
  const regex = new RegExp(
    `${fieldName}:\\s*([^]*?)(?=\\n- [A-Z]|\\n##|$)`,
    'i'
  );
  const match = content.match(regex);
  if (!match) return [];

  const sectionContent = match[1].trim();
  return sectionContent
    .split('\n')
    .map((line) => line.replace(/^[-•]\s*/, '').trim())
    .filter((line) => line.length > 0);
}

