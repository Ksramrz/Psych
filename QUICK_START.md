# Quick Start Guide - ClinicSense

## 🚀 Fastest Way to Get Started

### Step 1: Install Dependencies (2 minutes)

```bash
# Frontend
cd frontend
npm install

# Backend  
cd ../backend
npm install
```

### Step 2: Create Minimal Environment Files

**Create `frontend/.env.local`:**
```bash
cd frontend
cat > .env.local << EOF
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=test
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_SUPABASE_URL=test
NEXT_PUBLIC_SUPABASE_ANON_KEY=test
EOF
```

**Create `backend/.env`:**
```bash
cd backend
cat > .env << EOF
NODE_ENV=development
PORT=5000
CLERK_SECRET_KEY=test
ANTHROPIC_API_KEY=test
SUPABASE_URL=test
SUPABASE_SERVICE_KEY=test
EOF
```

### Step 3: Start Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Step 4: Test

1. **Backend Health**: Open http://localhost:5000/health
   - ✅ Should show: `{"status":"ok","message":"ClinicSense API is running"}`

2. **Frontend**: Open http://localhost:3000
   - ✅ Should show ClinicSense interface

## 🎯 What You Can Test Right Now

### ✅ Works Without Real Keys:
- Frontend UI and navigation
- Backend server startup
- Health check endpoint
- Page routing
- Code compilation

### ❌ Needs Real Keys:
- User authentication (needs Clerk)
- AI features (needs Anthropic)
- Database operations (needs Supabase)
- Subscriptions (needs Stripe)

## 📝 Getting Real API Keys (When Ready)

### Free Services:
1. **Clerk** (Auth) - https://clerk.com - FREE
2. **Supabase** (Database) - https://supabase.com - FREE tier

### Paid Services (but cheap):
3. **Anthropic** (Claude AI) - https://console.anthropic.com - Pay per use (~$0.25/1M tokens)
4. **OpenAI** (Embeddings) - https://platform.openai.com - Optional, has fallback

### Optional:
5. **Stripe** (Payments) - https://stripe.com - Only needed for subscriptions

## 🔧 Quick Test Commands

```bash
# Test backend health
curl http://localhost:5000/health

# Check if ports are in use
lsof -i :3000  # Frontend
lsof -i :5000  # Backend

# View logs
# Backend terminal shows API requests
# Frontend terminal shows Next.js compilation
```

## 🐛 Troubleshooting

**Port already in use?**
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

**Dependencies not installing?**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**TypeScript errors?**
```bash
# Check types
cd frontend && npm run type-check
cd ../backend && npm run type-check
```

## 📚 Next Steps

1. ✅ Get servers running (you're here!)
2. 📖 Read `TESTING.md` for detailed testing guide
3. 🔑 Get API keys from `TESTING.md` section "Getting Real Environment Variables"
4. 🗄️ Set up Supabase database (run schema from `docs/supabase-schema.sql`)
5. 🧪 Test full functionality with real keys

## 💡 Pro Tips

- Keep both terminals open (one for frontend, one for backend)
- Backend must be running before frontend can make API calls
- Check terminal output for errors
- Browser console (F12) shows frontend errors
- Use `Ctrl+C` to stop servers

