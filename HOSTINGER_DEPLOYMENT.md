# Hostinger Shared Hosting Deployment Guide
## clinic.cashvers.com

### Prerequisites
- Hostinger shared hosting with Node.js support
- SSH access (usually available in Hostinger)
- Domain: clinic.cashvers.com configured

## Step 1: Access Your Hostinger Account

1. Log into Hostinger hPanel
2. Go to **Advanced** → **SSH Access** (or **File Manager**)
3. Note your server details

## Step 2: Set Up Subdomain

1. In hPanel → **Domains** → **Subdomains**
2. Create subdomain: `clinic`
3. Document root: `public_html/clinic` (or similar)
4. Wait for DNS propagation

## Step 3: Connect via SSH

```bash
ssh your_username@your_server_ip
# Or use Hostinger's SSH terminal in hPanel
```

## Step 4: Install Node.js (if not already installed)

Hostinger should have Node.js, but verify:
```bash
node --version
npm --version
```

If not installed, contact Hostinger support or check their Node.js setup guide.

## Step 5: Upload Your Code

### Option A: Via Git (Recommended)

```bash
cd ~/domains/clinic.cashvers.com/public_html
# Or wherever your subdomain directory is

git clone https://github.com/Ksramrz/Psych.git .
```

### Option B: Via File Manager

1. Upload all files via Hostinger File Manager
2. Extract to `public_html/clinic/`

## Step 6: Set Up Backend

```bash
cd backend

# Install dependencies
npm install

# Create .env file
nano .env
```

**Add to .env:**
```env
NODE_ENV=production
PORT=5000
CLERK_SECRET_KEY=[Your Clerk secret key]
CLERK_WEBHOOK_SECRET=[Get from Clerk webhook]
ANTHROPIC_API_KEY=[Your Anthropic API key]
SUPABASE_URL=https://kklhhxuxinbkujvlfwsm.supabase.co
SUPABASE_SERVICE_KEY=[Get from Supabase - service_role key]
FRONTEND_URL=https://clinic.cashvers.com
```

```bash
# Build backend
npm run build

# Test run
npm start
```

## Step 7: Set Up Frontend

```bash
cd ../frontend

# Install dependencies
npm install

# Create .env.local
nano .env.local
```

**Add to .env.local:**
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_YW11c2VkLWdydWItMzEuY2xlcmsuYWNjb3VudHMuZGV2JA
NEXT_PUBLIC_API_URL=https://clinic.cashvers.com/api
NEXT_PUBLIC_SUPABASE_URL=https://kklhhxuxinbkujvlfwsm.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtrbGhoeHV4aW5ia3Vqdmxmd3NtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU3MTU3NzYsImV4cCI6MjA4MTI5MTc3Nn0.KceLNmXxYbttEg9IFJrPaeoyHC-Lgc8qLYuJ7ZTQjiY
```

```bash
# Build frontend
npm run build

# Test run
npm start
```

## Step 8: Configure Nginx/Reverse Proxy

Hostinger uses Nginx. You may need to configure it via hPanel or create `.htaccess`/Nginx config.

### If Hostinger allows Nginx config:

Create or edit Nginx configuration to route:
- `/` → Frontend (port 3000)
- `/api` → Backend (port 5000)

### Alternative: Use Hostinger's Node.js App Manager

1. In hPanel → **Node.js** or **Applications**
2. Create Node.js app
3. Set:
   - **App name**: `clinicsense`
   - **App root**: `/home/your_user/domains/clinic.cashvers.com/public_html`
   - **App URL**: `clinic.cashvers.com`
   - **Startup file**: `frontend/server.js` (or backend for API)

## Step 9: Set Up Process Manager (PM2)

```bash
# Install PM2 globally
npm install -g pm2

# Start backend
cd backend
pm2 start dist/index.js --name clinicsense-backend

# Start frontend
cd ../frontend
pm2 start npm --name clinicsense-frontend -- start

# Save PM2 config
pm2 save

# Set PM2 to start on boot
pm2 startup
# Follow the command it outputs
```

## Step 10: Configure SSL Certificate

1. In hPanel → **SSL**
2. Install Let's Encrypt SSL for `clinic.cashvers.com`
3. Enable HTTPS

## Step 11: Update Webhooks

### Clerk Webhook:
- URL: `https://clinic.cashvers.com/api/webhooks/clerk`
- Events: `user.created`, `user.updated`
- Copy webhook secret to backend `.env`

### Stripe Webhook (if using):
- URL: `https://clinic.cashvers.com/api/subscriptions/webhook`

## Step 12: Test

1. Visit `https://clinic.cashvers.com`
2. Test backend: `https://clinic.cashvers.com/api/health`
3. Test authentication
4. Test features

## Troubleshooting

### Port Issues
- Hostinger may restrict ports
- Use ports 3000, 5000, or check Hostinger's allowed ports
- May need to use Hostinger's Node.js app manager

### Process Management
- Use PM2 to keep processes running
- Check PM2 logs: `pm2 logs`

### File Permissions
```bash
chmod -R 755 public_html/clinic
chown -R your_user:your_user public_html/clinic
```

### Check Logs
```bash
# PM2 logs
pm2 logs

# Nginx logs
tail -f /var/log/nginx/error.log

# Application logs
cd backend && npm start  # Check console output
```

## Important Notes

1. **Hostinger Node.js Limitations**: Check Hostinger's Node.js documentation for any restrictions
2. **Port Configuration**: May need to use Hostinger's Node.js app manager instead of direct PM2
3. **Auto-restart**: PM2 should handle this, but verify with Hostinger
4. **Resource Limits**: Shared hosting has limits - monitor usage

## Alternative: Hostinger Node.js App Manager

If Hostinger has a Node.js app manager in hPanel:

1. Use it to create apps for frontend and backend
2. Set environment variables in the manager
3. Let Hostinger handle process management
4. Configure routing in the manager

## Next Steps

1. Get Supabase service_role key
2. Set up Clerk webhook
3. Test all features
4. Monitor performance
5. Set up backups

