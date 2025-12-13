import { supabase } from '../supabase.js';

export interface RetrievedDocument {
  id: string;
  content: string;
  metadata: {
    source: string;
    type: string;
    title?: string;
  };
  similarity?: number;
}

export async function retrieveRelevantDocuments(
  query: string,
  queryEmbedding: number[],
  limit: number = 5,
  documentType?: string
): Promise<RetrievedDocument[]> {
  let queryBuilder = supabase
    .from('rag_documents')
    .select('id, content, metadata')
    .limit(limit);

  // Filter by document type if specified
  if (documentType) {
    queryBuilder = queryBuilder.eq('metadata->>type', documentType);
  }

  // For MVP, we'll do a simple text search
  // In production with proper embeddings, use vector similarity search:
  // .select('id, content, metadata, embedding <-> $1 as similarity')
  // .order('similarity', { ascending: true })

  const { data, error } = await queryBuilder;

  if (error) {
    console.error('Error retrieving documents:', error);
    return [];
  }

  // Simple text-based relevance scoring for MVP
  const scored = (data || []).map((doc) => {
    const score = calculateTextSimilarity(query.toLowerCase(), doc.content.toLowerCase());
    return {
      ...doc,
      similarity: score,
    };
  });

  // Sort by similarity and return top results
  return scored
    .sort((a, b) => (b.similarity || 0) - (a.similarity || 0))
    .slice(0, limit)
    .map((doc) => ({
      id: doc.id,
      content: doc.content,
      metadata: doc.metadata as any,
      similarity: doc.similarity,
    }));
}

function calculateTextSimilarity(query: string, text: string): number {
  // Simple keyword matching for MVP
  // In production, use proper semantic similarity with embeddings
  const queryWords = query.split(/\s+/).filter((w) => w.length > 2);
  const textWords = text.split(/\s+/);
  
  let matches = 0;
  queryWords.forEach((word) => {
    if (textWords.some((tw) => tw.includes(word))) {
      matches++;
    }
  });

  return matches / queryWords.length;
}

export async function formatRetrievedContext(
  documents: RetrievedDocument[]
): Promise<string> {
  if (documents.length === 0) {
    return 'No relevant guidelines or resources found.';
  }

  const sections = documents.map((doc, index) => {
    const source = doc.metadata.source || 'Unknown';
    const type = doc.metadata.type || 'general';
    return `[${index + 1}] Source: ${source} (${type})\n${doc.content}\n`;
  });

  return sections.join('\n---\n\n');
}

