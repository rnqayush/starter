import { useState, useEffect, useCallback } from 'react';

// Custom hook for API calls with loading and error states
export const useApi = (apiFunction, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...args) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiFunction(...args);
      
      if (result.success) {
        setData(result.data);
        return result;
      } else {
        setError(result.message || 'An error occurred');
        return result;
      }
    } catch (err) {
      const errorMessage = err.message || 'An unexpected error occurred';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  }, dependencies);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    data,
    loading,
    error,
    execute,
    reset,
  };
};

// Custom hook for API calls that execute immediately
export const useApiEffect = (apiFunction, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiFunction();
      
      if (result.success) {
        setData(result.data);
      } else {
        setError(result.message || 'An error occurred');
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  }, dependencies);

  useEffect(() => {
    refetch();
  }, dependencies);

  return {
    data,
    loading,
    error,
    refetch,
  };
};

// Custom hook for paginated API calls
export const usePaginatedApi = (apiFunction, initialParams = {}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const fetchData = useCallback(async (pageNum = 1, params = {}, append = false) => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await apiFunction({
        ...initialParams,
        ...params,
        page: pageNum,
      });
      
      if (result.success) {
        const newData = result.data.items || result.data;
        const pagination = result.data.pagination || {};
        
        setData(prevData => append ? [...prevData, ...newData] : newData);
        setPage(pageNum);
        setTotalPages(pagination.totalPages || 1);
        setTotalItems(pagination.totalItems || newData.length);
        setHasMore(pageNum < (pagination.totalPages || 1));
      } else {
        setError(result.message || 'An error occurred');
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  }, [apiFunction, initialParams]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      fetchData(page + 1, {}, true);
    }
  }, [fetchData, loading, hasMore, page]);

  const refresh = useCallback((params = {}) => {
    fetchData(1, params, false);
  }, [fetchData]);

  const reset = useCallback(() => {
    setData([]);
    setError(null);
    setLoading(false);
    setHasMore(true);
    setPage(1);
    setTotalPages(0);
    setTotalItems(0);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    loading,
    error,
    hasMore,
    page,
    totalPages,
    totalItems,
    loadMore,
    refresh,
    reset,
  };
};

// Custom hook for search functionality
export const useSearch = (searchFunction, debounceMs = 300) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const search = useCallback(async (searchQuery) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const result = await searchFunction(searchQuery);
      
      if (result.success) {
        setResults(result.data.items || result.data);
      } else {
        setError(result.message || 'Search failed');
        setResults([]);
      }
    } catch (err) {
      setError(err.message || 'Search failed');
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, [searchFunction]);

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      search(query);
    }, debounceMs);

    return () => clearTimeout(timeoutId);
  }, [query, search, debounceMs]);

  const clearSearch = useCallback(() => {
    setQuery('');
    setResults([]);
    setError(null);
  }, []);

  return {
    query,
    setQuery,
    results,
    loading,
    error,
    clearSearch,
  };
};

