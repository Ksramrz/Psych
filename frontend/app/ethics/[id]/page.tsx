'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { apiRequest } from '@/lib/api';

interface EthicsCheckData {
  id: string;
  question: string;
  response: {
    isEthical: boolean;
    riskLevel: 'low' | 'medium' | 'high';
    concerns: string[];
    recommendations: string[];
    explanation: string;
  };
  created_at: string;
}

export default function EthicsCheckDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [checkData, setCheckData] = useState<EthicsCheckData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchCheck() {
      try {
        const data = await apiRequest<EthicsCheckData>(`/api/ethics/${id}`);
        setCheckData(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load ethics check');
      } finally {
        setLoading(false);
      }
    }
    fetchCheck();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="text-center">Loading...</div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !checkData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error || 'Ethics check not found'}
            </div>
          </div>
        </main>
      </div>
    );
  }

  const { response } = checkData;
  const riskColor = {
    low: 'bg-green-100 text-green-800 border-green-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    high: 'bg-red-100 text-red-800 border-red-200',
  }[response.riskLevel];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-6">
            <button
              onClick={() => router.back()}
              className="text-sm text-gray-500 hover:text-gray-700 mb-4"
            >
              ← Back
            </button>
            <h1 className="text-3xl font-bold text-gray-900">Ethics Check Result</h1>
            <p className="text-sm text-gray-500 mt-2">
              Created {new Date(checkData.created_at).toLocaleDateString()}
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Question</h2>
              <p className="text-gray-700">{checkData.question}</p>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Assessment</h2>
                <div className={`px-3 py-1 rounded-full text-sm font-medium border ${riskColor}`}>
                  {response.riskLevel.toUpperCase()} RISK
                </div>
              </div>
              <div className="mb-4">
                <span className="text-sm font-medium text-gray-700">Ethical: </span>
                <span className={`font-semibold ${response.isEthical ? 'text-green-600' : 'text-red-600'}`}>
                  {response.isEthical ? 'Yes' : 'No'}
                </span>
              </div>
              <p className="text-gray-700">{response.explanation}</p>
            </div>

            {response.concerns.length > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-yellow-900 mb-4">Concerns</h2>
                <ul className="list-disc list-inside space-y-2">
                  {response.concerns.map((concern, i) => (
                    <li key={i} className="text-yellow-800">{concern}</li>
                  ))}
                </ul>
              </div>
            )}

            {response.recommendations.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-blue-900 mb-4">Recommendations</h2>
                <ul className="list-disc list-inside space-y-2">
                  {response.recommendations.map((recommendation, i) => (
                    <li key={i} className="text-blue-800">{recommendation}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

