import { Router } from 'express';
import { requireAuth, AuthenticatedRequest } from '../middleware/auth.js';
import { checkRateLimit } from '../services/ai/llmClient.js';
import { checkEthics } from '../services/ai/ethicsChecker.js';
import { supabase } from '../services/supabase.js';
import { z } from 'zod';

const router = Router();

const createEthicsCheckSchema = z.object({
  question: z.string().min(10),
});

// Create ethics check
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
    const validation = createEthicsCheckSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ error: validation.error.errors[0].message });
    }

    const { question } = validation.data;

    // Check if user wants data storage
    const isTemporary = !user.data_storage_enabled;
    const expiresAt = isTemporary
      ? new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      : null;

    // Check ethics with AI
    const response = await checkEthics(question);

    // Store in database
    const { data, error } = await supabase
      .from('ethics_checks')
      .insert({
        user_id: user.id,
        question,
        response,
        risk_level: response.riskLevel,
        is_temporary: isTemporary,
        expires_at: expiresAt,
      })
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({ error: 'Failed to save ethics check' });
    }

    res.json({ id: data.id, response });
  } catch (error: any) {
    console.error('Ethics check error:', error);
    res.status(500).json({ error: error.message || 'Failed to check ethics' });
  }
});

// Get ethics check by ID
router.get('/:id', requireAuth, async (req: AuthenticatedRequest, res): Promise<void> => {
  try {
    const { userId, user } = req;
    if (!userId || !user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { id } = req.params;

    const { data, error } = await supabase
      .from('ethics_checks')
      .select('*')
      .eq('id', id)
      .eq('user_id', user.id)
      .single();

    if (error || !data) {
      return res.status(404).json({ error: 'Ethics check not found' });
    }

    res.json(data);
  } catch (error: any) {
    console.error('Get ethics check error:', error);
    res.status(500).json({ error: 'Failed to get ethics check' });
  }
});

// List user's ethics checks
router.get('/', requireAuth, async (req: AuthenticatedRequest, res): Promise<void> => {
  try {
    const { userId, user } = req;
    if (!userId || !user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { data, error } = await supabase
      .from('ethics_checks')
      .select('id, question, risk_level, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
      return res.status(500).json({ error: 'Failed to get ethics checks' });
    }

    res.json(data || []);
  } catch (error: any) {
    console.error('List ethics checks error:', error);
    res.status(500).json({ error: 'Failed to list ethics checks' });
  }
});

export default router;

