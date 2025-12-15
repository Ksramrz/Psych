'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/Button';
import { useApiRequest } from '@/hooks/useApiRequest';

export default function UploadNotesPage() {
  const router = useRouter();
  const { request } = useApiRequest();
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!notes.trim()) {
      setError('Please enter your notes');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await request<{ id: string }>('/notes', {
        method: 'POST',
        body: JSON.stringify({ raw_notes: notes }),
      });

      router.push(`/notes/${response.id}`);
    } catch (err: any) {
      setError(err.message || 'Failed to process notes');
      setIsLoading(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setNotes(event.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Upload Session Notes</h1>

        <form onSubmit={handleSubmit} className="bg-white bg-white border border-gray-200 shadow-sm rounded-lg p-6 space-y-6">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="file" className="block text-sm font-medium text-slate-700">
              Upload File (Optional)
            </label>
            <input
              type="file"
              id="file"
              onChange={handleFileUpload}
              accept=".txt,.doc,.docx"
              className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="notes" className="block text-sm font-medium text-slate-700">
              Or Paste Notes Here
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={15}
              className="w-full px-3 py-2 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="Paste your session notes here..."
            />
          </div>

          <div className="flex justify-end space-x-3">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} isLoading={isLoading}>
              Summarize Notes
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}

