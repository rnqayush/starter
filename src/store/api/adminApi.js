import { apiSlice } from './apiSlice';
import { API_ENDPOINTS } from '../../constants/api';

export const adminApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get admin dashboard data
    getAdminDashboard: builder.query({
      query: () => API_ENDPOINTS.ADMIN.DASHBOARD,
      providesTags: ['Admin'],
    }),
    
    // Get all vendors with pagination and filters
    getVendors: builder.query({
      query: (params = {}) => {
        const searchParams = new URLSearchParams();
        
        // Add pagination
        if (params.page) searchParams.append('page', params.page);
        if (params.limit) searchParams.append('limit', params.limit);
        
        // Add filters
        if (params.status) searchParams.append('status', params.status);
        if (params.category) searchParams.append('category', params.category);
        if (params.search) searchParams.append('search', params.search);
        
        // Add sorting
        if (params.sortBy) searchParams.append('sortBy', params.sortBy);
        if (params.sortOrder) searchParams.append('sortOrder', params.sortOrder);
        
        const queryString = searchParams.toString();
        return `${API_ENDPOINTS.ADMIN.VENDORS}${queryString ? `?${queryString}` : ''}`;
      },
      providesTags: (result) =>
        result?.data?.vendors
          ? [
              ...result.data.vendors.map(({ _id }) => ({ type: 'Vendor', id: _id })),
              { type: 'Vendor', id: 'LIST' },
            ]
          : [{ type: 'Vendor', id: 'LIST' }],
    }),
    
    // Approve vendor
    approveVendor: builder.mutation({
      query: (vendorId) => ({
        url: API_ENDPOINTS.ADMIN.APPROVE_VENDOR(vendorId),
        method: 'PUT',
      }),
      invalidatesTags: (result, error, vendorId) => [
        { type: 'Vendor', id: vendorId },
        { type: 'Vendor', id: 'LIST' },
        'Admin',
        'Stats',
      ],
    }),
    
    // Reject vendor
    rejectVendor: builder.mutation({
      query: (vendorId) => ({
        url: API_ENDPOINTS.ADMIN.REJECT_VENDOR(vendorId),
        method: 'PUT',
      }),
      invalidatesTags: (result, error, vendorId) => [
        { type: 'Vendor', id: vendorId },
        { type: 'Vendor', id: 'LIST' },
        'Admin',
        'Stats',
      ],
    }),
    
    // Delete vendor
    deleteVendor: builder.mutation({
      query: (vendorId) => ({
        url: API_ENDPOINTS.ADMIN.DELETE_VENDOR(vendorId),
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, vendorId) => [
        { type: 'Vendor', id: vendorId },
        { type: 'Vendor', id: 'LIST' },
        'Admin',
        'Stats',
      ],
    }),
    
    // Get all users
    getUsers: builder.query({
      query: (params = {}) => {
        const searchParams = new URLSearchParams();
        
        if (params.page) searchParams.append('page', params.page);
        if (params.limit) searchParams.append('limit', params.limit);
        if (params.role) searchParams.append('role', params.role);
        if (params.status) searchParams.append('status', params.status);
        if (params.search) searchParams.append('search', params.search);
        if (params.sortBy) searchParams.append('sortBy', params.sortBy);
        if (params.sortOrder) searchParams.append('sortOrder', params.sortOrder);
        
        const queryString = searchParams.toString();
        return `${API_ENDPOINTS.ADMIN.USERS}${queryString ? `?${queryString}` : ''}`;
      },
      providesTags: (result) =>
        result?.data?.users
          ? [
              ...result.data.users.map(({ _id }) => ({ type: 'User', id: _id })),
              { type: 'User', id: 'LIST' },
            ]
          : [{ type: 'User', id: 'LIST' }],
    }),
    
    // Get platform statistics
    getPlatformStats: builder.query({
      query: () => '/admin/stats',
      providesTags: ['Admin', 'Stats'],
    }),
    
    // Get revenue analytics
    getRevenueAnalytics: builder.query({
      query: (params = {}) => {
        const searchParams = new URLSearchParams();
        if (params.period) searchParams.append('period', params.period);
        if (params.startDate) searchParams.append('startDate', params.startDate);
        if (params.endDate) searchParams.append('endDate', params.endDate);
        
        const queryString = searchParams.toString();
        return `/admin/revenue${queryString ? `?${queryString}` : ''}`;
      },
      providesTags: ['Admin'],
    }),
    
    // Get user activity analytics
    getUserActivityAnalytics: builder.query({
      query: (params = {}) => {
        const searchParams = new URLSearchParams();
        if (params.period) searchParams.append('period', params.period);
        if (params.userType) searchParams.append('userType', params.userType);
        
        const queryString = searchParams.toString();
        return `/admin/user-activity${queryString ? `?${queryString}` : ''}`;
      },
      providesTags: ['Admin'],
    }),
  }),
});

export const {
  useGetAdminDashboardQuery,
  useGetVendorsQuery,
  useApproveVendorMutation,
  useRejectVendorMutation,
  useDeleteVendorMutation,
  useGetUsersQuery,
  useGetPlatformStatsQuery,
  useGetRevenueAnalyticsQuery,
  useGetUserActivityAnalyticsQuery,
} = adminApi;
