# Deployment Guide - Render (Both Frontend & Backend)

## Overview

Deploy both ClinicSense frontend and backend to Render.

**Architecture:**
- Frontend: Render Web Service → `clinic.cashvers.com`
- Backend: Render Web Service → `api.clinic.cashvers.com` (or subdomain)

## Prerequisites

1. Domain: `cashvers.com` (you have this)
2. Render account (free tier works) - https://render.com
3. GitHub repository

## Step 1: Push Code to GitHub

```bash
# Initialize git if not already done
git init
git add .
git commit -m "Ready for Render deployment"

# Create GitHub repo and push
git remote add origin https://github.com/yourusername/clinicsense.git
git push -u origin main
```

## Step 2: Deploy Backend to Render

### 2.1 Create Backend Service

1. Go to https://render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `clinicsense-backend`
   - **Environment**: `Node`
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Instance Type**: Free (or paid for better performance)

### 2.2 Set Environment Variables

Add these in Render dashboard → Environment:

```env
NODE_ENV=production
PORT=10000
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret
ANTHROPIC_API_KEY=your_anthropic_key
OPENAI_API_KEY=your_openai_key
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_KEY=your_supabase_service_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
FRONTEND_URL=https://clinic.cashvers.com
```

### 2.3 Deploy Backend

Click "Create Web Service" - Render will build and deploy.

**Note the backend URL** (e.g., `https://clinicsense-backend.onrender.com`)

### 2.4 (Optional) Add Custom Domain for Backend

1. In Render → Settings → Custom Domains
2. Add `api.clinic.cashvers.com`
3. Update DNS (see Step 5)

## Step 3: Deploy Frontend to Render

### 3.1 Create Frontend Service

1. In Render dashboard, click "New +" → "Web Service"
2. Connect same GitHub repository
3. Configure:
   - **Name**: `clinicsense-frontend`
   - **Environment**: `Node`
   - **Region**: Same as backend
   - **Branch**: `main`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Instance Type**: Free (or paid)

### 3.2 Set Environment Variables

Add these in Render dashboard → Environment:

