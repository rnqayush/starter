import { apiSlice } from './apiSlice';

export const businessApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all published business websites
    getAllBusinesses: builder.query({
      query: (params = {}) => ({
        url: '/business',
        params,
      }),
      providesTags: ['Business'],
    }),

    // Get business website by vendor ID
    getBusinessByVendor: builder.query({
      query: (vendorId) => `/business/vendor/${vendorId}`,
      providesTags: (result, error, vendorId) => [
        { type: 'Business', id: vendorId },
      ],
    }),

    // Get my business website
    getMyBusiness: builder.query({
      query: () => '/business/my-business',
      providesTags: ['Business'],
    }),

    // Create new business website
    createBusiness: builder.mutation({
      query: (businessData) => ({
        url: '/business',
        method: 'POST',
        body: businessData,
      }),
      invalidatesTags: ['Business'],
    }),

    // Update business website
    updateBusiness: builder.mutation({
      query: ({ id, ...businessData }) => ({
        url: `/business/${id}`,
        method: 'PUT',
        body: businessData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Business', id },
        'Business',
      ],
    }),

    // Update specific section of business website
    updateBusinessSection: builder.mutation({
      query: ({ id, sectionName, sectionData }) => ({
        url: `/business/${id}/section/${sectionName}`,
        method: 'PUT',
        body: sectionData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Business', id },
        'Business',
      ],
    }),

    // Services management
    addService: builder.mutation({
      query: ({ id, serviceData }) => ({
        url: `/business/${id}/services`,
        method: 'POST',
        body: serviceData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Business', id },
        'Business',
      ],
    }),

    updateService: builder.mutation({
      query: ({ id, serviceId, serviceData }) => ({
        url: `/business/${id}/services/${serviceId}`,
        method: 'PUT',
        body: serviceData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Business', id },
        'Business',
      ],
    }),

    deleteService: builder.mutation({
      query: ({ id, serviceId }) => ({
        url: `/business/${id}/services/${serviceId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Business', id },
        'Business',
      ],
    }),

    // Team management
    addTeamMember: builder.mutation({
      query: ({ id, memberData }) => ({
        url: `/business/${id}/team`,
        method: 'POST',
        body: memberData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Business', id },
        'Business',
      ],
    }),

    updateTeamMember: builder.mutation({
      query: ({ id, memberId, memberData }) => ({
        url: `/business/${id}/team/${memberId}`,
        method: 'PUT',
        body: memberData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Business', id },
        'Business',
      ],
    }),

    deleteTeamMember: builder.mutation({
      query: ({ id, memberId }) => ({
        url: `/business/${id}/team/${memberId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Business', id },
        'Business',
      ],
    }),

    // Gallery management
    addGalleryItem: builder.mutation({
      query: ({ id, itemData }) => ({
        url: `/business/${id}/gallery`,
        method: 'POST',
        body: itemData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Business', id },
        'Business',
      ],
    }),

    deleteGalleryItem: builder.mutation({
      query: ({ id, type, itemId }) => ({
        url: `/business/${id}/gallery/${type}/${itemId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Business', id },
        'Business',
      ],
    }),

    // Publish/Unpublish business website
    togglePublishBusiness: builder.mutation({
      query: (id) => ({
        url: `/business/${id}/publish`,
        method: 'PUT',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Business', id },
        'Business',
      ],
    }),

    // Delete business website
    deleteBusiness: builder.mutation({
      query: (id) => ({
        url: `/business/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Business'],
    }),
  }),
});

export const {
  useGetAllBusinessesQuery,
  useGetBusinessByVendorQuery,
  useGetMyBusinessQuery,
  useCreateBusinessMutation,
  useUpdateBusinessMutation,
  useUpdateBusinessSectionMutation,
  useAddServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
  useAddTeamMemberMutation,
  useUpdateTeamMemberMutation,
  useDeleteTeamMemberMutation,
  useAddGalleryItemMutation,
  useDeleteGalleryItemMutation,
  useTogglePublishBusinessMutation,
  useDeleteBusinessMutation,
} = businessApi;
