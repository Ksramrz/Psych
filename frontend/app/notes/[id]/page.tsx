'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { useApiRequest } from '@/hooks/useApiRequest';

interface NotesSummary {
  sessionOverview: string;
  keyTopics: string[];
  interventionsUsed: string[];
  clientResponse: string;
  progressNotes: string;
  followUpItems: string[];
  concerns: string[];
}

interface NotesData {
  id: string;
  raw_notes: string;
  summary: NotesSummary | null;
  created_at: string;
}

export default function NotesDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { request } = useApiRequest();
  const [notesData, setNotesData] = useState<NotesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchNotes() {
      try {
        const data = await request<NotesData>(`/notes/${id}`);
        setNotesData(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load notes');
      } finally {
        setLoading(false);
      }
    }
    fetchNotes();
  }, [id, request]);

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

  if (error || !notesData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error || 'Notes not found'}
            </div>
          </div>
        </main>
      </div>
    );
  }

  const summary = notesData.summary;

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
            <h1 className="text-3xl font-bold text-gray-900">Session Notes Summary</h1>
            <p className="text-sm text-gray-500 mt-2">
              Created {new Date(notesData.created_at).toLocaleDateString()}
            </p>
          </div>

          {summary ? (
            <div className="space-y-6">
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Session Overview</h2>
                <p className="text-gray-700">{summary.sessionOverview}</p>
              </div>

              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Topics Discussed</h2>
                <ul className="list-disc list-inside space-y-2">
                  {summary.keyTopics.map((topic, i) => (
                    <li key={i} className="text-gray-700">{topic}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Interventions Used</h2>
                <ul className="list-disc list-inside space-y-2">
                  {summary.interventionsUsed.map((intervention, i) => (
                    <li key={i} className="text-gray-700">{intervention}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Client Response</h2>
                <p className="text-gray-700">{summary.clientResponse}</p>
              </div>

              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Progress Notes</h2>
                <p className="text-gray-700">{summary.progressNotes}</p>
              </div>

              {summary.followUpItems.length > 0 && (
                <div className="bg-white shadow rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Follow-up Items</h2>
                  <ul className="list-disc list-inside space-y-2">
                    {summary.followUpItems.map((item, i) => (
                      <li key={i} className="text-gray-700">{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {summary.concerns.length > 0 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-yellow-900 mb-4">Concerns</h2>
                  <ul className="list-disc list-inside space-y-2">
                    {summary.concerns.map((concern, i) => (
                      <li key={i} className="text-yellow-800">{concern}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white shadow rounded-lg p-6">
              <p className="text-gray-500">Summary not available</p>
            </div>
          )}

          <div className="mt-6 bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Original Notes</h2>
            <div className="prose max-w-none">
              <p className="text-gray-700 whitespace-pre-wrap">{notesData.raw_notes}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

