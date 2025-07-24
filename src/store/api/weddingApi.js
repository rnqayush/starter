import { apiSlice } from './apiSlice';
import { API_ENDPOINTS } from '../../constants/api';

export const weddingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all wedding services with pagination and filters
    getWeddingServices: builder.query({
      query: (params = {}) => {
        const searchParams = new URLSearchParams();
        
        // Add pagination
        if (params.page) searchParams.append('page', params.page);
        if (params.limit) searchParams.append('limit', params.limit);
        
        // Add filters
        if (params.serviceType) searchParams.append('serviceType', params.serviceType);
        if (params.location) searchParams.append('location', params.location);
        if (params.priceMin) searchParams.append('priceMin', params.priceMin);
        if (params.priceMax) searchParams.append('priceMax', params.priceMax);
        if (params.capacityMin) searchParams.append('capacityMin', params.capacityMin);
        if (params.capacityMax) searchParams.append('capacityMax', params.capacityMax);
        if (params.rating) searchParams.append('rating', params.rating);
        if (params.features) searchParams.append('features', params.features);
        if (params.availability) searchParams.append('availability', params.availability);
        
        // Add sorting
        if (params.sortBy) searchParams.append('sortBy', params.sortBy);
        if (params.sortOrder) searchParams.append('sortOrder', params.sortOrder);
        
        // Add search
        if (params.search) searchParams.append('search', params.search);
        
        const queryString = searchParams.toString();
        return `${API_ENDPOINTS.WEDDING.LIST}${queryString ? `?${queryString}` : ''}`;
      },
      providesTags: (result) =>
        result?.data?.services
          ? [
              ...result.data.services.map(({ _id }) => ({ type: 'Wedding', id: _id })),
              { type: 'Wedding', id: 'LIST' },
            ]
          : [{ type: 'Wedding', id: 'LIST' }],
    }),
    
    // Get wedding service by ID
    getWeddingServiceById: builder.query({
      query: (id) => API_ENDPOINTS.WEDDING.BY_ID(id),
      providesTags: (result, error, id) => [{ type: 'Wedding', id }],
    }),
    
    // Create new wedding service (vendor only)
    createWeddingService: builder.mutation({
      query: (serviceData) => ({
        url: API_ENDPOINTS.WEDDING.CREATE,
        method: 'POST',
        body: serviceData,
      }),
      invalidatesTags: [{ type: 'Wedding', id: 'LIST' }, 'Stats'],
    }),
    
    // Update wedding service (vendor only)
    updateWeddingService: builder.mutation({
      query: ({ id, ...serviceData }) => ({
        url: API_ENDPOINTS.WEDDING.UPDATE(id),
        method: 'PUT',
        body: serviceData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Wedding', id },
        { type: 'Wedding', id: 'LIST' },
      ],
    }),
    
    // Delete wedding service (vendor only)
    deleteWeddingService: builder.mutation({
      query: (id) => ({
        url: API_ENDPOINTS.WEDDING.DELETE(id),
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Wedding', id },
        { type: 'Wedding', id: 'LIST' },
        'Stats',
      ],
    }),
    
    // Get vendor's wedding services
    getVendorWeddingServices: builder.query({
      query: (params = {}) => {
        const searchParams = new URLSearchParams();
        
        if (params.page) searchParams.append('page', params.page);
        if (params.limit) searchParams.append('limit', params.limit);
        if (params.status) searchParams.append('status', params.status);
        if (params.serviceType) searchParams.append('serviceType', params.serviceType);
        if (params.sortBy) searchParams.append('sortBy', params.sortBy);
        if (params.sortOrder) searchParams.append('sortOrder', params.sortOrder);
        
        const queryString = searchParams.toString();
        return `${API_ENDPOINTS.WEDDING.VENDOR_SERVICES}${queryString ? `?${queryString}` : ''}`;
      },
      providesTags: (result) =>
        result?.data?.services
          ? [
              ...result.data.services.map(({ _id }) => ({ type: 'Wedding', id: _id })),
              { type: 'Wedding', id: 'VENDOR_LIST' },
            ]
          : [{ type: 'Wedding', id: 'VENDOR_LIST' }],
    }),
    
    // Get wedding service types
    getWeddingServiceTypes: builder.query({
      query: () => '/wedding/service-types',
      providesTags: ['Wedding'],
    }),
    
    // Get featured wedding services
    getFeaturedWeddingServices: builder.query({
      query: (limit = 8) => `/wedding/featured?limit=${limit}`,
      providesTags: ['Wedding'],
    }),
    
    // Get wedding venues
    getWeddingVenues: builder.query({
      query: (params = {}) => {
        const searchParams = new URLSearchParams();
        if (params.page) searchParams.append('page', params.page);
        if (params.limit) searchParams.append('limit', params.limit);
        if (params.location) searchParams.append('location', params.location);
        if (params.capacityMin) searchParams.append('capacityMin', params.capacityMin);
        if (params.capacityMax) searchParams.append('capacityMax', params.capacityMax);
        
        const queryString = searchParams.toString();
        return `/wedding/venues${queryString ? `?${queryString}` : ''}`;
      },
      providesTags: ['Wedding'],
    }),
    
    // Get wedding photographers
    getWeddingPhotographers: builder.query({
      query: (params = {}) => {
        const searchParams = new URLSearchParams();
        if (params.page) searchParams.append('page', params.page);
        if (params.limit) searchParams.append('limit', params.limit);
        if (params.location) searchParams.append('location', params.location);
        if (params.priceMin) searchParams.append('priceMin', params.priceMin);
        if (params.priceMax) searchParams.append('priceMax', params.priceMax);
        
        const queryString = searchParams.toString();
        return `/wedding/photographers${queryString ? `?${queryString}` : ''}`;
      },
      providesTags: ['Wedding'],
    }),
    
    // Get wedding caterers
    getWeddingCaterers: builder.query({
      query: (params = {}) => {
        const searchParams = new URLSearchParams();
        if (params.page) searchParams.append('page', params.page);
        if (params.limit) searchParams.append('limit', params.limit);
        if (params.location) searchParams.append('location', params.location);
        if (params.cuisineType) searchParams.append('cuisineType', params.cuisineType);
        
        const queryString = searchParams.toString();
        return `/wedding/caterers${queryString ? `?${queryString}` : ''}`;
      },
      providesTags: ['Wedding'],
    }),
    
    // Check service availability
    checkServiceAvailability: builder.query({
      query: ({ serviceId, date }) => 
        `/wedding/${serviceId}/availability?date=${date}`,
      providesTags: (result, error, { serviceId }) => [
        { type: 'Wedding', id: serviceId }
      ],
    }),

    // Testimonials management
    addTestimonial: builder.mutation({
      query: ({ id, testimonialData }) => ({
        url: `/wedding/${id}/testimonials`,
        method: 'POST',
        body: testimonialData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Wedding', id },
        'Wedding',
      ],
    }),

    updateTestimonial: builder.mutation({
      query: ({ id, testimonialId, testimonialData }) => ({
        url: `/wedding/${id}/testimonials/${testimonialId}`,
        method: 'PUT',
        body: testimonialData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Wedding', id },
        'Wedding',
      ],
    }),

    deleteTestimonial: builder.mutation({
      query: ({ id, testimonialId }) => ({
        url: `/wedding/${id}/testimonials/${testimonialId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Wedding', id },
        'Wedding',
      ],
    }),

    // FAQ management
    addFAQ: builder.mutation({
      query: ({ id, faqData }) => ({
        url: `/wedding/${id}/faqs`,
        method: 'POST',
        body: faqData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Wedding', id },
        'Wedding',
      ],
    }),

    updateFAQ: builder.mutation({
      query: ({ id, faqId, faqData }) => ({
        url: `/wedding/${id}/faqs/${faqId}`,
        method: 'PUT',
        body: faqData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Wedding', id },
        'Wedding',
      ],
    }),

    deleteFAQ: builder.mutation({
      query: ({ id, faqId }) => ({
        url: `/wedding/${id}/faqs/${faqId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Wedding', id },
        'Wedding',
      ],
    }),

    // Offers management
    addOffer: builder.mutation({
      query: ({ id, offerData }) => ({
        url: `/wedding/${id}/offers`,
        method: 'POST',
        body: offerData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Wedding', id },
        'Wedding',
      ],
    }),

    updateOffer: builder.mutation({
      query: ({ id, offerId, offerData }) => ({
        url: `/wedding/${id}/offers/${offerId}`,
        method: 'PUT',
        body: offerData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Wedding', id },
        'Wedding',
      ],
    }),

    deleteOffer: builder.mutation({
      query: ({ id, offerId }) => ({
        url: `/wedding/${id}/offers/${offerId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Wedding', id },
        'Wedding',
      ],
    }),
  }),
});

export const {
  useGetWeddingServicesQuery,
  useGetWeddingServiceByIdQuery,
  useCreateWeddingServiceMutation,
  useUpdateWeddingServiceMutation,
  useDeleteWeddingServiceMutation,
  useGetVendorWeddingServicesQuery,
  useGetWeddingServiceTypesQuery,
  useGetFeaturedWeddingServicesQuery,
  useGetWeddingVenuesQuery,
  useGetWeddingPhotographersQuery,
  useGetWeddingCaterersQuery,
  useCheckServiceAvailabilityQuery,
  useAddTestimonialMutation,
  useUpdateTestimonialMutation,
  useDeleteTestimonialMutation,
  useAddFAQMutation,
  useUpdateFAQMutation,
  useDeleteFAQMutation,
  useAddOfferMutation,
  useUpdateOfferMutation,
  useDeleteOfferMutation,
} = weddingApi;
