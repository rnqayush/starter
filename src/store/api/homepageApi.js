import { apiSlice } from './apiSlice';
import { API_ENDPOINTS } from '../../constants/api';

export const homepageApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get homepage content
    getHomepageContent: builder.query({
      query: () => API_ENDPOINTS.HOMEPAGE.CONTENT,
      providesTags: ['Homepage'],
    }),
    
    // Get category statistics
    getCategoryStats: builder.query({
      query: () => API_ENDPOINTS.HOMEPAGE.STATS,
      providesTags: ['Stats'],
    }),
    
    // Global search across all categories
    globalSearch: builder.query({
      query: (params = {}) => {
        const searchParams = new URLSearchParams();
        
        // Add search query
        if (params.q) searchParams.append('q', params.q);
        
        // Add category filter
        if (params.category) searchParams.append('category', params.category);
        
        // Add pagination
        if (params.page) searchParams.append('page', params.page);
        if (params.limit) searchParams.append('limit', params.limit);
        
        // Add location filter
        if (params.location) searchParams.append('location', params.location);
        
        // Add price range
        if (params.priceMin) searchParams.append('priceMin', params.priceMin);
        if (params.priceMax) searchParams.append('priceMax', params.priceMax);
        
        // Add sorting
        if (params.sortBy) searchParams.append('sortBy', params.sortBy);
        if (params.sortOrder) searchParams.append('sortOrder', params.sortOrder);
        
        const queryString = searchParams.toString();
        return `${API_ENDPOINTS.HOMEPAGE.SEARCH}${queryString ? `?${queryString}` : ''}`;
      },
      providesTags: ['Homepage'],
    }),
    
    // Get featured content for homepage
    getFeaturedContent: builder.query({
      query: (limit = 12) => `/homepage/featured?limit=${limit}`,
      providesTags: ['Homepage'],
    }),
    
    // Get recent listings
    getRecentListings: builder.query({
      query: (params = {}) => {
        const searchParams = new URLSearchParams();
        if (params.limit) searchParams.append('limit', params.limit);
        if (params.category) searchParams.append('category', params.category);
        
        const queryString = searchParams.toString();
        return `/homepage/recent${queryString ? `?${queryString}` : ''}`;
      },
      providesTags: ['Homepage'],
    }),
    
    // Get popular listings
    getPopularListings: builder.query({
      query: (params = {}) => {
        const searchParams = new URLSearchParams();
        if (params.limit) searchParams.append('limit', params.limit);
        if (params.category) searchParams.append('category', params.category);
        if (params.timeframe) searchParams.append('timeframe', params.timeframe);
        
        const queryString = searchParams.toString();
        return `/homepage/popular${queryString ? `?${queryString}` : ''}`;
      },
      providesTags: ['Homepage'],
    }),
    
    // Get trending searches
    getTrendingSearches: builder.query({
      query: (limit = 10) => `/homepage/trending-searches?limit=${limit}`,
      providesTags: ['Homepage'],
    }),
    
    // Get category highlights
    getCategoryHighlights: builder.query({
      query: () => '/homepage/category-highlights',
      providesTags: ['Homepage'],
    }),
    
    // Get testimonials
    getTestimonials: builder.query({
      query: (limit = 6) => `/homepage/testimonials?limit=${limit}`,
      providesTags: ['Homepage'],
    }),
    
    // Get platform statistics for homepage
    getPlatformStats: builder.query({
      query: () => '/homepage/platform-stats',
      providesTags: ['Stats'],
    }),
    
    // Search suggestions (autocomplete)
    getSearchSuggestions: builder.query({
      query: (query) => `/homepage/search-suggestions?q=${encodeURIComponent(query)}`,
      providesTags: ['Homepage'],
    }),
    
    // Get locations for search filters
    getSearchLocations: builder.query({
      query: () => '/homepage/locations',
      providesTags: ['Homepage'],
    }),
    
    // Get price ranges for different categories
    getPriceRanges: builder.query({
      query: (category) => `/homepage/price-ranges${category ? `?category=${category}` : ''}`,
      providesTags: ['Homepage'],
    }),
  }),
});

export const {
  useGetHomepageContentQuery,
  useGetCategoryStatsQuery,
  useGlobalSearchQuery,
  useGetFeaturedContentQuery,
  useGetRecentListingsQuery,
  useGetPopularListingsQuery,
  useGetTrendingSearchesQuery,
  useGetCategoryHighlightsQuery,
  useGetTestimonialsQuery,
  useGetPlatformStatsQuery,
  useGetSearchSuggestionsQuery,
  useGetSearchLocationsQuery,
  useGetPriceRangesQuery,
} = homepageApi;
