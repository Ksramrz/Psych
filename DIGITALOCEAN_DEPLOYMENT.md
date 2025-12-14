# DigitalOcean Deployment Guide
## clinic.cashvers.com

## Step 1: Create DigitalOcean Account & Droplet

### 1.1 Sign Up
1. Go to https://www.digitalocean.com
2. Sign up (use GitHub for $200 credit)
3. Verify email

### 1.2 Create Droplet
1. Click "Create" → "Droplets"
2. Choose:
   - **Image**: Ubuntu 22.04 (LTS) x64
   - **Plan**: Basic → Regular Intel → $6/month (1GB RAM) or $12/month (2GB RAM recommended)
   - **Datacenter**: New York 1 (NYC1) or choose closest to your users
   - **Authentication**: SSH keys (recommended) or Password
   - **Hostname**: `clinicsense` or `clinic-cashvers`
   - **Tags**: `production`, `clinicsense`
3. Click "Create Droplet"
4. Wait 1-2 minutes for creation
5. **Note the IP address** (you'll need this)

## Step 2: Initial Server Setup

### 2.1 Connect to Server
```bash
ssh root@YOUR_DROPLET_IP
# Or if you used SSH keys, it should connect automatically
```

### 2.2 Update System
```bash
apt update && apt upgrade -y
```

### 2.3 Create Non-Root User (Recommended)
```bash
adduser clinicsense
usermod -aG sudo clinicsense
su - clinicsense
```

## Step 3: Install Required Software

### 3.1 Install Node.js 18
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Verify
node --version  # Should show v18.x or higher
npm --version
```

### 3.2 Install PM2 (Process Manager)
```bash
sudo npm install -g pm2
```

### 3.3 Install Nginx
```bash
sudo apt install -y nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

### 3.4 Install Git
```bash
sudo apt install -y git
```

### 3.5 Install Certbot (for SSL)
```bash
sudo apt install -y certbot python3-certbot-nginx
```

### 3.6 Install UFW (Firewall)
```bash
sudo apt install -y ufw
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

## Step 4: Deploy Your Application

### 4.1 Clone Repository
```bash
cd /var/www
sudo git clone https://github.com/Ksramrz/Psych.git clinicsense
sudo chown -R $USER:$USER /var/www/clinicsense
cd clinicsense
```

### 4.2 Set Up Backend

```bash
cd backend

# Install dependencies
npm install

# Create .env file
nano .env
```

**Add to backend/.env:**
```env
NODE_ENV=production
PORT=5000
CLERK_SECRET_KEY=sk_test_cbM9zRJdTmsaxZKN807uC1V8HFL9acEB2buq3js7Eb
CLERK_WEBHOOK_SECRET=
ANTHROPIC_API_KEY=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
SUPABASE_URL=https://kklhhxuxinbkujvlfwsm.supabase.co
SUPABASE_SERVICE_KEY=
FRONTEND_URL=https://clinic.cashvers.com
```

```bash
# Build backend
npm run build

# Test run (Ctrl+C to stop)
npm start
```

### 4.3 Set Up Frontend

```bash
cd ../frontend

# Install dependencies
npm install

# Create .env.local file
nano .env.local
```

**Add to frontend/.env.local:**
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_YW11c2VkLWdydWItMzEuY2xlcmsuYWNjb3VudHMuZGV2JA
NEXT_PUBLIC_API_URL=https://clinic.cashvers.com/api
NEXT_PUBLIC_SUPABASE_URL=https://kklhhxuxinbkujvlfwsm.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtrbGhoeHV4aW5ia3Vqdmxmd3NtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU3MTU3NzYsImV4cCI6MjA4MTI5MTc3Nn0.KceLNmXxYbttEg9IFJrPaeoyHC-Lgc8qLYuJ7ZTQjiY
```

```bash
# Build frontend
npm run build

# Test run (Ctrl+C to stop)
npm start
```

## Step 5: Configure PM2

### 5.1 Start Backend with PM2
```bash
cd /var/www/clinicsense/backend
pm2 start dist/index.js --name clinicsense-backend
pm2 save
```

### 5.2 Start Frontend with PM2
```bash
cd /var/www/clinicsense/frontend
pm2 start npm --name clinicsense-frontend -- start
pm2 save
```

### 5.3 Set PM2 to Start on Boot
```bash
pm2 startup
# Run the command it outputs (usually starts with sudo)
```

### 5.4 Check PM2 Status
```bash
pm2 status
pm2 logs  # View logs
```

## Step 6: Configure Nginx Reverse Proxy

### 6.1 Create Nginx Configuration
```bash
sudo nano /etc/nginx/sites-available/clinic.cashvers.com
```

**Add this configuration:**
```nginx
server {
    listen 80;
    server_name clinic.cashvers.com;

    # Frontend (Next.js)
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Health check
    location /health {
        proxy_pass http://localhost:5000/health;
    }
}
```

### 6.2 Enable Site
```bash
sudo ln -s /etc/nginx/sites-available/clinic.cashvers.com /etc/nginx/sites-enabled/
sudo nginx -t  # Test configuration
sudo systemctl reload nginx
```

## Step 7: Configure DNS

### 7.1 Update DNS Records
Go to your domain provider (where you manage cashvers.com):

1. Add **A Record**:
   - Type: `A`
   - Name: `clinic`
   - Value: `YOUR_DROPLET_IP` (from Step 1.2)
   - TTL: `3600`

2. Wait 5-60 minutes for DNS propagation

### 7.2 Verify DNS
```bash
dig clinic.cashvers.com
# Should return your Droplet IP
```

## Step 8: Set Up SSL Certificate

### 8.1 Get SSL Certificate
```bash
sudo certbot --nginx -d clinic.cashvers.com
```

Follow the prompts:
- Enter email (for renewal notices)
- Agree to terms
- Choose to redirect HTTP to HTTPS (recommended)

### 8.2 Auto-Renewal (Already Set Up)
Certbot automatically sets up renewal. Test it:
```bash
sudo certbot renew --dry-run
```

## Step 9: Get Missing Keys

### 9.1 Supabase Service Key
1. Go to https://supabase.com/dashboard
2. Select your project
3. Settings → API
4. Copy **service_role** key (NOT anon key)
5. Add to `backend/.env` as `SUPABASE_SERVICE_KEY`
6. Restart backend: `pm2 restart clinicsense-backend`

### 9.2 Clerk Webhook Secret
1. Go to https://dashboard.clerk.com
2. Webhooks → Add Endpoint
3. URL: `https://clinic.cashvers.com/api/webhooks/clerk`
4. Events: Select `user.created` and `user.updated`
5. Copy webhook secret
6. Add to `backend/.env` as `CLERK_WEBHOOK_SECRET`
7. Restart backend: `pm2 restart clinicsense-backend`

## Step 10: Test Deployment

### 10.1 Test Backend
```bash
curl https://clinic.cashvers.com/api/health
# Should return: {"status":"ok",...}
```

### 10.2 Test Frontend
1. Visit `https://clinic.cashvers.com`
2. Should see ClinicSense interface
3. Test sign up/login
4. Test features

### 10.3 Check Logs
```bash
# PM2 logs
pm2 logs

# Nginx logs
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

## Step 11: Set Up Auto-Deploy (Optional)

### 11.1 GitHub Webhook (Advanced)
Set up webhook to auto-deploy on git push:
1. Create deploy script
2. Set up GitHub webhook
3. Pull and restart on push

### 11.2 Manual Deploy Script
Create `/var/www/clinicsense/deploy.sh`:
```bash
#!/bin/bash
cd /var/www/clinicsense
git pull
cd backend && npm install && npm run build
cd ../frontend && npm install && npm run build
pm2 restart all
```

Make executable:
```bash
chmod +x deploy.sh
```

## Useful Commands

### PM2 Management
```bash
pm2 status              # Check status
pm2 logs                # View logs
pm2 restart all         # Restart all apps
pm2 restart clinicsense-backend
pm2 restart clinicsense-frontend
pm2 stop all            # Stop all
pm2 delete all          # Delete all
```

### Nginx Management
```bash
sudo systemctl status nginx
sudo systemctl restart nginx
sudo systemctl reload nginx
sudo nginx -t           # Test config
```

### Update Application
```bash
cd /var/www/clinicsense
git pull
cd backend && npm install && npm run build && pm2 restart clinicsense-backend
cd ../frontend && npm install && npm run build && pm2 restart clinicsense-frontend
```

### View Logs
```bash
# Application logs
pm2 logs

# Nginx error logs
sudo tail -f /var/log/nginx/error.log

# System logs
sudo journalctl -u nginx -f
```

## Security Checklist

- [ ] Firewall configured (UFW)
- [ ] SSH key authentication (disable password)
- [ ] SSL certificate installed
- [ ] Environment variables secured
- [ ] Regular updates: `sudo apt update && sudo apt upgrade`
- [ ] PM2 auto-restart configured
- [ ] Backups configured (optional)

## Monitoring (Optional)

### Set Up Monitoring
1. DigitalOcean Monitoring (built-in)
2. PM2 Monitoring: `pm2 install pm2-logrotate`
3. Uptime monitoring: UptimeRobot (free)

## Cost Breakdown

- **Droplet**: $6-12/month (1-2GB RAM)
- **Domain**: Already have cashvers.com
- **SSL**: Free (Let's Encrypt)
- **Total**: ~$6-12/month

## Troubleshooting

### Backend Not Starting
```bash
pm2 logs clinicsense-backend
# Check for errors
cd /var/www/clinicsense/backend
npm start  # Test manually
```

### Frontend Not Loading
```bash
pm2 logs clinicsense-frontend
# Check if port 3000 is accessible
curl http://localhost:3000
```

### Nginx Errors
```bash
sudo nginx -t
sudo tail -f /var/log/nginx/error.log
```

### Port Already in Use
```bash
sudo netstat -tulpn | grep :3000
sudo netstat -tulpn | grep :5000
# Kill process if needed
```

### DNS Not Working
- Wait longer (up to 48 hours)
- Check DNS record is correct
- Use `dig clinic.cashvers.com` to verify

## Next Steps

1. ✅ Test all features
2. ✅ Set up monitoring
3. ✅ Configure backups
4. ✅ Set up auto-deploy (optional)
5. ✅ Plan for scaling (add more Droplets, load balancer)

## Scaling Path

When you need to scale:
1. **Vertical**: Upgrade Droplet (more RAM/CPU)
2. **Horizontal**: Add more Droplets + Load Balancer
3. **Database**: Use managed PostgreSQL
4. **CDN**: Add Cloudflare for static assets
5. **Caching**: Add Redis

Your ClinicSense app is now live on DigitalOcean! 🚀

