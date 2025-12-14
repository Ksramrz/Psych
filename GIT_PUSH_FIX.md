# Fix GitHub Push Permission Issue

## The Problem

Git is trying to push to `https://github.com/Ksramrz/Psych.git` but authentication failed.

## Solution Options

### Option 1: Use Personal Access Token (Recommended)

1. **Create a GitHub Personal Access Token:**
   - Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Click "Generate new token (classic)"
   - Give it a name: "ClinicSense"
   - Select scopes: `repo` (full control of private repositories)
   - Click "Generate token"
   - **Copy the token immediately** (you won't see it again!)

2. **Update remote URL with token:**
   ```bash
   git remote set-url origin https://YOUR_TOKEN@github.com/Ksramrz/Psych.git
   ```
   Replace `YOUR_TOKEN` with your actual token.

3. **Push again:**
   ```bash
   git push -u origin main
   ```

### Option 2: Use SSH (Alternative)

1. **Check if you have SSH key:**
   ```bash
   ls -al ~/.ssh
   ```

2. **If no SSH key, generate one:**
   ```bash
   ssh-keygen -t ed25519 -C "marskasra@gmail.com"
   # Press Enter to accept defaults
   ```

3. **Add SSH key to GitHub:**
   ```bash
   cat ~/.ssh/id_ed25519.pub
   # Copy the output
   ```
   - Go to GitHub → Settings → SSH and GPG keys → New SSH key
   - Paste the key and save

4. **Update remote to use SSH:**
   ```bash
   git remote set-url origin git@github.com:Ksramrz/Psych.git
   ```

5. **Push:**
   ```bash
   git push -u origin main
   ```

### Option 3: Update Remote URL (If Different Repo)

If you want to push to a different repository:

```bash
# Remove current remote
git remote remove origin

# Add your repository
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Push
git push -u origin main
```

## Quick Fix (Try This First)

If you have GitHub CLI installed:

```bash
gh auth login
git push -u origin main
```

## After Fixing

Once you can push successfully, your code will be on GitHub and you can proceed with Render deployment!

