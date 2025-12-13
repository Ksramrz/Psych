'use client';

import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function DashboardPage() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  const features = [
    {
      title: 'Case Analysis',
      description: 'Analyze cases with AI insights, patterns, and intervention suggestions',
      href: '/cases/new',
      icon: '📋',
    },
    {
      title: 'Session Notes',
      description: 'Transform messy notes into clean, structured summaries',
      href: '/notes/upload',
      icon: '📝',
    },
    {
      title: 'Ethics Check',
      description: 'Verify actions against professional ethical guidelines',
      href: '/ethics/check',
      icon: '⚖️',
    },
    {
      title: 'Supervisor Mode',
      description: 'Get reflective questions and alternative perspectives',
      href: '/supervisor',
      icon: '🎓',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {user?.firstName || 'User'}
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Your AI assistant for psychological practice
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <Link
                key={feature.href}
                href={feature.href}
                className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
              >
                <div className="flex-shrink-0 text-4xl">{feature.icon}</div>
                <div className="flex-1 min-w-0">
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="text-sm font-medium text-gray-900">{feature.title}</p>
                  <p className="text-sm text-gray-500 truncate">{feature.description}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="bg-white shadow rounded-lg p-6">
              <p className="text-sm text-gray-500">No recent activity yet. Get started by creating a case analysis or uploading notes.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

