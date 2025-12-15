'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppLayout } from '@/components/layout/AppLayout';
import { useApiRequest } from '@/hooks/useApiRequest';
import { Button } from '@/components/ui/Button';

export default function NewCasePage() {
  const router = useRouter();
  const { request } = useApiRequest();
  const [title, setTitle] = useState('');
  const [caseContent, setCaseContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !caseContent.trim()) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await request<{ id: string }>('/cases', {
        method: 'POST',
        body: JSON.stringify({ title, case_content: caseContent }),
      });

      router.push(`/cases/${response.id}`);
    } catch (err: any) {
      setError(err.message || 'Failed to create case');
      setIsLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-6">New Case Analysis</h1>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 border border-border shadow-sm rounded-lg p-6">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-2">
              Case Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="e.g., Client presenting with anxiety"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="content" className="block text-sm font-medium text-slate-700 mb-2">
              Case Details
            </label>
            <textarea
              id="content"
              value={caseContent}
              onChange={(e) => setCaseContent(e.target.value)}
              rows={15}
              className="w-full px-3 py-2 border border-border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="Describe the case in detail..."
            />
          </div>

          <div className="flex justify-end space-x-3">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} isLoading={isLoading}>
              Analyze Case
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}

