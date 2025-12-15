'use client';

import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-white via-gray-50 to-blue-50 px-4 py-12">
      <div className="w-full max-w-md">
        <SignUp
          routing="path"
          path="/sign-up"
          signInUrl="/sign-in"
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



