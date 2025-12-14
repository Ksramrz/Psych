import { Router } from 'express';
import { requireAuth, AuthenticatedRequest } from '../middleware/auth.js';
import { checkRateLimit } from '../services/ai/llmClient.js';
import { summarizeNotes } from '../services/ai/notesSummarizer.js';
import { supabase } from '../services/supabase.js';
import { z } from 'zod';

const router = Router();

const createNoteSchema = z.object({
  raw_notes: z.string().min(10),
});

// Create and summarize notes
router.post('/', requireAuth, async (req: AuthenticatedRequest, res): Promise<void> => {
  try {
    const { userId, user } = req;
    if (!userId || !user) {
      res.status(401).json({ error: 'Unauthorized' }); return;
    }

    // Check rate limit
    const rateLimit = checkRateLimit(userId, user.subscription_tier as any);
    if (!rateLimit.allowed) {
      res.status(429).json({
        error: 'Rate limit exceeded',
        resetIn: rateLimit.resetIn,
      });
      return;
    }

    // Validate input
    const validation = createNoteSchema.safeParse(req.body);
    if (!validation.success) {
      res.status(400).json({ error: validation.error.errors[0].message }); return;
    }

    const { raw_notes } = validation.data;

    // Check if user wants data storage
    const isTemporary = !user.data_storage_enabled;
    const expiresAt = isTemporary
      ? new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      : null;

    // Summarize notes with AI
    const summary = await summarizeNotes(raw_notes);
    const summaryText = formatSummary(summary);

    // Store in database
    const { data, error } = await supabase
      .from('session_notes')
      .insert({
        user_id: user.id,
        raw_notes,
        summary: summaryText,
        is_temporary: isTemporary,
        expires_at: expiresAt,
      })
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      res.status(500).json({ error: 'Failed to save notes' }); return;
    }

    res.json({ id: data.id, summary });
  } catch (error: any) {
    console.error('Notes summarization error:', error);
    res.status(500).json({ error: error.message || 'Failed to summarize notes' });
  }
});

function formatSummary(summary: any): string {
  return JSON.stringify(summary, null, 2);
}

// Get notes by ID
router.get('/:id', requireAuth, async (req: AuthenticatedRequest, res): Promise<void> => {
  try {
    const { userId, user } = req;
    if (!userId || !user) {
      res.status(401).json({ error: 'Unauthorized' }); return;
    }

    const { id } = req.params;

    const { data, error } = await supabase
      .from('session_notes')
      .select('*')
      .eq('id', id)
      .eq('user_id', user.id)
      .single();

    if (error || !data) {
      res.status(404).json({ error: 'Notes not found' }); return;
    }

    // Parse summary if it's JSON
    let parsedSummary = null;
    if (data.summary) {
      try {
        parsedSummary = JSON.parse(data.summary);
      } catch {
        parsedSummary = { text: data.summary };
      }
    }

    res.json({ ...data, summary: parsedSummary });
  } catch (error: any) {
    console.error('Get notes error:', error);
    res.status(500).json({ error: 'Failed to get notes' });
  }
});

// List user's notes
router.get('/', requireAuth, async (req: AuthenticatedRequest, res): Promise<void> => {
  try {
    const { userId, user } = req;
    if (!userId || !user) {
      res.status(401).json({ error: 'Unauthorized' }); return;
    }

    const { data, error } = await supabase
      .from('session_notes')
      .select('id, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
      res.status(500).json({ error: 'Failed to get notes' }); return;
    }

    res.json(data || []);
  } catch (error: any) {
    console.error('List notes error:', error);
    res.status(500).json({ error: 'Failed to list notes' });
  }
});

export default router;

