'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppLayout } from '@/components/layout/AppLayout';
import { useApiRequest } from '@/hooks/useApiRequest';
import { Card } from '@/components/ui/Card';
import type { Case, CaseAnalysisResult } from '../../../../shared/types';

export default function CaseDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();
  const { request } = useApiRequest();
  const [caseData, setCaseData] = useState<Case | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchCase() {
      try {
        const data = await request<Case>(`/cases/${id}`);
        setCaseData(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load case');
      } finally {
        setLoading(false);
      }
    }
    fetchCase();
  }, [id, request]);

  if (loading) {
    return (
      <AppLayout>
        <div className="text-center py-10 text-slate-500">Loading...</div>
      </AppLayout>
    );
  }

  if (error || !caseData) {
    return (
      <AppLayout>
        <Card>
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error || 'Case not found'}
          </div>
        </Card>
      </AppLayout>
    );
  }

  const analysis = caseData.analysis_result as CaseAnalysisResult | null;

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <button
              onClick={() => router.back()}
              className="text-sm text-slate-500 hover:text-primary mb-2"
            >
              ← Back
            </button>
            <h1 className="text-3xl font-bold text-foreground">{caseData.title}</h1>
            <p className="text-sm text-slate-500 mt-2">
              Created {new Date(caseData.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>

        {analysis ? (
          <div className="space-y-4">
            <Card title="Key Insights">
              <ul className="list-disc list-inside space-y-2">
                {analysis.insights.map((insight, i) => (
                  <li key={i} className="text-foreground">{insight}</li>
                ))}
              </ul>
            </Card>

            <Card title="Patterns Identified">
              <ul className="list-disc list-inside space-y-2">
                {analysis.patterns.map((pattern, i) => (
                  <li key={i} className="text-foreground">{pattern}</li>
                ))}
              </ul>
            </Card>

            <Card title="Possible Frameworks">
              <ul className="list-disc list-inside space-y-2">
                {analysis.possibleFrameworks.map((framework, i) => (
                  <li key={i} className="text-foreground">{framework}</li>
                ))}
              </ul>
            </Card>

            <Card title="Differential Diagnoses">
              <ul className="list-disc list-inside space-y-2">
                {analysis.differentialDiagnoses.map((diagnosis, i) => (
                  <li key={i} className="text-foreground">{diagnosis}</li>
                ))}
              </ul>
            </Card>

            <Card title="Intervention Suggestions">
              <ul className="list-disc list-inside space-y-2">
                {analysis.interventionSuggestions.map((intervention, i) => (
                  <li key={i} className="text-foreground">{intervention}</li>
                ))}
              </ul>
            </Card>

            <Card title="Assessment Recommendations">
              <ul className="list-disc list-inside space-y-2">
                {analysis.assessmentRecommendations.map((assessment, i) => (
                  <li key={i} className="text-foreground">{assessment}</li>
                ))}
              </ul>
            </Card>

            {analysis.disclaimer && (
              <Card title="Important Disclaimer">
                <p className="text-sm text-slate-700">{analysis.disclaimer}</p>
              </Card>
            )}
          </div>
        ) : (
          <Card>
            <p className="text-slate-500">Analysis not available</p>
          </Card>
        )}

        <Card title="Case Details">
          <p className="text-slate-700 whitespace-pre-wrap">{caseData.case_content}</p>
        </Card>
      </div>
    </AppLayout>
  );
}
