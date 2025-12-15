const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://clinic.cashvers.com/api';

// Client-side API request with Clerk token
export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
  token?: string | null
): Promise<T> {
  try {
    // Get token if not provided (for client components)
    const authToken = token;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
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

