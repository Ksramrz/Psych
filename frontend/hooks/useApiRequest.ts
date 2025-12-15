import { useAuth } from '@clerk/nextjs';
import { apiRequest } from '@/lib/api';
import { useCallback } from 'react';

export function useApiRequest() {
  const { getToken } = useAuth();

  const request = useCallback(async <T,>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> => {
    const token = await getToken();
    return apiRequest<T>(endpoint, options, token);
  }, [getToken]);

  return { request };
}



