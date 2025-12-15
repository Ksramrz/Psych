'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppLayout } from '@/components/layout/AppLayout';
import { useApiRequest } from '@/hooks/useApiRequest';
import { Button } from '@/components/ui/Button';

export default function EthicsCheckPage() {
  const router = useRouter();
  const { request } = useApiRequest();
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) {
      setError('Please enter your question');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await request<{ id: string }>('/ethics', {
        method: 'POST',
        body: JSON.stringify({ question }),
      });

      router.push(`/ethics/${response.id}`);
    } catch (err: any) {
      setError(err.message || 'Failed to check ethics');
      setIsLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Ethics Check</h1>

        <form onSubmit={handleSubmit} className="bg-white bg-white border border-gray-200 shadow-sm rounded-lg p-6 space-y-6">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="question" className="block text-sm font-medium text-slate-700">
              Describe the situation or action you want to check
            </label>
            <textarea
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              rows={10}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Describe the situation, action, or question you want to check against ethical guidelines..."
            />
          </div>

          <div className="flex justify-end space-x-3">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} isLoading={isLoading}>
              Check Ethics
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}

