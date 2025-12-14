import dotenv from 'dotenv';

dotenv.config();

// Claude uses a different embedding model, but for now we'll use text-embedding-3-small from OpenAI
// or we can use Supabase's built-in embeddings
// For MVP, we'll use a simple approach with OpenAI embeddings or Supabase's pgvector

export async function generateEmbedding(text: string): Promise<number[]> {
  // For MVP, we'll use OpenAI's embedding API or Supabase's built-in embeddings
  // Since we're using Supabase, we can use their embedding function
  // For now, return a placeholder - in production, use OpenAI or Supabase embeddings
  
  // Using OpenAI embeddings (you'll need to add openai package)
  // For now, we'll create a simple hash-based embedding for MVP
  // In production, replace this with actual embeddings
  
  // Placeholder: In production, use OpenAI or Supabase embedding service
  // This is a simplified version - replace with actual embedding generation
  const response = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY || ''}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'text-embedding-3-small',
      input: text,
    }),
  });

  if (!response.ok) {
    // Fallback: return a simple hash-based embedding
    console.warn('Embedding API not available, using fallback');
    return generateFallbackEmbedding(text);
  }

  const data = await response.json() as { data: Array<{ embedding: number[] }> };
  return data.data[0].embedding;
}

function generateFallbackEmbedding(text: string): number[] {
  // Simple hash-based embedding for MVP (not production-ready)
  // In production, always use proper embeddings
  const embedding = new Array(1536).fill(0);
  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i);
    embedding[charCode % 1536] += 0.1;
  }
  return embedding;
}

