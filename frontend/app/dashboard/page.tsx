'use client';

import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function DashboardPage() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  const quickActions = [
    { label: 'New Case Analysis', href: '/cases/new', variant: 'primary' as const },
    { label: 'Upload Notes', href: '/notes/upload', variant: 'secondary' as const },
    { label: 'Run Ethics Check', href: '/ethics/check', variant: 'ghost' as const },
    { label: 'Supervisor Reflection', href: '/supervisor', variant: 'ghost' as const },
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
        <div className="bg-white dark:bg-slate-900 border border-border shadow-sm rounded-2xl p-6 sm:p-8 mb-8">
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
                  <Link key={action.label} href={action.href}>
                    <Button variant={action.variant}>{action.label}</Button>
                  </Link>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 w-full lg:w-80">
              {stats.slice(0, 2).map((item) => (
                <Card key={item.label} className="p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-500">{item.label}</p>
                  <p className="text-2xl font-bold text-foreground mt-2">{item.value}</p>
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
                <div key={idx} className="flex items-start justify-between border-b border-border pb-3 last:border-0 last:pb-0">
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.title}</p>
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
              <Link href="/cases" className="flex items-center justify-between text-sm text-foreground hover:text-primary">
                <span>View all cases</span>
                <span className="text-slate-400">→</span>
              </Link>
              <Link href="/notes" className="flex items-center justify-between text-sm text-foreground hover:text-primary">
                <span>Review notes</span>
                <span className="text-slate-400">→</span>
              </Link>
              <Link href="/settings" className="flex items-center justify-between text-sm text-foreground hover:text-primary">
                <span>Privacy & storage</span>
                <span className="text-slate-400">→</span>
              </Link>
              <Link href="/settings" className="flex items-center justify-between text-sm text-foreground hover:text-primary">
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
              className="rounded-lg border border-border bg-white dark:bg-slate-900 px-6 py-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start space-x-3">
                <div className="text-3xl">{feature.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">{feature.title}</p>
                  <p className="text-sm text-slate-500 mt-1">{feature.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}

