import { Router } from 'express';
import { requireAuth, AuthenticatedRequest } from '../middleware/auth.js';
import { checkRateLimit } from '../services/ai/llmClient.js';
import { generateReflection } from '../services/ai/supervisorReflection.js';
import { supabase } from '../services/supabase.js';
import { z } from 'zod';

const router = Router();

const createReflectionSchema = z.object({
  case_context: z.string().min(10),
});

// Create supervisor reflection
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
    const validation = createReflectionSchema.safeParse(req.body);
    if (!validation.success) {
      res.status(400).json({ error: validation.error.errors[0].message }); return;
    }

    const { case_context } = validation.data;

    // Check if user wants data storage
    const isTemporary = !user.data_storage_enabled;
    const expiresAt = isTemporary
      ? new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      : null;

    // Generate reflection with AI
    const reflectionResult = await generateReflection(case_context);

    // Store in database
    const { data, error } = await supabase
      .from('supervisor_reflections')
      .insert({
        user_id: user.id,
        case_context,
        reflection_result: reflectionResult,
        is_temporary: isTemporary,
        expires_at: expiresAt,
      })
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      res.status(500).json({ error: 'Failed to save reflection' }); return;
    }

    res.json({ id: data.id, reflection: reflectionResult });
  } catch (error: any) {
    console.error('Supervisor reflection error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate reflection' });
  }
});

// Get reflection by ID
router.get('/:id', requireAuth, async (req: AuthenticatedRequest, res): Promise<void> => {
  try {
    const { userId, user } = req;
    if (!userId || !user) {
      res.status(401).json({ error: 'Unauthorized' }); return;
    }

    const { id } = req.params;

    const { data, error } = await supabase
      .from('supervisor_reflections')
      .select('*')
      .eq('id', id)
      .eq('user_id', user.id)
      .single();

    if (error || !data) {
      res.status(404).json({ error: 'Reflection not found' }); return;
    }

    res.json(data);
  } catch (error: any) {
    console.error('Get reflection error:', error);
    res.status(500).json({ error: 'Failed to get reflection' });
  }
});

// List user's reflections
router.get('/', requireAuth, async (req: AuthenticatedRequest, res): Promise<void> => {
  try {
    const { userId, user } = req;
    if (!userId || !user) {
      res.status(401).json({ error: 'Unauthorized' }); return;
    }

    const { data, error } = await supabase
      .from('supervisor_reflections')
      .select('id, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
      res.status(500).json({ error: 'Failed to get reflections' }); return;
    }

    res.json(data || []);
  } catch (error: any) {
    console.error('List reflections error:', error);
    res.status(500).json({ error: 'Failed to list reflections' });
  }
});

export default router;

