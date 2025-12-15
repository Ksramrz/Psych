import { supabase } from '../supabase.js';
import { generateEmbedding } from './embedder.js';

export interface RAGDocument {
  content: string;
  metadata: {
    source: string;
    type: 'dsm' | 'apa' | 'assessment' | 'intervention' | 'other';
    title?: string;
  };
}

export async function storeDocument(doc: RAGDocument): Promise<string> {
  try {
    // Generate embedding
    const embedding = await generateEmbedding(doc.content);

    // Store in database
    const { data, error } = await supabase
      .from('rag_documents')
      .insert({
        content: doc.content,
        metadata: doc.metadata,
        embedding: `[${embedding.join(',')}]`, // Format as PostgreSQL array
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data.id;
  } catch (error) {
    console.error('Error storing document:', error);
    throw error;
  }
}

export async function storeDocuments(docs: RAGDocument[]): Promise<string[]> {
  const ids: string[] = [];
  for (const doc of docs) {
    try {
      const id = await storeDocument(doc);
      ids.push(id);
    } catch (error) {
      console.error(`Error storing document ${doc.metadata.title}:`, error);
    }
  }
  return ids;
}



