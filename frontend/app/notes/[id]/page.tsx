'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppLayout } from '@/components/layout/AppLayout';
import { useApiRequest } from '@/hooks/useApiRequest';
import { Card } from '@/components/ui/Card';

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

export default function NotesDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
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
      <AppLayout>
        <div className="text-center py-10 text-slate-500">Loading...</div>
      </AppLayout>
    );
  }

  if (error || !notesData) {
    return (
      <AppLayout>
        <Card>
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error || 'Notes not found'}
          </div>
        </Card>
      </AppLayout>
    );
  }

  const summary = notesData.summary;

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
          <h1 className="text-3xl font-bold text-foreground">Session Notes Summary</h1>
          <p className="text-sm text-slate-500 mt-1">
            Created {new Date(notesData.created_at).toLocaleDateString()}
          </p>
        </div>

        {summary ? (
          <div className="space-y-4">
            <Card title="Session Overview">
              <p className="text-slate-700">{summary.sessionOverview}</p>
            </Card>

            <Card title="Key Topics Discussed">
              <ul className="list-disc list-inside space-y-2">
                {summary.keyTopics.map((topic, i) => (
                  <li key={i} className="text-foreground">{topic}</li>
                ))}
              </ul>
            </Card>

            <Card title="Interventions Used">
              <ul className="list-disc list-inside space-y-2">
                {summary.interventionsUsed.map((intervention, i) => (
                  <li key={i} className="text-foreground">{intervention}</li>
                ))}
              </ul>
            </Card>

            <Card title="Client Response">
              <p className="text-slate-700">{summary.clientResponse}</p>
            </Card>

            <Card title="Progress Notes">
              <p className="text-slate-700">{summary.progressNotes}</p>
            </Card>

            {summary.followUpItems.length > 0 && (
              <Card title="Follow-up Items">
                <ul className="list-disc list-inside space-y-2">
                  {summary.followUpItems.map((item, i) => (
                    <li key={i} className="text-foreground">{item}</li>
                  ))}
                </ul>
              </Card>
            )}

            {summary.concerns.length > 0 && (
              <Card title="Concerns">
                <ul className="list-disc list-inside space-y-2">
                  {summary.concerns.map((concern, i) => (
                    <li key={i} className="text-foreground">{concern}</li>
                  ))}
                </ul>
              </Card>
            )}
          </div>
        ) : (
          <Card>
            <p className="text-slate-500">Summary not available</p>
          </Card>
        )}

        <Card title="Original Notes">
          <p className="text-slate-700 whitespace-pre-wrap">{notesData.raw_notes}</p>
        </Card>
      </div>
    </AppLayout>
  );
}

