# Quick Render Deployment Guide

## 🚀 Deploy Both Services to Render

### Step 1: Push to GitHub (5 min)

```bash
git init
git add .
git commit -m "Ready for Render deployment"
# Create repo on GitHub, then:
git remote add origin https://github.com/yourusername/clinicsense.git
git push -u origin main
```

### Step 2: Deploy Backend (10 min)

1. Go to https://render.com → "New +" → "Web Service"
2. Connect GitHub repo
3. Settings:
   - **Name**: `clinicsense-backend`
   - **Root Directory**: `backend`
   - **Build**: `npm install && npm run build`
   - **Start**: `npm start`
4. Add environment variables (see below)
5. Deploy → Note the URL

### Step 3: Deploy Frontend (10 min)

1. In Render → "New +" → "Web Service"
2. Connect same GitHub repo
3. Settings:
   - **Name**: `clinicsense-frontend`
   - **Root Directory**: `frontend`
   - **Build**: `npm install && npm run build`
   - **Start**: `npm start`
4. Add environment variables (see below)
5. Deploy

### Step 4: Add Custom Domain (5 min)

**Frontend:**
1. Settings → Custom Domains → Add `clinic.cashvers.com`
2. Copy DNS record shown

**Backend (Optional):**
1. Settings → Custom Domains → Add `api.clinic.cashvers.com`
2. Copy DNS record

### Step 5: Update DNS (5 min)

Add CNAME records in your DNS provider:
- `clinic` → Render's CNAME value
- `api.clinic` → Render's CNAME value (if using)

Wait 5-60 minutes for DNS propagation.

### Step 6: Update Webhooks (5 min)

**Clerk:**
- URL: `https://clinicsense-backend.onrender.com/api/webhooks/clerk`

**Stripe:**
- URL: `https://clinicsense-backend.onrender.com/api/subscriptions/webhook`

## Environment Variables

### Backend Service
```
NODE_ENV=production
PORT=10000
CLERK_SECRET_KEY=your_key
CLERK_WEBHOOK_SECRET=your_secret
ANTHROPIC_API_KEY=your_key
OPENAI_API_KEY=your_key
SUPABASE_URL=your_url
SUPABASE_SERVICE_KEY=your_key
STRIPE_SECRET_KEY=your_key
STRIPE_WEBHOOK_SECRET=your_secret
FRONTEND_URL=https://clinic.cashvers.com
```

### Frontend Service
```
NODE_ENV=production
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key
NEXT_PUBLIC_API_URL=https://clinicsense-backend.onrender.com
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
```

## Test

1. ✅ Backend: `https://clinicsense-backend.onrender.com/health`
2. ✅ Frontend: `https://clinic.cashvers.com` (after DNS)
3. ✅ Test authentication
4. ✅ Test features

## Total Time: ~40 minutes

## Notes

- Free tier: Services may spin down after 15 min inactivity
- First request after spin-down may be slow (~30 sec)
- Auto-deploy on git push to main
- View logs in Render dashboard

## Need Help?

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed guide.

