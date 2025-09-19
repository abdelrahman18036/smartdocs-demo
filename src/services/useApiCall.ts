import { useState, useEffect } from 'react';

/**
 * Custom hook for making API calls with loading and error states
 * 
 * @param url - The URL to fetch data from
 * @param options - Fetch options (method, headers, etc.)
 * @returns Object containing data, loading state, error, and refetch function
 * 
 * @example
 * const { data, loading, error, refetch } = useApiCall<User[]>('/api/users');
 * 
 * if (loading) return <div>Loading...</div>;
 * if (error) return <div>Error: {error.message}</div>;
 * 
 * return (
 *   <div>
 *     {data?.map(user => <div key={user.id}>{user.name}</div>)}
 *     <button onClick={refetch}>Refresh</button>
 *   </div>
 * );
 */
export function useApiCall<T = any>(
  url: string,
  options?: RequestInit
): {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
} {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(url, options);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  const refetch = () => {
    fetchData();
  };

  return { data, loading, error, refetch };
}