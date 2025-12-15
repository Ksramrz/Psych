'use client';

import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useEffect, useState } from 'react';
import { Tour } from '@/components/onboarding/Tour';
import { Tooltip } from '@/components/onboarding/Tooltip';

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const [showTour, setShowTour] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const dismissed = localStorage.getItem('clinicsense-tour-dismissed');
      if (!dismissed) setShowTour(true);
    }
  }, []);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  const quickActions = [
    {
      label: 'New Case Analysis',
      href: '/cases/new',
      variant: 'primary' as const,
      description: 'Run AI-supported analysis: insights, patterns, differentials, interventions.',
    },
    {
      label: 'Upload Notes',
      href: '/notes/upload',
      variant: 'secondary' as const,
      description: 'Summarize raw session notes into clean, structured summaries.',
    },
    {
      label: 'Run Ethics Check',
      href: '/ethics/check',
      variant: 'ghost' as const,
      description: 'Review boundaries and guideline alignment for tricky situations.',
    },
    {
      label: 'Supervisor Reflection',
      href: '/supervisor',
      variant: 'ghost' as const,
      description: 'Get reflective questions and alternative perspectives.',
    },
  ];

  const featureCards = [
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

  const stats = [
    { label: 'Cases analyzed', value: '12', trend: '+3 this week' },
    { label: 'Notes summarized', value: '34', trend: '+10 this week' },
    { label: 'Ethics checks', value: '8', trend: 'No issues flagged' },
    { label: 'Reflections', value: '6', trend: '+2 this week' },
  ];

  const activity = [
    { title: 'New case analyzed', detail: 'Client presenting with anxiety', time: '2h ago' },
    { title: 'Notes summarized', detail: 'Session notes for client A', time: '5h ago' },
    { title: 'Ethics check completed', detail: 'Boundary consideration review', time: '1d ago' },
    { title: 'Supervisor reflection', detail: 'Case complexity reflection', time: '2d ago' },
  ];

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto">
        {/* Hero */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6 sm:p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <p className="text-sm text-slate-500 mb-2">Welcome back</p>
              <h1 className="text-3xl font-bold text-foreground">
                {user?.firstName ? `${user.firstName},` : 'Welcome,'} let’s move your cases forward
              </h1>
              <p className="mt-3 text-slate-600 max-w-2xl">
                Your psychology-focused AI copilot for case analysis, notes, ethics checks, and
                supervisor-style reflection.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {quickActions.map((action) => (
                  <Tooltip key={action.label} content={action.description ?? action.label}>
                    <Link href={action.href}>
                      <Button variant={action.variant}>{action.label}</Button>
                    </Link>
                  </Tooltip>
                ))}
                <Button variant="ghost" onClick={() => setShowTour(true)}>
                  Show tour
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 w-full lg:w-80">
              {stats.slice(0, 2).map((item) => (
                <Card key={item.label} className="p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-500">{item.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{item.value}</p>
                  <p className="text-xs text-slate-500 mt-1">{item.trend}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Stats and Quick Links */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2 p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Activity</h2>
            <div className="space-y-4">
              {activity.map((item, idx) => (
                <div key={idx} className="flex items-start justify-between border-b border-gray-200 pb-3 last:border-0 last:pb-0">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.title}</p>
                    <p className="text-sm text-slate-500">{item.detail}</p>
                  </div>
                  <span className="text-xs text-slate-400">{item.time}</span>
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Shortcuts</h2>
            <div className="space-y-3">
              <Link href="/cases" className="flex items-center justify-between text-sm text-gray-900 hover:text-blue-600">
                <span>View all cases</span>
                <span className="text-slate-400">→</span>
              </Link>
              <Link href="/notes" className="flex items-center justify-between text-sm text-gray-900 hover:text-blue-600">
                <span>Review notes</span>
                <span className="text-slate-400">→</span>
              </Link>
              <Link href="/settings" className="flex items-center justify-between text-sm text-gray-900 hover:text-blue-600">
                <span>Privacy & storage</span>
                <span className="text-slate-400">→</span>
              </Link>
              <Link href="/settings" className="flex items-center justify-between text-sm text-gray-900 hover:text-blue-600">
                <span>Billing & subscriptions</span>
                <span className="text-slate-400">→</span>
              </Link>
            </div>
          </Card>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featureCards.map((feature) => (
            <Link
              key={feature.href}
              href={feature.href}
              className="rounded-lg border border-gray-200 bg-white px-6 py-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start space-x-3">
                <div className="text-3xl">{feature.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900">{feature.title}</p>
                  <p className="text-sm text-slate-500 mt-1">{feature.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

      {showTour && (
        <Tour
          steps={[
            {
              title: 'Start with a case',
              description:
                'Use “New Case” to run AI-supported analysis: insights, patterns, differentials, and suggested interventions.',
            },
            {
              title: 'Clean up your notes',
              description:
                'Upload session notes to get structured summaries and follow-ups. Handy before writing reports.',
            },
            {
              title: 'Stay aligned with ethics',
              description:
                'Use Ethics Check to quickly review boundaries and guideline alignment for tricky situations.',
            },
            {
              title: 'Reflect like a supervisor',
              description:
                'Supervisor mode gives reflective questions and alternative perspectives to strengthen formulation.',
            },
          ]}
          onClose={() => setShowTour(false)}
        />
      )}
      </div>
    </AppLayout>
  );
}

