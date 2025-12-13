'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function EthicsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Ethics Check</h1>
            <Link
              href="/ethics/check"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              New Check
            </Link>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <p className="text-sm text-gray-500">No ethics checks yet. Start a new check.</p>
          </div>
        </div>
      </main>
    </div>
  );
}

