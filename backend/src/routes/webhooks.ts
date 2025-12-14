import { Router } from 'express';
import { Webhook } from 'svix';
import { syncUserFromClerk } from '../services/supabase.js';

const router = Router();

// Clerk webhook handler for user sync
router.post('/clerk', async (req, res): Promise<void> => {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    res.status(500).json({ error: 'Webhook secret not configured' }); return;
  }

  const headers = req.headers;
  const svix_id = headers['svix-id'] as string;
  const svix_timestamp = headers['svix-timestamp'] as string;
  const svix_signature = headers['svix-signature'] as string;

  if (!svix_id || !svix_timestamp || !svix_signature) {
    res.status(400).json({ error: 'Missing svix headers' }); return;
  }

  const payload = JSON.stringify(req.body);
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: any;

  try {
    evt = wh.verify(payload, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    });
  } catch (err) {
    console.error('Webhook verification failed:', err);
    res.status(400).json({ error: 'Verification failed' }); return;
  }

  const { id, email_addresses } = evt.data;
  const eventType = evt.type;

  // Handle user creation/update
  if (eventType === 'user.created' || eventType === 'user.updated') {
    const email = email_addresses?.[0]?.email_address;
    if (email) {
      try {
        await syncUserFromClerk(id, email);
        console.log(`Synced user ${id} to Supabase`);
      } catch (error) {
        console.error('Error syncing user:', error);
        res.status(500).json({ error: 'Failed to sync user' }); return;
      }
    }
  }

  res.json({ received: true });
});

export default router;

