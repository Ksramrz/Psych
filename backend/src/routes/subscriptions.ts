import { Router } from 'express';
import { requireAuth, AuthenticatedRequest } from '../middleware/auth.js';
import { supabase } from '../services/supabase.js';
import Stripe from 'stripe';

const router = Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-06-20',
});

// Get subscription plans
router.get('/plans', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    const plans = [
      {
        id: 'free',
        name: 'Free',
        price: 0,
        features: [
          '10 case analyses per month',
          '20 note summaries per month',
          '5 ethics checks per month',
          '5 supervisor reflections per month',
        ],
      },
      {
        id: 'pro',
        name: 'Pro',
        price: 29,
        features: [
          'Unlimited case analyses',
          'Unlimited note summaries',
          'Unlimited ethics checks',
          'Unlimited supervisor reflections',
          'Priority support',
        ],
      },
      {
        id: 'clinic',
        name: 'Clinic',
        price: 99,
        features: [
          'Everything in Pro',
          'Team collaboration',
          'Shared library',
          'Analytics dashboard',
          'Dedicated support',
        ],
      },
    ];

    res.json(plans);
  } catch (error: any) {
    console.error('Get plans error:', error);
    res.status(500).json({ error: 'Failed to get plans' });
  }
});

// Create checkout session
router.post('/checkout', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    const { userId, user } = req;
    if (!userId || !user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { planId } = req.body;

    if (!planId || planId === 'free') {
      return res.status(400).json({ error: 'Invalid plan' });
    }

    // In production, create Stripe products and prices
    // For MVP, we'll use a simplified approach
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `ClinicSense ${planId.charAt(0).toUpperCase() + planId.slice(1)}`,
            },
            recurring: {
              interval: 'month',
            },
            unit_amount: planId === 'pro' ? 2900 : 9900, // $29 or $99
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.FRONTEND_URL || 'https://clinic.cashvers.com'}/settings?success=true`,
      cancel_url: `${process.env.FRONTEND_URL || 'https://clinic.cashvers.com'}/settings?canceled=true`,
      client_reference_id: user.id,
      metadata: {
        userId: user.id,
        planId,
      },
    });

    res.json({ sessionId: session.id, url: session.url });
  } catch (error: any) {
    console.error('Checkout error:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

// Stripe webhook handler (raw body is already parsed by middleware)
router.post('/webhook', async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    return res.status(400).send('Missing signature or webhook secret');
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.userId;
        const planId = session.metadata?.planId;

        if (userId && planId) {
          await supabase
            .from('users')
            .update({ subscription_tier: planId })
            .eq('id', userId);
        }
        break;
      }

      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        // Handle subscription updates/deletions
        // Update user subscription tier based on status
        break;
      }

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  } catch (error: any) {
    console.error('Webhook handler error:', error);
    res.status(500).json({ error: 'Webhook handler failed' });
  }
});

export default router;

