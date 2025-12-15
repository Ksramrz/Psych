'use client';

import Link from 'next/link';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/Button';

export default function EthicsPage() {
  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Ethics Check</h1>
          <Link href="/ethics/check">
            <Button>New Check</Button>
          </Link>
        </div>
        <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
          <p className="text-sm text-slate-500">No ethics checks yet. Start a new check.</p>
        </div>
      </div>
    </AppLayout>
  );
}

