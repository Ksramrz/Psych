'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppLayout } from '@/components/layout/AppLayout';
import { useApiRequest } from '@/hooks/useApiRequest';
import { Card } from '@/components/ui/Card';

interface ReflectionResult {
  reflectiveQuestions: string[];
  alternativePerspectives: string[];
  assessmentSuggestions: string[];
  interventionIdeas: string[];
  considerations: string[];
}

interface ReflectionData {
  id: string;
  case_context: string;
  reflection_result: ReflectionResult;
  created_at: string;
}

export default function ReflectionDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();
  const { request } = useApiRequest();
  const [reflectionData, setReflectionData] = useState<ReflectionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchReflection() {
      try {
        const data = await request<ReflectionData>(`/supervisor/${id}`);
        setReflectionData(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load reflection');
      } finally {
        setLoading(false);
      }
    }
    fetchReflection();
  }, [id, request]);

  if (loading) {
    return (
      <AppLayout>
        <div className="text-center py-10 text-slate-500">Loading...</div>
      </AppLayout>
    );
  }

  if (error || !reflectionData) {
    return (
      <AppLayout>
        <Card>
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error || 'Reflection not found'}
          </div>
        </Card>
      </AppLayout>
    );
  }

  const { reflection_result } = reflectionData;

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
          <h1 className="text-3xl font-bold text-gray-900">Supervisor Reflection</h1>
          <p className="text-sm text-slate-500 mt-1">
            Created {new Date(reflectionData.created_at).toLocaleDateString()}
          </p>
        </div>

        <Card title="Case Context">
          <p className="text-slate-700 whitespace-pre-wrap">{reflectionData.case_context}</p>
        </Card>

        <Card title="Reflective Questions">
          <ul className="list-disc list-inside space-y-2">
            {reflection_result.reflectiveQuestions.map((question, i) => (
              <li key={i} className="text-gray-900">{question}</li>
            ))}
          </ul>
        </Card>

        <Card title="Alternative Perspectives">
          <ul className="list-disc list-inside space-y-2">
            {reflection_result.alternativePerspectives.map((perspective, i) => (
              <li key={i} className="text-gray-900">{perspective}</li>
            ))}
          </ul>
        </Card>

        <Card title="Assessment Suggestions">
          <ul className="list-disc list-inside space-y-2">
            {reflection_result.assessmentSuggestions.map((suggestion, i) => (
              <li key={i} className="text-gray-900">{suggestion}</li>
            ))}
          </ul>
        </Card>

        <Card title="Intervention Ideas">
          <ul className="list-disc list-inside space-y-2">
            {reflection_result.interventionIdeas.map((idea, i) => (
              <li key={i} className="text-gray-900">{idea}</li>
            ))}
          </ul>
        </Card>

        <Card title="Important Considerations">
          <ul className="list-disc list-inside space-y-2">
            {reflection_result.considerations.map((consideration, i) => (
              <li key={i} className="text-gray-900">{consideration}</li>
            ))}
          </ul>
        </Card>
      </div>
    </AppLayout>
  );
}

