import { callClaude } from './llmClient.js';
import { loadPromptTemplate, buildPrompt, buildSystemPrompt } from './promptBuilder.js';

export interface NotesSummary {
  sessionOverview: string;
  keyTopics: string[];
  interventionsUsed: string[];
  clientResponse: string;
  progressNotes: string;
  followUpItems: string[];
  concerns: string[];
}

export async function summarizeNotes(
  rawNotes: string
): Promise<NotesSummary> {
  const template = loadPromptTemplate('notesSummary');
  const prompt = buildPrompt(template, {
    rawNotes,
  });

  const systemPrompt = buildSystemPrompt('Session Notes Summary');

  const response = await callClaude(prompt, systemPrompt);
  const content = response.content;

  // Parse the structured response
  const sessionOverview = extractField(content, 'Session Overview');
  const keyTopics = extractList(content, 'Key Topics Discussed');
  const interventions = extractList(content, 'Interventions Used');
  const clientResponse = extractField(content, 'Client Response');
  const progressNotes = extractField(content, 'Progress Notes');
  const followUpItems = extractList(content, 'Follow-up Items');
  const concerns = extractList(content, 'Concerns');

  return {
    sessionOverview,
    keyTopics,
    interventionsUsed: interventions,
    clientResponse,
    progressNotes,
    followUpItems,
    concerns,
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

