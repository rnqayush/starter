import { apiSlice } from './apiSlice';
import { API_ENDPOINTS } from '../../constants/api';

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // User Authentication
    register: builder.mutation({
      query: (userData) => ({
        url: API_ENDPOINTS.AUTH.REGISTER,
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['User'],
    }),
    
    login: builder.mutation({
      query: (credentials) => ({
        url: API_ENDPOINTS.AUTH.LOGIN,
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['User'],
    }),
    
    logout: builder.mutation({
      query: () => ({
        url: API_ENDPOINTS.AUTH.LOGOUT,
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),
    
    getCurrentUser: builder.query({
      query: () => API_ENDPOINTS.AUTH.ME,
      providesTags: ['User'],
    }),
    
    updateProfile: builder.mutation({
      query: (profileData) => ({
        url: API_ENDPOINTS.AUTH.PROFILE,
        method: 'PUT',
        body: profileData,
      }),
      invalidatesTags: ['User'],
    }),
    
    changePassword: builder.mutation({
      query: (passwordData) => ({
        url: API_ENDPOINTS.AUTH.PROFILE,
        method: 'PUT',
        body: passwordData,
      }),
      invalidatesTags: ['User'],
    }),
    
    // Vendor Authentication
    vendorRegister: builder.mutation({
      query: (vendorData) => ({
        url: API_ENDPOINTS.VENDOR.REGISTER,
        method: 'POST',
        body: vendorData,
      }),
      invalidatesTags: ['Vendor'],
    }),
    
    vendorLogin: builder.mutation({
      query: (credentials) => ({
        url: API_ENDPOINTS.VENDOR.LOGIN,
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Vendor'],
    }),
    
    getVendorProfile: builder.query({
      query: () => API_ENDPOINTS.VENDOR.PROFILE,
      providesTags: ['Vendor'],
    }),
    
    updateVendorProfile: builder.mutation({
      query: (profileData) => ({
        url: API_ENDPOINTS.VENDOR.PROFILE,
        method: 'PUT',
        body: profileData,
      }),
      invalidatesTags: ['Vendor'],
    }),
    
    getVendorDashboard: builder.query({
      query: () => API_ENDPOINTS.VENDOR.DASHBOARD,
      providesTags: ['Vendor'],
    }),
    
    getVendorById: builder.query({
      query: (id) => API_ENDPOINTS.VENDOR.BY_ID(id),
      providesTags: (result, error, id) => [{ type: 'Vendor', id }],
    }),
    
    // Admin Authentication
    adminLogin: builder.mutation({
      query: (credentials) => ({
        url: API_ENDPOINTS.ADMIN.LOGIN,
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Admin'],
    }),

    // Password Reset
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
        method: 'POST',
        body: { email },
      }),
    }),

    resetPassword: builder.mutation({
      query: ({ token, password }) => ({
        url: API_ENDPOINTS.AUTH.RESET_PASSWORD,
        method: 'POST',
        body: { token, password },
      }),
    }),

    // Refresh Token
    refreshToken: builder.mutation({
      query: () => ({
        url: API_ENDPOINTS.AUTH.REFRESH,
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),

    // Email Verification
    verifyEmail: builder.mutation({
      query: (token) => ({
        url: API_ENDPOINTS.AUTH.VERIFY_EMAIL,
        method: 'POST',
        body: { token },
      }),
      invalidatesTags: ['User'],
    }),

    resendVerification: builder.mutation({
      query: () => ({
        url: API_ENDPOINTS.AUTH.RESEND_VERIFICATION,
        method: 'POST',
      }),
    }),
  }),
});

export const {
  // User auth
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetCurrentUserQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  
  // Vendor auth
  useVendorRegisterMutation,
  useVendorLoginMutation,
  useGetVendorProfileQuery,
  useUpdateVendorProfileMutation,
  useGetVendorDashboardQuery,
  useGetVendorByIdQuery,
  
  // Admin auth
  useAdminLoginMutation,

  // Password reset
  useForgotPasswordMutation,
  useResetPasswordMutation,

  // Token management
  useRefreshTokenMutation,

  // Email verification
  useVerifyEmailMutation,
  useResendVerificationMutation,
} = authApi;
