import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Only protect authenticated app areas; leave marketing/public routes untouched.
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/cases(.*)',
  '/notes(.*)',
  '/ethics(.*)',
  '/supervisor(.*)',
  '/settings(.*)',
  '/api(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isProtectedRoute(req)) {
    return NextResponse.next();
  }

  const { userId } = await auth();
  if (!userId) {
    const signInUrl = new URL('/sign-in', req.url);
    signInUrl.searchParams.set('redirect_url', req.url);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/cases/:path*',
    '/notes/:path*',
    '/ethics/:path*',
    '/supervisor/:path*',
    '/settings/:path*',
    '/api/:path*',
  ],
};

