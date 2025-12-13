'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { apiRequest } from '@/lib/api';

export default function SettingsPage() {
  const [dataStorage, setDataStorage] = useState(true);
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch current storage preference
    // In a real app, fetch from user profile
  }, []);

  const handleStorageToggle = async (enabled: boolean) => {
    setLoading(true);
    try {
      await apiRequest('/api/settings/storage', {
        method: 'PUT',
        body: JSON.stringify({ data_storage_enabled: enabled }),
      });
      setDataStorage(enabled);
      setMessage(enabled ? 'Data storage enabled' : 'Temporary mode enabled - data will be deleted after 24 hours');
    } catch (error: any) {
      setMessage('Failed to update storage preference');
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleExport = async () => {
    setExporting(true);
    try {
      const data = await apiRequest('/api/settings/export');
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `clinicsense-export-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setMessage('Data exported successfully');
    } catch (error: any) {
      setMessage('Failed to export data');
    } finally {
      setExporting(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Settings</h1>

          {message && (
            <div className={`mb-4 px-4 py-3 rounded ${
              message.includes('Failed') 
                ? 'bg-red-50 border border-red-200 text-red-700' 
                : 'bg-green-50 border border-green-200 text-green-700'
            }`}>
              {message}
            </div>
          )}

          <div className="bg-white shadow rounded-lg p-6 space-y-6">
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Privacy & Data</h2>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Data Storage</p>
                  <p className="text-sm text-gray-500">
                    {dataStorage
                      ? 'Your data is stored securely and can be exported.'
                      : 'Data will be deleted after 24 hours. Nothing is stored permanently.'}
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={dataStorage}
                    onChange={(e) => handleStorageToggle(e.target.checked)}
                    disabled={loading}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 disabled:opacity-50"></div>
                </label>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Export Data</h2>
              <p className="text-sm text-gray-500 mb-4">
                Download all your stored data in JSON format.
              </p>
              <button
                onClick={handleExport}
                disabled={exporting}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                {exporting ? 'Exporting...' : 'Export All Data'}
              </button>
            </div>

            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Subscription</h2>
              <p className="text-sm text-gray-500 mb-4">Current plan: Free</p>
              <div className="space-y-3">
                <button
                  onClick={async () => {
                    try {
                      const response = await apiRequest<{ url: string }>('/api/subscriptions/checkout', {
                        method: 'POST',
                        body: JSON.stringify({ planId: 'pro' }),
                      });
                      window.location.href = response.url;
                    } catch (error) {
                      setMessage('Failed to start checkout');
                    }
                  }}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Upgrade to Pro ($29/month)
                </button>
                <button
                  onClick={async () => {
                    try {
                      const response = await apiRequest<{ url: string }>('/api/subscriptions/checkout', {
                        method: 'POST',
                        body: JSON.stringify({ planId: 'clinic' }),
                      });
                      window.location.href = response.url;
                    } catch (error) {
                      setMessage('Failed to start checkout');
                    }
                  }}
                  className="ml-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Upgrade to Clinic ($99/month)
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

