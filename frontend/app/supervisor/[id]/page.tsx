'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { apiRequest } from '@/lib/api';

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

export default function ReflectionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [reflectionData, setReflectionData] = useState<ReflectionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchReflection() {
      try {
        const data = await apiRequest<ReflectionData>(`/api/supervisor/${id}`);
        setReflectionData(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load reflection');
      } finally {
        setLoading(false);
      }
    }
    fetchReflection();
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

  if (error || !reflectionData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error || 'Reflection not found'}
            </div>
          </div>
        </main>
      </div>
    );
  }

  const { reflection_result } = reflectionData;

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
            <h1 className="text-3xl font-bold text-gray-900">Supervisor Reflection</h1>
            <p className="text-sm text-gray-500 mt-2">
              Created {new Date(reflectionData.created_at).toLocaleDateString()}
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Case Context</h2>
              <p className="text-gray-700 whitespace-pre-wrap">{reflectionData.case_context}</p>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Reflective Questions</h2>
              <ul className="list-disc list-inside space-y-2">
                {reflection_result.reflectiveQuestions.map((question, i) => (
                  <li key={i} className="text-gray-700">{question}</li>
                ))}
              </ul>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Alternative Perspectives</h2>
              <ul className="list-disc list-inside space-y-2">
                {reflection_result.alternativePerspectives.map((perspective, i) => (
                  <li key={i} className="text-gray-700">{perspective}</li>
                ))}
              </ul>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Assessment Suggestions</h2>
              <ul className="list-disc list-inside space-y-2">
                {reflection_result.assessmentSuggestions.map((suggestion, i) => (
                  <li key={i} className="text-gray-700">{suggestion}</li>
                ))}
              </ul>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Intervention Ideas</h2>
              <ul className="list-disc list-inside space-y-2">
                {reflection_result.interventionIdeas.map((idea, i) => (
                  <li key={i} className="text-gray-700">{idea}</li>
                ))}
              </ul>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-blue-900 mb-4">Important Considerations</h2>
              <ul className="list-disc list-inside space-y-2">
                {reflection_result.considerations.map((consideration, i) => (
                  <li key={i} className="text-blue-800">{consideration}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

