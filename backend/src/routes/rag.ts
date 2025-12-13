import { Router } from 'express';
import { requireAuth, AuthenticatedRequest } from '../middleware/auth.js';
import { storeDocuments } from '../services/rag/vectorStore.js';
import { z } from 'zod';

const router = Router();

const ingestDocumentSchema = z.object({
  content: z.string().min(10),
  metadata: z.object({
    source: z.string(),
    type: z.enum(['dsm', 'apa', 'assessment', 'intervention', 'other']),
    title: z.string().optional(),
  }),
});

// Ingest a document into the RAG system (admin only in production)
router.post('/ingest', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    const { userId, user } = req;
    if (!userId || !user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // In production, add admin check here
    // if (user.subscription_tier !== 'admin') {
    //   return res.status(403).json({ error: 'Forbidden' });
    // }

    const validation = ingestDocumentSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ error: validation.error.errors[0].message });
    }

    const id = await storeDocuments([validation.data]);
    res.json({ id: id[0], message: 'Document ingested successfully' });
  } catch (error: any) {
    console.error('Document ingestion error:', error);
    res.status(500).json({ error: 'Failed to ingest document' });
  }
});

// Batch ingest documents
router.post('/ingest/batch', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    const { userId, user } = req;
    if (!userId || !user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const documents = z.array(ingestDocumentSchema).parse(req.body);
    const ids = await storeDocuments(documents);
    res.json({ ids, message: `${ids.length} documents ingested successfully` });
  } catch (error: any) {
    console.error('Batch ingestion error:', error);
    res.status(500).json({ error: 'Failed to ingest documents' });
  }
});

export default router;

