# Clerk Configuration Guide

## Dashboard Settings

Based on your Clerk Dashboard, configure the following:

### 1. Development Host Settings
- **Fallback development host**: `https://clinic.cashvers.com`
- **Home URL**: Leave blank (or set to `/`)

### 2. Component Paths
- **Sign-in page**: `$DEVHOST /sign-in` (which resolves to `https://clinic.cashvers.com/sign-in`)
- **Sign-up page**: `$DEVHOST /sign-up` (which resolves to `https://clinic.cashvers.com/sign-up`)

### 3. Sign Out
- **After sign-out URL**: `$DEVHOST /` (or `https://clinic.cashvers.com/`)

### 4. Allowed Origins
Make sure to add your production domain:
- `https://clinic.cashvers.com`

## Important Note

**Redirect URLs are now configured in code, not in the Dashboard!**

In Clerk Core 2, the redirect URLs after sign-in/sign-up are set in your application code using:
- Component props: `signInForceRedirectUrl`, `signUpForceRedirectUrl`
- Environment variables (optional): `NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL`, etc.

The code already has these configured to redirect to `/dashboard` after authentication.

## Environment Variables (Optional)

You can also set these in your `.env.local` file on the server:

```env
NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/dashboard
```

But the component props in the code will take precedence.

## Verification

After deploying, test:
1. Go to `https://clinic.cashvers.com/` - should show landing page
2. Click "Sign In" - should go to `/sign-in`
3. After signing in - should redirect to `/dashboard`
4. Click "Sign Up" - should go to `/sign-up`
5. After signing up - should redirect to `/dashboard`
