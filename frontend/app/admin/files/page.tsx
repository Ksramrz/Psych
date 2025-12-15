'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

interface FileInfo {
  name: string;
  size: number;
  url: string;
}

export default function FileManagerPage() {
  const { userId, isLoaded } = useAuth();
  const router = useRouter();
  const [files, setFiles] = useState<FileInfo[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoaded && !userId) {
      router.push('/sign-in');
    }
  }, [isLoaded, userId, router]);

  useEffect(() => {
    if (userId) {
      fetchFiles();
    }
  }, [userId]);

  const fetchFiles = async () => {
    try {
      const response = await fetch('/admin/api/files');
      if (response.ok) {
        const data = await response.json();
        setFiles(data.files || []);
      } else {
        console.error('Failed to list files');
      }
    } catch (error) {
      console.error('Error fetching files:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/admin/api/files/upload', {
        method: 'POST',
        body: formData,
      });

      const contentType = response.headers.get('content-type');
      const isJson = contentType && contentType.includes('application/json');
      const payload = isJson ? await response.json().catch(() => ({})) : await response.text();

      if (response.ok) {
        await fetchFiles();
        alert('File uploaded successfully!');
      } else {
        const errorMsg =
          (isJson && (payload as any)?.error) ||
          (typeof payload === 'string' ? payload : 'Unknown error');
        alert(`Upload failed: ${errorMsg}`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setUploading(false);
      // Reset input
      e.target.value = '';
    }
  };

  const handleDelete = async (fileName: string) => {
    if (!confirm(`Are you sure you want to delete ${fileName}?`)) return;

    try {
      const response = await fetch(`/admin/api/files/${encodeURIComponent(fileName)}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchFiles();
        alert('File deleted successfully!');
      } else {
        const error = await response.json();
        alert(`Delete failed: ${error.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Delete failed. Please try again.');
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  if (!isLoaded || !userId) {
    return (
      <div className=