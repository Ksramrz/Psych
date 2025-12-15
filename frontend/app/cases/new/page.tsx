'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppLayout } from '@/components/layout/AppLayout';
import { useApiRequest } from '@/hooks/useApiRequest';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function NewCasePage() {
  const router = useRouter();
  const { request } = useApiRequest();
  const [title, setTitle] = useState('');
  const [clientAge, setClientAge] = useState('');
  const [clientGender, setClientGender] = useState('');
  const [presentingConcerns, setPresentingConcerns] = useState('');
  const [sessionNotes, setSessionNotes] = useState('');
  const [treatmentHistory, setTreatmentHistory] = useState('');
  const [goals, setGoals] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !sessionNotes.trim()) {
      setError('Please fill in at least Case Title and Session Notes');
      return;
    }

    setIsLoading(true);
    setError('');

    // Combine all fields into structured case content
    const caseContent = `CLIENT INFORMATION:
Age: ${clientAge || 'Not specified'}
Gender: ${clientGender || 'Not specified'}

PRESENTING CONCERNS:
${presentingConcerns || 'Not specified'}

SESSION NOTES:
${sessionNotes}

TREATMENT HISTORY:
${treatmentHistory || 'Not specified'}

TREATMENT GOALS:
${goals || 'Not specified'}`;

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

  const inputBaseClasses = "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">New Case Analysis</h1>
        <p className="text-gray-600 mb-6">Enter case information in a structured format for better AI analysis</p>

        <form onSubmit={handleSubmit}>
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {/* Case Title */}
          <Card className="mb-6 p-6">
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-semibold text-gray-900 mb-2">
                Case Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={inputBaseClasses}
                placeholder="e.g., Client presenting with anxiety and depression"
                required
              />
            </div>
          </Card>

          {/* Client Information */}
          <Card className="mb-6 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Client Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="clientAge" className="block text-sm font-medium text-gray-700 mb-2">
                  Age
                </label>
                <input
                  type="text"
                  id="clientAge"
                  value={clientAge}
                  onChange={(e) => setClientAge(e.target.value)}
                  className={inputBaseClasses}
                  placeholder="e.g., 32"
                />
              </div>
              <div>
                <label htmlFor="clientGender" className="block text-sm font-medium text-gray-700 mb-2">
                  Gender
                </label>
                <input
                  type="text"
                  id="clientGender"
                  value={clientGender}
                  onChange={(e) => setClientGender(e.target.value)}
                  className={inputBaseClasses}
                  placeholder="e.g., Female, Male, Non-binary"
                />
              </div>
            </div>
          </Card>

          {/* Presenting Concerns */}
          <Card className="mb-6 p-6">
            <div>
              <label htmlFor="presentingConcerns" className="block text-sm font-semibold text-gray-900 mb-2">
                Presenting Concerns
              </label>
              <textarea
                id="presentingConcerns"
                value={presentingConcerns}
                onChange={(e) => setPresentingConcerns(e.target.value)}
                rows={4}
                className={inputBaseClasses}
                placeholder="What are the main concerns or issues the client is presenting with? (e.g., anxiety, depression, relationship issues, trauma)"
              />
            </div>
          </Card>

          {/* Session Notes */}
          <Card className="mb-6 p-6">
            <div>
              <label htmlFor="sessionNotes" className="block text-sm font-semibold text-gray-900 mb-2">
                Session Notes <span className="text-red-500">*</span>
              </label>
              <textarea
                id="sessionNotes"
                value={sessionNotes}
                onChange={(e) => setSessionNotes(e.target.value)}
                rows={8}
                className={inputBaseClasses}
                placeholder="Describe what happened in the session, client's presentation, key observations, interventions used, client responses, and any important details..."
                required
              />
              <p className="mt-2 text-xs text-gray-500">
                Include observations, interventions, client responses, and any relevant details from the session.
              </p>
            </div>
          </Card>

          {/* Treatment History */}
          <Card className="mb-6 p-6">
            <div>
              <label htmlFor="treatmentHistory" className="block text-sm font-semibold text-gray-900 mb-2">
                Treatment History
              </label>
              <textarea
                id="treatmentHistory"
                value={treatmentHistory}
                onChange={(e) => setTreatmentHistory(e.target.value)}
                rows={4}
                className={inputBaseClasses}
                placeholder="Previous therapy, medications, diagnoses, treatment outcomes, relevant medical history..."
              />
            </div>
          </Card>

          {/* Treatment Goals */}
          <Card className="mb-6 p-6">
            <div>
              <label htmlFor="goals" className="block text-sm font-semibold text-gray-900 mb-2">
                Treatment Goals
              </label>
              <textarea
                id="goals"
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
                rows={4}
                className={inputBaseClasses}
                placeholder="What are the client's goals for treatment? What do they want to achieve? (e.g., reduce anxiety, improve relationships, process trauma)"
              />
            </div>
          </Card>

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

