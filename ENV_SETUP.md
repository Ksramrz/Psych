# Environment Variables Setup

## Your API Keys (Configured)

I've created `.env.production` files with your keys. However, you still need:

### 1. Supabase Service Key

You provided the **anon key**, but the backend needs the **service_role key**:

1. Go to Supabase Dashboard → Settings → API
2. Find "service_role" key (NOT the anon key)
3. Copy it - this has admin privileges
4. Add to `backend/.env.production` as `SUPABASE_SERVICE_KEY`

### 2. Clerk Webhook Secret

1. Go to Clerk Dashboard → Webhooks
2. Create webhook endpoint: `https://clinicsense-backend.onrender.com/api/webhooks/clerk`
3. Select events: `user.created`, `user.updated`
4. Copy the webhook secret
5. Add to `backend/.env.production` as `CLERK_WEBHOOK_SECRET`

### 3. Optional: OpenAI Key (for embeddings)

If you want better RAG embeddings:
- Get from https://platform.openai.com
- Add to `backend/.env.production` as `OPENAI_API_KEY`
- If not provided, system uses fallback (less accurate but works)

### 4. Optional: Stripe Keys (for subscriptions)

If you want payment features:
- Get from https://stripe.com
- Add to `backend/.env.production`

## Setting Up on Render

### Backend Service Environment Variables

Copy these to Render dashboard → Backend Service → Environment:

```env
NODE_ENV=production
PORT=10000
CLERK_SECRET_KEY=sk_test_cbM9zRJdTmsaxZKN807uC1V8HFL9acEB2buq3js7Eb
CLERK_WEBHOOK_SECRET=[Get from Clerk webhook setup]
ANTHROPIC_API_KEY=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
SUPABASE_URL=https://kklhhxuxinbkujvlfwsm.supabase.co
SUPABASE_SERVICE_KEY=[Get from Supabase - service_role key]
FRONTEND_URL=https://clinic.cashvers.com
```

### Frontend Service Environment Variables

Copy these to Render dashboard → Frontend Service → Environment:

```env
NODE_ENV=production
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_YW11c2VkLWdydWItMzEuY2xlcmsuYWNjb3VudHMuZGV2JA
NEXT_PUBLIC_API_URL=https://clinicsense-backend.onrender.com
NEXT_PUBLIC_SUPABASE_URL=https://kklhhxuxinbkujvlfwsm.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtrbGhoeHV4aW5ia3Vqdmxmd3NtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU3MTU3NzYsImV4cCI6MjA4MTI5MTc3Nn0.KceLNmXxYbttEg9IFJrPaeoyHC-Lgc8qLYuJ7ZTQjiY
```

## Important Notes

1. **Never commit `.env` files to git** - They're in `.gitignore`
2. **Service keys are sensitive** - Keep them secret
3. **Update webhook URL** after backend is deployed
4. **Test keys are fine for now** - Switch to production keys later

## Next Steps

1. Get Supabase service_role key
2. Set up Clerk webhook
3. Deploy to Render
4. Add environment variables in Render dashboard
5. Test deployment

