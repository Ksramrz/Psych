'use client';

import Link from 'next/link';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/Button';

export default function CasesPage() {
  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-foreground">Case Analysis</h1>
          <Link href="/cases/new">
            <Button>New Case</Button>
          </Link>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-border shadow-sm rounded-lg p-6">
          <p className="text-sm text-slate-500">No cases yet. Create your first case analysis.</p>
        </div>
      </div>
    </AppLayout>
  );
}

