'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppLayout } from '@/components/layout/AppLayout';
import { useApiRequest } from '@/hooks/useApiRequest';
import { Card } from '@/components/ui/Card';

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

export default function EthicsCheckDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();
  const { request } = useApiRequest();
  const [checkData, setCheckData] = useState<EthicsCheckData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchCheck() {
      try {
        const data = await request<EthicsCheckData>(`/ethics/${id}`);
        setCheckData(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load ethics check');
      } finally {
        setLoading(false);
      }
    }
    fetchCheck();
  }, [id, request]);

  if (loading) {
    return (
      <AppLayout>
        <div className="text-center py-10 text-slate-500">Loading...</div>
      </AppLayout>
    );
  }

  if (error || !checkData) {
    return (
      <AppLayout>
        <Card>
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error || 'Ethics check not found'}
          </div>
        </Card>
      </AppLayout>
    );
  }

  const { response } = checkData;
  const riskColor = {
    low: 'bg-green-100 text-green-800 border-green-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    high: 'bg-red-100 text-red-800 border-red-200',
  }[response.riskLevel];

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="mb-4">
          <button
            onClick={() => router.back()}
            className="text-sm text-slate-500 hover:text-primary mb-2"
          >
            ← Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Ethics Check Result</h1>
          <p className="text-sm text-slate-500 mt-1">
            Created {new Date(checkData.created_at).toLocaleDateString()}
          </p>
        </div>

        <Card title="Question">
          <p className="text-slate-700">{checkData.question}</p>
        </Card>

        <Card title="Assessment">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-slate-700">Risk Level</span>
            <div className={`px-3 py-1 rounded-full text-sm font-medium border ${riskColor}`}>
              {response.riskLevel.toUpperCase()} RISK
            </div>
          </div>
          <div className="mb-4">
            <span className="text-sm font-medium text-slate-700">Ethical: </span>
            <span className={`font-semibold ${response.isEthical ? 'text-success' : 'text-error'}`}>
              {response.isEthical ? 'Yes' : 'No'}
            </span>
          </div>
          <p className="text-slate-700">{response.explanation}</p>
        </Card>

        {response.concerns.length > 0 && (
          <Card title="Concerns">
            <ul className="list-disc list-inside space-y-2">
              {response.concerns.map((concern, i) => (
                <li key={i} className="text-gray-900">{concern}</li>
              ))}
            </ul>
          </Card>
        )}

        {response.recommendations.length > 0 && (
          <Card title="Recommendations">
            <ul className="list-disc list-inside space-y-2">
              {response.recommendations.map((recommendation, i) => (
                <li key={i} className="text-gray-900">{recommendation}</li>
              ))}
            </ul>
          </Card>
        )}
      </div>
    </AppLayout>
  );
}

