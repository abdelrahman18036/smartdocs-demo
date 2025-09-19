import { useState, useEffect, useCallback } from 'react'

interface ApiState<T> {
  data: T | null
  loading: boolean
  error: Error | null
}

interface ApiCallOptions {
  immediate?: boolean
  onSuccess?: (data: unknown) => void
  onError?: (error: Error) => void
}

/**
 * Custom hook for making API calls with loading and error states
 * 
 * @param url - API endpoint URL
 * @param options - Configuration options
 * @returns API state and execute function
 */
export function useApiCall<T = unknown>(
  url: string,
  options: ApiCallOptions = {}
) {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null
  })

  const execute = useCallback(async (requestOptions?: RequestInit) => {
    setState(prev => ({ ...prev, loading: true, error: null }))

    try {
      // Simulate API delay for demo purposes
      await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500))

      const response = await fetch(url, requestOptions)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      
      setState({
        data,
        loading: false,
        error: null
      })

      if (options.onSuccess) {
        options.onSuccess(data)
      }

      return data
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error occurred')
      
      setState({
        data: null,
        loading: false,
        error: errorObj
      })

      if (options.onError) {
        options.onError(errorObj)
      }

      throw errorObj
    }
  }, [url, options])

  // Execute immediately if specified
  useEffect(() => {
    if (options.immediate) {
      execute().catch(console.error)
    }
  }, [url, options.immediate, execute])

  return {
    ...state,
    execute
  }
}

/**
 * Hook for simulating user data fetching (demo purposes)
 */
export function useUserData() {
  return useApiCall('https://jsonplaceholder.typicode.com/users/1', {
    immediate: false
  })
}