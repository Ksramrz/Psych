# ClinicSense Testing Guide

## Test Servers Overview

ClinicSense runs on **two separate servers**:

1. **Frontend Server** (Next.js)
   - URL: `http://localhost:3000`
   - What it does: Serves the web interface users interact with
   - Technology: Next.js with React

2. **Backend Server** (Node.js/Express)
   - URL: `http://localhost:5000`
   - What it does: Handles API requests, AI processing, database operations
   - Technology: Express.js API server

## Quick Start (Without Environment Variables)

For initial testing, you can start the servers with minimal setup:

### Step 1: Install Dependencies

```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### Step 2: Create Basic Environment Files

**Frontend** - Create `frontend/.env.local`:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=test_key
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_SUPABASE_URL=test_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=test_key
```

**Backend** - Create `backend/.env`:
```env
NODE_ENV=development
PORT=5000
CLERK_SECRET_KEY=test_key
ANTHROPIC_API_KEY=test_key
SUPABASE_URL=test_url
SUPABASE_SERVICE_KEY=test_key
```

### Step 3: Start the Servers

**Terminal 1 - Start Backend:**
```bash
cd backend
npm run dev
```

You should see:
```
🚀 ClinicSense backend server running on http://localhost:5000
```

**Terminal 2 - Start Frontend:**
```bash
cd frontend
npm run dev
```

You should see:
```
  ▲ Next.js 14.x.x
  - Local:        http://localhost:3000
```

### Step 4: Test Basic Functionality

1. **Health Check**: Open http://localhost:5000/health
   - Should return: `{"status":"ok","message":"ClinicSense API is running"}`

2. **Frontend**: Open http://localhost:3000
   - Should show the ClinicSense landing page or redirect to sign-in

## Testing Without Full Setup

### What Works Without Real API Keys:

✅ **Frontend UI** - All pages and navigation
✅ **Backend Server** - Health check endpoint
✅ **Code Structure** - TypeScript compilation
✅ **Routing** - Page navigation

### What Requires Real API Keys:

❌ **Authentication** - Needs Clerk keys
❌ **AI Features** - Needs Anthropic API key
❌ **Database** - Needs Supabase credentials
❌ **Subscriptions** - Needs Stripe keys

## Getting Real Environment Variables

### 1. Clerk (Authentication) - FREE

1. Go to https://clerk.com
2. Sign up for free account
3. Create a new application
4. Copy:
   - **Publishable Key** (starts with `pk_test_`)
   - **Secret Key** (starts with `sk_test_`)
5. Set up webhook (optional for testing):
   - URL: `http://localhost:5000/api/webhooks/clerk`
   - Events: `user.created`, `user.updated`

### 2. Supabase (Database) - FREE

1. Go to https://supabase.com
2. Sign up for free account
3. Create a new project
4. Wait for project to initialize
5. Go to Settings > API
6. Copy:
   - **Project URL**
   - **anon public key**
   - **service_role key** (for backend)
7. Go to SQL Editor and run `docs/supabase-schema.sql`

### 3. Anthropic (Claude AI) - PAID (but cheap)

1. Go to https://console.anthropic.com
2. Sign up and add payment method
3. Create API key
4. Copy the key (starts with `sk-ant-`)

### 4. OpenAI (Embeddings) - OPTIONAL

1. Go to https://platform.openai.com
2. Sign up and add credits
3. Create API key
4. Copy the key (starts with `sk-`)

**Note**: If you don't have OpenAI key, the system will use a fallback embedding method (less accurate but works).

### 5. Stripe (Subscriptions) - OPTIONAL for MVP

1. Go to https://stripe.com
2. Sign up for account
3. Get API keys from Dashboard
4. Set up webhook endpoint

## Complete Environment Setup

Once you have all keys, update your environment files:

### `frontend/.env.local`
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_actual_key_here
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

### `backend/.env`
```env
NODE_ENV=development
PORT=5000

# Clerk
CLERK_SECRET_KEY=sk_test_your_actual_key_here
CLERK_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Anthropic (Claude)
ANTHROPIC_API_KEY=sk-ant-your_actual_key_here

# OpenAI (Optional - for embeddings)
OPENAI_API_KEY=sk-your_openai_key_here

# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your_service_role_key_here

# Stripe (Optional)
STRIPE_SECRET_KEY=sk_test_your_stripe_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_stripe_webhook_secret_here

# Frontend URL (for redirects)
FRONTEND_URL=http://localhost:3000
```

## Testing Workflow

### 1. Test Backend Health
```bash
curl http://localhost:5000/health
```
Expected: `{"status":"ok","message":"ClinicSense API is running"}`

### 2. Test Frontend
- Open http://localhost:3000
- Should see ClinicSense interface

### 3. Test Authentication (with Clerk)
- Click "Sign In"
- Create account or sign in
- Should redirect to dashboard

### 4. Test AI Features (with Anthropic key)
- Go to Dashboard
- Try "New Case Analysis"
- Enter test case data
- Submit and wait for AI response

### 5. Test Database (with Supabase)
- Create a case
- Check Supabase dashboard > Table Editor > cases
- Should see your case data

## Common Issues

### "Cannot connect to backend"
- Check backend is running on port 5000
- Verify `NEXT_PUBLIC_API_URL` in frontend `.env.local`

### "Authentication failed"
- Verify Clerk keys are correct
- Check webhook is set up (if using)

### "AI request failed"
- Check Anthropic API key
- Verify you have credits/balance
- Check rate limits

### "Database error"
- Verify Supabase credentials
- Check if schema is migrated
- Verify RLS policies are set

## Minimal Testing Setup

If you just want to see the UI without any backend:

1. Start frontend only: `cd frontend && npm run dev`
2. Visit http://localhost:3000
3. You'll see UI but features won't work without backend

## Next Steps After Setup

1. ✅ Test health endpoint
2. ✅ Test frontend loads
3. ✅ Set up Clerk and test auth
4. ✅ Set up Supabase and test database
5. ✅ Set up Anthropic and test AI features
6. ✅ Ingest some RAG documents
7. ✅ Test all 4 core features

## Need Help?

- Check `SETUP.md` for detailed setup instructions
- Check `README.md` for project overview
- Review error messages in terminal
- Check browser console for frontend errors
- Check backend terminal for API errors

