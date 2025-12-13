import { callClaude, buildSystemPrompt } from './llmClient.js';
import { loadPromptTemplate, buildPrompt } from './promptBuilder.js';
import { retrieveRelevantDocuments, formatRetrievedContext } from '../rag/retriever.js';
import { generateEmbedding } from '../rag/embedder.js';

export interface CaseAnalysisResult {
  insights: string[];
  patterns: string[];
  possibleFrameworks: string[];
  differentialDiagnoses: string[];
  interventionSuggestions: string[];
  assessmentRecommendations: string[];
  disclaimer: string;
}

export async function analyzeCase(
  caseContent: string,
  ragContext?: string
): Promise<CaseAnalysisResult> {
  // Retrieve relevant documents from RAG
  let retrievedContext = ragContext;
  if (!retrievedContext) {
    try {
      const queryEmbedding = await generateEmbedding(caseContent);
      const documents = await retrieveRelevantDocuments(
        caseContent,
        queryEmbedding,
        5,
        undefined // Get all types
      );
      retrievedContext = await formatRetrievedContext(documents);
    } catch (error) {
      console.error('RAG retrieval error:', error);
      retrievedContext = 'No additional context available.';
    }
  }

  const template = loadPromptTemplate('caseAnalysis');
  const prompt = buildPrompt(template, {
    caseContent,
    ragContext: retrievedContext,
  });

  const systemPrompt = buildSystemPrompt('Case Analysis');

  const response = await callClaude(prompt, systemPrompt);

  // Parse the structured response
  // In a real implementation, you might want to use structured output or JSON mode
  // For now, we'll parse the markdown-style response
  const content = response.content;

  // Extract sections from the response
  const insights = extractSection(content, 'Key Insights');
  const patterns = extractSection(content, 'Patterns Identified');
  const frameworks = extractSection(content, 'Possible Frameworks');
  const diagnoses = extractSection(content, 'Differential Diagnoses');
  const interventions = extractSection(content, 'Intervention Suggestions');
  const assessments = extractSection(content, 'Assessment Recommendations');
  const disclaimer = extractSection(content, 'Important Disclaimer')[0] || '';

  return {
    insights,
    patterns,
    possibleFrameworks: frameworks,
    differentialDiagnoses: diagnoses,
    interventionSuggestions: interventions,
    assessmentRecommendations: assessments,
    disclaimer,
  };
}

function extractSection(content: string, sectionName: string): string[] {
  const regex = new RegExp(
    `${sectionName}:\\s*([^]*?)(?=\\n- [A-Z]|\\n##|$)`,
    'i'
  );
  const match = content.match(regex);
  if (!match) return [];

  const sectionContent = match[1].trim();
  // Split by lines and filter out empty lines
  return sectionContent
    .split('\n')
    .map((line) => line.replace(/^[-•]\s*/, '').trim())
    .filter((line) => line.length > 0);
}

