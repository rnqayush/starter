import { apiSlice } from './apiSlice';
import { API_ENDPOINTS } from '../../constants/api';

export const automobileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all vehicles with pagination and filters
    getVehicles: builder.query({
      query: (params = {}) => {
        const searchParams = new URLSearchParams();
        
        // Add pagination
        if (params.page) searchParams.append('page', params.page);
        if (params.limit) searchParams.append('limit', params.limit);
        
        // Add filters
        if (params.type) searchParams.append('type', params.type);
        if (params.brand) searchParams.append('brand', params.brand);
        if (params.model) searchParams.append('model', params.model);
        if (params.yearMin) searchParams.append('yearMin', params.yearMin);
        if (params.yearMax) searchParams.append('yearMax', params.yearMax);
        if (params.priceMin) searchParams.append('priceMin', params.priceMin);
        if (params.priceMax) searchParams.append('priceMax', params.priceMax);
        if (params.mileageMin) searchParams.append('mileageMin', params.mileageMin);
        if (params.mileageMax) searchParams.append('mileageMax', params.mileageMax);
        if (params.fuelType) searchParams.append('fuelType', params.fuelType);
        if (params.transmission) searchParams.append('transmission', params.transmission);
        if (params.condition) searchParams.append('condition', params.condition);
        if (params.location) searchParams.append('location', params.location);
        if (params.listingType) searchParams.append('listingType', params.listingType);
        
        // Add sorting
        if (params.sortBy) searchParams.append('sortBy', params.sortBy);
        if (params.sortOrder) searchParams.append('sortOrder', params.sortOrder);
        
        // Add search
        if (params.search) searchParams.append('search', params.search);
        
        const queryString = searchParams.toString();
        return `${API_ENDPOINTS.AUTOMOBILE.LIST}${queryString ? `?${queryString}` : ''}`;
      },
      providesTags: (result) =>
        result?.data?.vehicles
          ? [
              ...result.data.vehicles.map(({ _id }) => ({ type: 'Automobile', id: _id })),
              { type: 'Automobile', id: 'LIST' },
            ]
          : [{ type: 'Automobile', id: 'LIST' }],
    }),
    
    // Get vehicle by ID
    getVehicleById: builder.query({
      query: (id) => API_ENDPOINTS.AUTOMOBILE.BY_ID(id),
      providesTags: (result, error, id) => [{ type: 'Automobile', id }],
    }),
    
    // Create new vehicle listing (vendor only)
    createVehicle: builder.mutation({
      query: (vehicleData) => ({
        url: API_ENDPOINTS.AUTOMOBILE.CREATE,
        method: 'POST',
        body: vehicleData,
      }),
      invalidatesTags: [{ type: 'Automobile', id: 'LIST' }, 'Stats'],
    }),
    
    // Update vehicle (vendor only)
    updateVehicle: builder.mutation({
      query: ({ id, ...vehicleData }) => ({
        url: API_ENDPOINTS.AUTOMOBILE.UPDATE(id),
        method: 'PUT',
        body: vehicleData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Automobile', id },
        { type: 'Automobile', id: 'LIST' },
      ],
    }),
    
    // Delete vehicle (vendor only)
    deleteVehicle: builder.mutation({
      query: (id) => ({
        url: API_ENDPOINTS.AUTOMOBILE.DELETE(id),
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Automobile', id },
        { type: 'Automobile', id: 'LIST' },
        'Stats',
      ],
    }),
    
    // Get vendor's vehicles
    getVendorVehicles: builder.query({
      query: (params = {}) => {
        const searchParams = new URLSearchParams();
        
        if (params.page) searchParams.append('page', params.page);
        if (params.limit) searchParams.append('limit', params.limit);
        if (params.status) searchParams.append('status', params.status);
        if (params.type) searchParams.append('type', params.type);
        if (params.sortBy) searchParams.append('sortBy', params.sortBy);
        if (params.sortOrder) searchParams.append('sortOrder', params.sortOrder);
        
        const queryString = searchParams.toString();
        return `${API_ENDPOINTS.AUTOMOBILE.VENDOR_VEHICLES}${queryString ? `?${queryString}` : ''}`;
      },
      providesTags: (result) =>
        result?.data?.vehicles
          ? [
              ...result.data.vehicles.map(({ _id }) => ({ type: 'Automobile', id: _id })),
              { type: 'Automobile', id: 'VENDOR_LIST' },
            ]
          : [{ type: 'Automobile', id: 'VENDOR_LIST' }],
    }),
    
    // Get vehicle brands
    getVehicleBrands: builder.query({
      query: () => '/automobile/brands',
      providesTags: ['Automobile'],
    }),
    
    // Get vehicle models by brand
    getVehicleModels: builder.query({
      query: (brand) => `/automobile/models?brand=${brand}`,
      providesTags: ['Automobile'],
    }),
    
    // Get featured vehicles
    getFeaturedVehicles: builder.query({
      query: (limit = 8) => `/automobile/featured?limit=${limit}`,
      providesTags: ['Automobile'],
    }),
    
    // Get vehicles for sale
    getVehiclesForSale: builder.query({
      query: (params = {}) => {
        const searchParams = new URLSearchParams();
        if (params.page) searchParams.append('page', params.page);
        if (params.limit) searchParams.append('limit', params.limit);
        if (params.type) searchParams.append('type', params.type);
        
        const queryString = searchParams.toString();
        return `/automobile/for-sale${queryString ? `?${queryString}` : ''}`;
      },
      providesTags: ['Automobile'],
    }),
    
    // Get vehicles for rent
    getVehiclesForRent: builder.query({
      query: (params = {}) => {
        const searchParams = new URLSearchParams();
        if (params.page) searchParams.append('page', params.page);
        if (params.limit) searchParams.append('limit', params.limit);
        if (params.type) searchParams.append('type', params.type);
        
        const queryString = searchParams.toString();
        return `/automobile/for-rent${queryString ? `?${queryString}` : ''}`;
      },
      providesTags: ['Automobile'],
    }),
  }),
});

export const {
  useGetVehiclesQuery,
  useGetVehicleByIdQuery,
  useCreateVehicleMutation,
  useUpdateVehicleMutation,
  useDeleteVehicleMutation,
  useGetVendorVehiclesQuery,
  useGetVehicleBrandsQuery,
  useGetVehicleModelsQuery,
  useGetFeaturedVehiclesQuery,
  useGetVehiclesForSaleQuery,
  useGetVehiclesForRentQuery,
} = automobileApi;
