'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppLayout } from '@/components/layout/AppLayout';
import { useApiRequest } from '@/hooks/useApiRequest';
import { Button } from '@/components/ui/Button';

export default function SupervisorPage() {
  const router = useRouter();
  const { request } = useApiRequest();
  const [caseContext, setCaseContext] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!caseContext.trim()) {
      setError('Please describe the case context');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await request<{ id: string }>('/supervisor', {
        method: 'POST',
        body: JSON.stringify({ case_context: caseContext }),
      });

      router.push(`/supervisor/${response.id}`);
    } catch (err: any) {
      setError(err.message || 'Failed to generate reflection');
      setIsLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Supervisor Reflection</h1>
        <p className="text-slate-600 mb-6">
          Get thoughtful questions, alternative perspectives, and guidance on complex cases.
        </p>

        <form onSubmit={handleSubmit} className="bg-white bg-white border border-gray-200 shadow-sm rounded-lg p-6">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div className="mb-6">
            <label htmlFor="context" className="block text-sm font-medium text-slate-700 mb-2">
              Case Context
            </label>
            <textarea
              id="context"
              value={caseContext}
              onChange={(e) => setCaseContext(e.target.value)}
              rows={15}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Describe the case you'd like to reflect on. Include key details, challenges, and areas where you'd like guidance..."
            />
          </div>

          <div className="flex justify-end space-x-3">
            <Button type="button" variant="outline" onClick={() => setCaseContext('')}>
              Clear
            </Button>
            <Button type="submit" disabled={isLoading} isLoading={isLoading}>
              Get Reflection
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}

