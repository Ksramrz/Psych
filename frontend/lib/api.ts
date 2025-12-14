const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://clinic.cashvers.com/api';

// Client-side API request with Clerk token
export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
  token?: string | null
): Promise<T> {
  try {
    // Get token if not provided (for client components)
    let authToken = token;
    if (!authToken && typeof window !== 'undefined') {
      try {
        const { getToken } = await import('@clerk/nextjs');
        authToken = await getToken();
      } catch (err) {
        console.warn('Could not get Clerk token:', err);
      }
    }

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (authToken) {
      headers['Authorization'] = `Bearer ${authToken}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ 
        error: `HTTP error! status: ${response.status}` 
      }));
      throw new Error(error.error || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error: any) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Network error. Please check your connection.');
    }
    throw error;
  }
}

