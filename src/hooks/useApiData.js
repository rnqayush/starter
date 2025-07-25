import { useState, useEffect } from 'react';

/**
 * Custom hook for handling API data with loading states and error handling
 * @param {Function} apiHook - RTK Query hook function
 * @param {Object} params - Parameters to pass to the API hook
 * @param {Object} options - Additional options
 * @returns {Object} - { data, isLoading, error, refetch }
 */
export const useApiData = (apiHook, params = {}, options = {}) => {
  const {
    skip = false,
    pollingInterval = 0,
    refetchOnMountOrArgChange = false,
  } = options;

  const result = apiHook(params, {
    skip,
    pollingInterval,
    refetchOnMountOrArgChange,
  });

  return {
    data: result.data?.data || result.data,
    isLoading: result.isLoading,
    isFetching: result.isFetching,
    error: result.error,
    refetch: result.refetch,
    isSuccess: result.isSuccess,
    isError: result.isError,
  };
};

/**
 * Custom hook for handling paginated API data
 * @param {Function} apiHook - RTK Query hook function
 * @param {Object} initialParams - Initial parameters
 * @returns {Object} - Paginated data with controls
 */
export const usePaginatedApiData = (apiHook, initialParams = {}) => {
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    ...initialParams,
  });

  const result = apiHook(params);

  const goToPage = (page) => {
    setParams(prev => ({ ...prev, page }));
  };

  const changeLimit = (limit) => {
    setParams(prev => ({ ...prev, limit, page: 1 }));
  };

  const updateFilters = (filters) => {
    setParams(prev => ({ ...prev, ...filters, page: 1 }));
  };

  const resetFilters = () => {
    setParams({ page: 1, limit: params.limit });
  };

  return {
    data: result.data?.data || result.data,
    items: result.data?.data?.items || result.data?.items || [],
    pagination: result.data?.data?.pagination || result.data?.pagination || {},
    isLoading: result.isLoading,
    isFetching: result.isFetching,
    error: result.error,
    refetch: result.refetch,
    params,
    goToPage,
    changeLimit,
    updateFilters,
    resetFilters,
  };
};

/**
 * Custom hook for handling search functionality
 * @param {Function} apiHook - RTK Query hook function
 * @param {Object} baseParams - Base parameters
 * @param {number} debounceMs - Debounce delay in milliseconds
 * @returns {Object} - Search data with controls
 */
export const useSearchApiData = (apiHook, baseParams = {}, debounceMs = 300) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [searchTerm, debounceMs]);

  const params = {
    ...baseParams,
    search: debouncedSearchTerm,
  };

  const result = apiHook(params, {
    skip: !debouncedSearchTerm && !baseParams.search,
  });

  return {
    data: result.data?.data || result.data,
    items: result.data?.data?.items || result.data?.items || [],
    isLoading: result.isLoading,
    isFetching: result.isFetching,
    error: result.error,
    searchTerm,
    setSearchTerm,
    refetch: result.refetch,
  };
};

/**
 * Custom hook for handling mutations with loading states
 * @param {Function} mutationHook - RTK Query mutation hook
 * @returns {Object} - Mutation function with states
 */
export const useApiMutation = (mutationHook) => {
  const [trigger, result] = mutationHook();

  const mutate = async (data) => {
    try {
      const response = await trigger(data).unwrap();
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error };
    }
  };

  return {
    mutate,
    isLoading: result.isLoading,
    error: result.error,
    isSuccess: result.isSuccess,
    isError: result.isError,
    data: result.data,
    reset: result.reset,
  };
};
