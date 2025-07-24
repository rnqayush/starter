import { apiSlice } from './apiSlice';

export const freelanceApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all published freelance portfolios
    getAllFreelancers: builder.query({
      query: (params = {}) => ({
        url: '/freelance',
        params,
      }),
      providesTags: ['Freelance'],
    }),

    // Get freelance portfolio by vendor ID
    getFreelanceByVendor: builder.query({
      query: (vendorId) => `/freelance/vendor/${vendorId}`,
      providesTags: (result, error, vendorId) => [
        { type: 'Freelance', id: vendorId },
      ],
    }),

    // Get my freelance portfolio
    getMyFreelance: builder.query({
      query: () => '/freelance/my-portfolio',
      providesTags: ['Freelance'],
    }),

    // Create new freelance portfolio
    createFreelance: builder.mutation({
      query: (freelanceData) => ({
        url: '/freelance',
        method: 'POST',
        body: freelanceData,
      }),
      invalidatesTags: ['Freelance'],
    }),

    // Update freelance portfolio
    updateFreelance: builder.mutation({
      query: ({ id, ...freelanceData }) => ({
        url: `/freelance/${id}`,
        method: 'PUT',
        body: freelanceData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Freelance', id },
        'Freelance',
      ],
    }),

    // Update specific section of freelance portfolio
    updateFreelanceSection: builder.mutation({
      query: ({ id, sectionName, sectionData }) => ({
        url: `/freelance/${id}/section/${sectionName}`,
        method: 'PUT',
        body: sectionData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Freelance', id },
        'Freelance',
      ],
    }),

    // Skills management
    addSkillCategory: builder.mutation({
      query: ({ id, categoryData }) => ({
        url: `/freelance/${id}/skills/categories`,
        method: 'POST',
        body: categoryData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Freelance', id },
        'Freelance',
      ],
    }),

    updateSkillCategory: builder.mutation({
      query: ({ id, categoryId, categoryData }) => ({
        url: `/freelance/${id}/skills/categories/${categoryId}`,
        method: 'PUT',
        body: categoryData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Freelance', id },
        'Freelance',
      ],
    }),

    // Experience management
    addWorkExperience: builder.mutation({
      query: ({ id, experienceData }) => ({
        url: `/freelance/${id}/experience/work`,
        method: 'POST',
        body: experienceData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Freelance', id },
        'Freelance',
      ],
    }),

    updateWorkExperience: builder.mutation({
      query: ({ id, experienceId, experienceData }) => ({
        url: `/freelance/${id}/experience/work/${experienceId}`,
        method: 'PUT',
        body: experienceData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Freelance', id },
        'Freelance',
      ],
    }),

    // Portfolio management
    addPortfolioProject: builder.mutation({
      query: ({ id, projectData }) => ({
        url: `/freelance/${id}/portfolio/projects`,
        method: 'POST',
        body: projectData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Freelance', id },
        'Freelance',
      ],
    }),

    updatePortfolioProject: builder.mutation({
      query: ({ id, projectId, projectData }) => ({
        url: `/freelance/${id}/portfolio/projects/${projectId}`,
        method: 'PUT',
        body: projectData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Freelance', id },
        'Freelance',
      ],
    }),

    deletePortfolioProject: builder.mutation({
      query: ({ id, projectId }) => ({
        url: `/freelance/${id}/portfolio/projects/${projectId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Freelance', id },
        'Freelance',
      ],
    }),

    // Testimonials management
    addTestimonial: builder.mutation({
      query: ({ id, testimonialData }) => ({
        url: `/freelance/${id}/portfolio/testimonials`,
        method: 'POST',
        body: testimonialData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Freelance', id },
        'Freelance',
      ],
    }),

    updateTestimonial: builder.mutation({
      query: ({ id, testimonialId, testimonialData }) => ({
        url: `/freelance/${id}/portfolio/testimonials/${testimonialId}`,
        method: 'PUT',
        body: testimonialData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Freelance', id },
        'Freelance',
      ],
    }),

    // Availability management
    updateAvailability: builder.mutation({
      query: ({ id, availabilityData }) => ({
        url: `/freelance/${id}/availability`,
        method: 'PUT',
        body: availabilityData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Freelance', id },
        'Freelance',
      ],
    }),

    // Publish/Unpublish freelance portfolio
    togglePublishFreelance: builder.mutation({
      query: (id) => ({
        url: `/freelance/${id}/publish`,
        method: 'PUT',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Freelance', id },
        'Freelance',
      ],
    }),

    // Delete freelance portfolio
    deleteFreelance: builder.mutation({
      query: (id) => ({
        url: `/freelance/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Freelance'],
    }),
  }),
});

export const {
  useGetAllFreelancersQuery,
  useGetFreelanceByVendorQuery,
  useGetMyFreelanceQuery,
  useCreateFreelanceMutation,
  useUpdateFreelanceMutation,
  useUpdateFreelanceSectionMutation,
  useAddSkillCategoryMutation,
  useUpdateSkillCategoryMutation,
  useAddWorkExperienceMutation,
  useUpdateWorkExperienceMutation,
  useAddPortfolioProjectMutation,
  useUpdatePortfolioProjectMutation,
  useDeletePortfolioProjectMutation,
  useAddTestimonialMutation,
  useUpdateTestimonialMutation,
  useUpdateAvailabilityMutation,
  useTogglePublishFreelanceMutation,
  useDeleteFreelanceMutation,
} = freelanceApi;
