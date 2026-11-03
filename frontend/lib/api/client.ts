import { API_BASE_URL } from './config';
import { ApiError, NetworkError } from './errors';

type RequestOptions = Omit<RequestInit, 'body'> & {
  params?: Record<string, string | number | undefined>;
  body?: unknown;
};

export async function apiClient<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { params, body, ...fetchOptions } = options;
  const url = new URL(`${API_BASE_URL}${endpoint}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  try {
    const response = await fetch(url.toString(), {
      headers: {
        'Content-Type': 'application/json',
        ...fetchOptions.headers,
      },
      ...fetchOptions,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new ApiError(errorBody || response.statusText, response.status, endpoint);
    }

    // Handle empty responses
    const text = await response.text();
    return (text ? JSON.parse(text) : null) as T;
  } catch (error) {
    if (error instanceof ApiError) throw error;

    throw new NetworkError(
      error instanceof Error ? error.message : 'Network request failed',
      endpoint
    );
  }
}
