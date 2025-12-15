import type { Metadata } from 'next';
import { Inter, Poppins, Playfair_Display } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });
const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: 'ClinicSense - AI Assistant for Psychologists',
  description: 'Supporting psychologists with case analysis, notes, ethical checks, and supervisor-style reflection',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} ${poppins.variable} ${playfair.variable}`}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
