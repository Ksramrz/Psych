'use client';

import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-white via-gray-50 to-blue-50 px-4 py-12">
      <div className="w-full max-w-md">
        <SignIn
          routing="path"
          path="/sign-in"
          signUpUrl="/sign-up"
          signInForceRedirectUrl="/dashboard"
          signInFallbackRedirectUrl="/dashboard"
          appearance={{
            elements: {
              rootBox: 'mx-auto w-full',
              card: 'shadow-xl',
            },
          }}
        />
      </div>
    </div>
  );
}



