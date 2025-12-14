import { Router } from 'express';
import { requireAuth, AuthenticatedRequest } from '../middleware/auth.js';
import { checkRateLimit } from '../services/ai/llmClient.js';
import { analyzeCase } from '../services/ai/caseAnalyzer.js';
import { supabase } from '../services/supabase.js';
import { z } from 'zod';

const router = Router();

const createCaseSchema = z.object({
  title: z.string().min(1).max(200),
  case_content: z.string().min(10),
});

// Create and analyze a case
router.post('/', requireAuth, async (req: AuthenticatedRequest, res): Promise<void> => {
  try {
    const { userId, user } = req;
    if (!userId || !user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Check rate limit
    const rateLimit = checkRateLimit(userId, user.subscription_tier as any);
    if (!rateLimit.allowed) {
      return res.status(429).json({
        error: 'Rate limit exceeded',
        resetIn: rateLimit.resetIn,
      });
    }

    // Validate input
    const validation = createCaseSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ error: validation.error.errors[0].message });
    }

    const { title, case_content } = validation.data;

    // Check if user wants data storage
    const isTemporary = !user.data_storage_enabled;
    const expiresAt = isTemporary
      ? new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      : null;

    // Analyze case with AI
    const analysisResult = await analyzeCase(case_content);

    // Store in database
    const { data, error } = await supabase
      .from('cases')
      .insert({
        user_id: user.id,
        title,
        case_content,
        analysis_result: analysisResult,
        is_temporary: isTemporary,
        expires_at: expiresAt,
      })
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({ error: 'Failed to save case' });
    }

    res.json({ id: data.id, analysis: analysisResult });
  } catch (error: any) {
    console.error('Case analysis error:', error);
    res.status(500).json({ error: error.message || 'Failed to analyze case' });
  }
});

// Get a case by ID
router.get('/:id', requireAuth, async (req: AuthenticatedRequest, res): Promise<void> => {
  try {
    const { userId, user } = req;
    if (!userId || !user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { id } = req.params;

    const { data, error } = await supabase
      .from('cases')
      .select('*')
      .eq('id', id)
      .eq('user_id', user.id)
      .single();

    if (error || !data) {
      return res.status(404).json({ error: 'Case not found' });
    }

    res.json(data);
  } catch (error: any) {
    console.error('Get case error:', error);
    res.status(500).json({ error: 'Failed to get case' });
  }
});

// List user's cases
router.get('/', requireAuth, async (req: AuthenticatedRequest, res): Promise<void> => {
  try {
    const { userId, user } = req;
    if (!userId || !user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { data, error } = await supabase
      .from('cases')
      .select('id, title, created_at, updated_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
      return res.status(500).json({ error: 'Failed to get cases' });
    }

    res.json(data || []);
  } catch (error: any) {
    console.error('List cases error:', error);
    res.status(500).json({ error: 'Failed to list cases' });
  }
});

export default router;

