import { apiSlice } from './apiSlice';
import { API_ENDPOINTS } from '../../constants/api';

export const hotelApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all hotels with pagination and filters
    getHotels: builder.query({
      query: (params = {}) => {
        const searchParams = new URLSearchParams();
        
        // Add pagination
        if (params.page) searchParams.append('page', params.page);
        if (params.limit) searchParams.append('limit', params.limit);
        
        // Add filters
        if (params.location) searchParams.append('location', params.location);
        if (params.priceMin) searchParams.append('priceMin', params.priceMin);
        if (params.priceMax) searchParams.append('priceMax', params.priceMax);
        if (params.rating) searchParams.append('rating', params.rating);
        if (params.amenities) searchParams.append('amenities', params.amenities);
        if (params.category) searchParams.append('category', params.category);
        
        // Add sorting
        if (params.sortBy) searchParams.append('sortBy', params.sortBy);
        if (params.sortOrder) searchParams.append('sortOrder', params.sortOrder);
        
        // Add search
        if (params.search) searchParams.append('search', params.search);
        
        const queryString = searchParams.toString();
        return `${API_ENDPOINTS.HOTEL.LIST}${queryString ? `?${queryString}` : ''}`;
      },
      providesTags: (result) =>
        result?.data?.hotels
          ? [
              ...result.data.hotels.map(({ _id }) => ({ type: 'Hotel', id: _id })),
              { type: 'Hotel', id: 'LIST' },
            ]
          : [{ type: 'Hotel', id: 'LIST' }],
    }),
    
    // Get hotel by ID
    getHotelById: builder.query({
      query: (id) => API_ENDPOINTS.HOTEL.BY_ID(id),
      providesTags: (result, error, id) => [{ type: 'Hotel', id }],
    }),
    
    // Create new hotel (vendor only)
    createHotel: builder.mutation({
      query: (hotelData) => ({
        url: API_ENDPOINTS.HOTEL.CREATE,
        method: 'POST',
        body: hotelData,
      }),
      invalidatesTags: [{ type: 'Hotel', id: 'LIST' }, 'Stats'],
    }),
    
    // Update hotel (vendor only)
    updateHotel: builder.mutation({
      query: ({ id, ...hotelData }) => ({
        url: API_ENDPOINTS.HOTEL.UPDATE(id),
        method: 'PUT',
        body: hotelData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Hotel', id },
        { type: 'Hotel', id: 'LIST' },
      ],
    }),
    
    // Delete hotel (vendor only)
    deleteHotel: builder.mutation({
      query: (id) => ({
        url: API_ENDPOINTS.HOTEL.DELETE(id),
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Hotel', id },
        { type: 'Hotel', id: 'LIST' },
        'Stats',
      ],
    }),
    
    // Get vendor's hotels
    getVendorHotels: builder.query({
      query: (params = {}) => {
        const searchParams = new URLSearchParams();
        
        if (params.page) searchParams.append('page', params.page);
        if (params.limit) searchParams.append('limit', params.limit);
        if (params.status) searchParams.append('status', params.status);
        if (params.sortBy) searchParams.append('sortBy', params.sortBy);
        if (params.sortOrder) searchParams.append('sortOrder', params.sortOrder);
        
        const queryString = searchParams.toString();
        return `${API_ENDPOINTS.HOTEL.VENDOR_HOTELS}${queryString ? `?${queryString}` : ''}`;
      },
      providesTags: (result) =>
        result?.data?.hotels
          ? [
              ...result.data.hotels.map(({ _id }) => ({ type: 'Hotel', id: _id })),
              { type: 'Hotel', id: 'VENDOR_LIST' },
            ]
          : [{ type: 'Hotel', id: 'VENDOR_LIST' }],
    }),
    
    // Get hotel statistics (vendor only)
    getHotelStats: builder.query({
      query: () => '/hotel/vendor/stats',
      providesTags: ['Stats'],
    }),
  }),
});

export const {
  useGetHotelsQuery,
  useGetHotelByIdQuery,
  useCreateHotelMutation,
  useUpdateHotelMutation,
  useDeleteHotelMutation,
  useGetVendorHotelsQuery,
  useGetHotelStatsQuery,
} = hotelApi;
