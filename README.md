# ClinicSense

AI-powered assistant for psychologists - supporting case analysis, session notes, ethical checks, and supervisor-style reflection.

## 🚀 Quick Start

**Local Testing:** See [QUICK_START.md](./QUICK_START.md)

**Production Deployment:** See [DEPLOYMENT.md](./DEPLOYMENT.md) or [RENDER_DEPLOYMENT.md](./RENDER_DEPLOYMENT.md) for deploying to `clinic.cashvers.com` on Render

**Testing Guide:** See [TESTING.md](./TESTING.md)

## Test Servers

ClinicSense runs on **two servers**:

1. **Frontend** (Next.js) → `http://localhost:3000`
   - User interface and pages
   
2. **Backend** (Express API) → `http://localhost:5000`
   - API endpoints, AI processing, database

## Quick Test (Without Environment Variables)

```bash
# 1. Install dependencies
cd frontend && npm install
cd ../backend && npm install

# 2. Create minimal .env files (see QUICK_START.md)

# 3. Start servers (in separate terminals)
cd backend && npm run dev    # Terminal 1
cd frontend && npm run dev   # Terminal 2

# 4. Test
# Open http://localhost:5000/health (backend health check)
# Open http://localhost:3000 (frontend)
```

## Project Structure

```
clinicsense/
├── frontend/     # Next.js application
├── backend/      # Node.js API server
├── shared/       # Shared types and utilities
└── docs/         # Documentation
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- (Optional) Supabase account
- (Optional) Clerk account  
- (Optional) Anthropic API key (Claude)

**Note**: You can start testing without API keys! See [QUICK_START.md](./QUICK_START.md)

### Setup

1. **Install dependencies**:
   ```bash
   # Frontend
   cd frontend
   npm install
   
   # Backend
   cd ../backend
   npm install
   ```

2. **Create environment files** (minimal for testing):
   - See [QUICK_START.md](./QUICK_START.md) for minimal setup
   - See [TESTING.md](./TESTING.md) for full setup with real keys

3. **Start development servers**:
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev
   
   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

4. **Access the application**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - Health Check: http://localhost:5000/health

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express, TypeScript
- **Database**: Supabase (PostgreSQL + Vectors)
- **Auth**: Clerk
- **AI**: Anthropic Claude Haiku
- **Payment**: Stripe
- **Hosting**: Render (Both Frontend & Backend)

## Features

- Case Analysis
- Session Notes Summaries
- Ethical & Professional Checks
- Supervisor-Style Reflection

## Deployment

**Production Domain**: `clinic.cashvers.com`

- Frontend: Deployed on Render → `https://clinic.cashvers.com`
- Backend: Deployed on Render → `https://api.clinic.cashvers.com` (or Render URL)
- See [DEPLOYMENT.md](./DEPLOYMENT.md) for full deployment guide