```env
NODE_ENV=production
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
NEXT_PUBLIC_API_URL=https://clinicsense-backend.onrender.com
# OR if you set up custom domain:
# NEXT_PUBLIC_API_URL=https://api.clinic.cashvers.com
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3.3 Deploy Frontend

Click "Create Web Service" - Render will build and deploy.

## Step 4: Configure Custom Domains

### 4.1 Frontend Domain (clinic.cashvers.com)

1. In Render → Frontend Service → Settings → Custom Domains
2. Add `clinic.cashvers.com`
3. Render will show DNS records to add

### 4.2 Backend Domain (api.clinic.cashvers.com) - Optional

1. In Render → Backend Service → Settings → Custom Domains
2. Add `api.clinic.cashvers.com`
3. Render will show DNS records

## Step 5: Update DNS Records

Go to your domain provider (where you manage cashvers.com) and add:

### For Frontend (clinic.cashvers.com)

**Option A - CNAME (Recommended):**
```
Type: CNAME
Name: clinic
Value: [Render's provided CNAME value]
TTL: 3600
```

**Option B - A Record:**
```
Type: A
Name: clinic
Value: [Render's provided IP addresses]
TTL: 3600
```

### For Backend (api.clinic.cashvers.com) - If using custom domain

```
Type: CNAME
Name: api.clinic
Value: [Render's provided CNAME value]
TTL: 3600
```

**Wait for DNS propagation** (5 minutes to 1 hour, usually)

## Step 6: Update Webhooks

### 6.1 Clerk Webhook

1. Go to Clerk Dashboard → Webhooks
2. Update webhook URL:
   - `https://clinicsense-backend.onrender.com/api/webhooks/clerk`
   - (Or `https://api.clinic.cashvers.com/api/webhooks/clerk` if using custom domain)
3. Update webhook secret in Render environment variables

### 6.2 Stripe Webhook (if using)

1. Go to Stripe Dashboard → Webhooks
2. Add endpoint:
   - URL: `https://clinicsense-backend.onrender.com/api/subscriptions/webhook`
   - Events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
3. Copy webhook secret to Render environment variables

## Step 7: Test Deployment

### 7.1 Test Backend

```bash
curl https://clinicsense-backend.onrender.com/health
# Should return: {"status":"ok","message":"ClinicSense API is running",...}
```

### 7.2 Test Frontend

1. Visit `https://clinic.cashvers.com` (after DNS propagates)
2. Should see ClinicSense interface
3. Check browser console for errors
4. Test authentication
5. Test features

### 7.3 Test API Connection

1. Open browser console (F12)
2. Check Network tab
3. Try using a feature
4. Verify API calls go to backend URL

## Step 8: Database Setup

### 8.1 Run Supabase Schema

1. Go to Supabase Dashboard → SQL Editor
2. Run the schema from `docs/supabase-schema.sql`
3. Verify tables are created

### 8.2 Ingest Initial RAG Documents

Use the ingestion API or Supabase dashboard to add initial knowledge base documents.

## Render-Specific Notes

### Free Tier Limitations

- Services may spin down after 15 minutes of inactivity
- First request after spin-down may be slow (~30 seconds)
- Consider paid tier for production use

### Auto-Deploy

- Render auto-deploys on git push to main branch
- Check "Auto-Deploy" in service settings

### Environment Variables

- Set in Render dashboard (not in code)
- Different values for different environments (staging/production)

### Logs

- View logs in Render dashboard
- Real-time logs available
- Useful for debugging

## Troubleshooting

### Services Not Starting

- Check Render logs for errors
- Verify all environment variables are set
- Check build logs for compilation errors

### DNS Not Working

- Wait longer (DNS can take up to 48 hours)
- Check DNS records are correct
- Use `dig clinic.cashvers.com` to check propagation

### CORS Errors

- Verify `NEXT_PUBLIC_API_URL` matches backend URL
- Check backend CORS settings allow frontend domain
- Check browser console for specific CORS error

### Slow First Request

- Normal on free tier (service spinning up)
- Consider paid tier for better performance
- Or use a ping service to keep services warm

### Build Failures

- Check build logs in Render
- Verify all dependencies are in package.json
- Check for TypeScript errors
- Ensure Node.js version is compatible

## Environment Variables Summary

### Backend Service
```
NODE_ENV=production
PORT=10000
CLERK_SECRET_KEY
CLERK_WEBHOOK_SECRET
ANTHROPIC_API_KEY
OPENAI_API_KEY
SUPABASE_URL
SUPABASE_SERVICE_KEY
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
FRONTEND_URL=https://clinic.cashvers.com
```

### Frontend Service
```
NODE_ENV=production
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
NEXT_PUBLIC_API_URL
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

## Quick Checklist

- [ ] Code pushed to GitHub
- [ ] Backend service created on Render
- [ ] Backend environment variables set
- [ ] Backend deployed successfully
- [ ] Frontend service created on Render
- [ ] Frontend environment variables set
- [ ] Frontend deployed successfully
- [ ] Custom domain `clinic.cashvers.com` added to frontend
- [ ] DNS records updated
- [ ] DNS propagated (check with dig/nslookup)
- [ ] Clerk webhook updated
- [ ] Stripe webhook updated (if using)
- [ ] Backend health check works
- [ ] Frontend loads correctly
- [ ] Authentication works
- [ ] API calls work
- [ ] All features tested

## Cost

- **Free Tier**: Both services free (with limitations)
- **Paid Tier**: ~$7/month per service = ~$14/month total
- **Recommended**: Start with free, upgrade if needed

## Next Steps After Deployment

1. Test all features end-to-end
2. Monitor error logs
3. Set up monitoring/alerts (optional)
4. Ingest knowledge base documents
5. Test with real users
6. Consider upgrading to paid tier for production

## Support

- Render Docs: https://render.com/docs
- Render Status: https://status.render.com
- Check deployment logs in Render dashboard
