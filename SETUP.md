# ClinicSense Setup Guide

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Supabase account (free tier works)
- Clerk account (free tier works)
- Anthropic API key (Claude)
- OpenAI API key (for embeddings - optional, fallback available)
- Stripe account (for subscriptions - optional for MVP)

## Initial Setup

### 1. Clone and Install Dependencies

```bash
cd frontend
npm install

cd ../backend
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to SQL Editor
3. Run the schema from `docs/supabase-schema.sql`
4. Enable pgvector extension:
   ```sql
   CREATE EXTENSION IF NOT EXISTS vector;
   ```
5. Copy your project URL and service key from Settings > API

### 3. Set Up Clerk

1. Create an application at [clerk.com](https://clerk.com)
2. Copy your publishable key and secret key
3. Set up webhook endpoint:
   - URL: `http://localhost:5000/api/webhooks/clerk` (or your production URL)
   - Events: `user.created`, `user.updated`
   - Copy webhook secret

### 4. Get API Keys

1. **Anthropic (Claude)**: Sign up at [console.anthropic.com](https://console.anthropic.com)
2. **OpenAI** (optional): For embeddings at [platform.openai.com](https://platform.openai.com)
3. **Stripe** (optional): For subscriptions at [stripe.com](https://stripe.com)

### 5. Configure Environment Variables

**Frontend** (`frontend/.env.local`):
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Backend** (`backend/.env`):
```env
NODE_ENV=development
PORT=5000
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret
ANTHROPIC_API_KEY=your_anthropic_key
OPENAI_API_KEY=your_openai_key (optional)
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_KEY=your_supabase_service_key
STRIPE_SECRET_KEY=your_stripe_secret_key (optional)
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret (optional)
FRONTEND_URL=http://localhost:3000
```

## Running the Application

### Development Mode

**Terminal 1 - Frontend**:
```bash
cd frontend
npm run dev
```
Runs on http://localhost:3000

**Terminal 2 - Backend**:
```bash
cd backend
npm run dev
```
Runs on http://localhost:5000

### Production Build

**Frontend**:
```bash
cd frontend
npm run build
npm start
```

**Backend**:
```bash
cd backend
npm run build
npm start
```

## Initial Knowledge Base Setup

To populate the RAG system with initial documents:

1. Use the ingestion API:
```bash
POST /api/rag/ingest
{
  "content": "Document content...",
  "metadata": {
    "source": "DSM-5",
    "type": "dsm",
    "title": "Major Depressive Disorder"
  }
}
```

2. Or use batch ingestion:
```bash
POST /api/rag/ingest/batch
[
  { "content": "...", "metadata": {...} },
  { "content": "...", "metadata": {...} }
]
```

## Testing

1. **Health Check**: Visit http://localhost:5000/health
2. **Frontend**: Visit http://localhost:3000
3. **Auth Flow**: Sign up/login through Clerk
4. **Features**: Test all 4 core features:
   - Case Analysis
   - Notes Summarization
   - Ethics Check
   - Supervisor Reflection

## Troubleshooting

### Database Connection Issues
- Verify Supabase credentials
- Check if pgvector extension is enabled
- Ensure RLS policies are set correctly

### Authentication Issues
- Verify Clerk keys are correct
- Check webhook endpoint is accessible
- Ensure user sync is working

### AI API Issues
- Verify Anthropic API key
- Check rate limits
- Ensure prompts are loading correctly

### RAG Issues
- Verify embeddings are being generated
- Check vector search is working
- Ensure documents are properly ingested

## Next Steps

1. Ingest initial knowledge base documents (DSM, APA guidelines, etc.)
2. Set up production environment variables
3. Deploy frontend to Vercel
4. Deploy backend to Render
5. Configure production webhooks
6. Test with real psychologists

## Support

For issues or questions, check the documentation in the `docs/` folder.

