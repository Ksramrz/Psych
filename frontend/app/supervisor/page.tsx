'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { apiRequest } from '@/lib/api';

export default function SupervisorPage() {
  const router = useRouter();
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
      const response = await apiRequest<{ id: string }>('/api/supervisor', {
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
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Supervisor Reflection</h1>
          <p className="text-gray-600 mb-6">
            Get thoughtful questions, alternative perspectives, and guidance on complex cases.
          </p>

          <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6">
            {error && (
              <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <div className="mb-6">
              <label htmlFor="context" className="block text-sm font-medium text-gray-700 mb-2">
                Case Context
              </label>
              <textarea
                id="context"
                value={caseContext}
                onChange={(e) => setCaseContext(e.target.value)}
                rows={15}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Describe the case you'd like to reflect on. Include key details, challenges, and areas where you'd like guidance..."
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setCaseContext('')}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Clear
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
              >
                {isLoading ? 'Reflecting...' : 'Get Reflection'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

