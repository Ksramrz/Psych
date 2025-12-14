'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { apiRequest } from '@/lib/api';
import type { Case, CaseAnalysisResult } from '../../../../shared/types';

export default function CaseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [caseData, setCaseData] = useState<Case | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchCase() {
      try {
        const data = await apiRequest<Case>(`/cases/${id}`);
        setCaseData(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load case');
      } finally {
        setLoading(false);
      }
    }
    fetchCase();
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

  if (error || !caseData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error || 'Case not found'}
            </div>
          </div>
        </main>
      </div>
    );
  }

  const analysis = caseData.analysis_result as CaseAnalysisResult | null;

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
            <h1 className="text-3xl font-bold text-gray-900">{caseData.title}</h1>
            <p className="text-sm text-gray-500 mt-2">
              Created {new Date(caseData.created_at).toLocaleDateString()}
            </p>
          </div>

          {analysis ? (
            <div className="space-y-6">
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Insights</h2>
                <ul className="list-disc list-inside space-y-2">
                  {analysis.insights.map((insight, i) => (
                    <li key={i} className="text-gray-700">{insight}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Patterns Identified</h2>
                <ul className="list-disc list-inside space-y-2">
                  {analysis.patterns.map((pattern, i) => (
                    <li key={i} className="text-gray-700">{pattern}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Possible Frameworks</h2>
                <ul className="list-disc list-inside space-y-2">
                  {analysis.possibleFrameworks.map((framework, i) => (
                    <li key={i} className="text-gray-700">{framework}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Differential Diagnoses</h2>
                <ul className="list-disc list-inside space-y-2">
                  {analysis.differentialDiagnoses.map((diagnosis, i) => (
                    <li key={i} className="text-gray-700">{diagnosis}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Intervention Suggestions</h2>
                <ul className="list-disc list-inside space-y-2">
                  {analysis.interventionSuggestions.map((intervention, i) => (
                    <li key={i} className="text-gray-700">{intervention}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Assessment Recommendations</h2>
                <ul className="list-disc list-inside space-y-2">
                  {analysis.assessmentRecommendations.map((assessment, i) => (
                    <li key={i} className="text-gray-700">{assessment}</li>
                  ))}
                </ul>
              </div>

              {analysis.disclaimer && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800 font-medium">Important Disclaimer</p>
                  <p className="text-sm text-yellow-700 mt-1">{analysis.disclaimer}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white shadow rounded-lg p-6">
              <p className="text-gray-500">Analysis not available</p>
            </div>
          )}

          <div className="mt-6 bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Case Details</h2>
            <div className="prose max-w-none">
              <p className="text-gray-700 whitespace-pre-wrap">{caseData.case_content}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
