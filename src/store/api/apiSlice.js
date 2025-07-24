import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL, STORAGE_KEYS } from '../../constants/api';

// Base query with authentication
const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    // Get token from localStorage or Redux state
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN) || 
                  getState().auth?.token;
    
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    
    headers.set('content-type', 'application/json');
    return headers;
  },
});

// Base query with re-authentication
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  
  if (result.error && result.error.status === 401) {
    // Clear auth data on 401
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    
    // Dispatch logout action
    api.dispatch({ type: 'auth/logout' });
    
    // Redirect to login if not already there
    if (!window.location.pathname.includes('/login')) {
      window.location.href = '/login';
    }
  }
  
  return result;
};

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    'User', 
    'Vendor', 
    'Admin', 
    'Hotel', 
    'Ecommerce', 
    'Automobile', 
    'Wedding',
    'Business',
    'Freelance',
    'Homepage',
    'Stats'
  ],
  endpoints: (builder) => ({
    // Health check endpoint
    ping: builder.query({
      query: () => '/test/ping',
    }),
  }),
});

export const { usePingQuery } = apiSlice;
