import { Router } from 'express';
import { requireAuth, AuthenticatedRequest } from '../middleware/auth.js';
import { updateUserStoragePreference, exportUserData } from '../services/storage/dataManager.js';
import { z } from 'zod';

const router = Router();

const updateStorageSchema = z.object({
  data_storage_enabled: z.boolean(),
});

// Update storage preference
router.put('/storage', requireAuth, async (req: AuthenticatedRequest, res): Promise<void> => {
  try {
    const { userId, user } = req;
    if (!userId || !user) {
      res.status(401).json({ error: 'Unauthorized' }); return;
    }

    const validation = updateStorageSchema.safeParse(req.body);
    if (!validation.success) {
      res.status(400).json({ error: validation.error.errors[0].message }); return;
    }

    await updateUserStoragePreference(user.id, validation.data.data_storage_enabled);
    res.json({ message: 'Storage preference updated' });
  } catch (error: any) {
    console.error('Update storage preference error:', error);
    res.status(500).json({ error: 'Failed to update storage preference' });
  }
});

// Export user data
router.get('/export', requireAuth, async (req: AuthenticatedRequest, res): Promise<void> => {
  try {
    const { userId, user } = req;
    if (!userId || !user) {
      res.status(401).json({ error: 'Unauthorized' }); return;
    }

    const data = await exportUserData(user.id);
    res.json(data);
  } catch (error: any) {
    console.error('Export data error:', error);
    res.status(500).json({ error: 'Failed to export data' });
  }
});

export default router;

