import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import blogsData from '../../DummyData/blogs.json';
import {
  createEntityState,
  createFilterState,
  createEntityReducers,
  createFilterReducers,
} from '../utils/sliceUtils';

// Async thunks
export const loadBlogs = createAsyncThunk(
  'blogs/loadBlogs',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (blogsData.status === 'success' && blogsData.data) {
        return {
          blogs: blogsData.data.blogs,
          categories: blogsData.data.categories,
          meta: {
            status: blogsData.status,
            statusCode: blogsData.statusCode,
            message: blogsData.message,
            timestamp: blogsData.timestamp
          }
        };
      } else {
        throw new Error('Failed to load blogs');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createBlog = createAsyncThunk(
  'blogs/createBlog',
  async (blogData, { getState, rejectWithValue }) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const { blogs } = getState().blogs;
      const newId = Math.max(...blogs.map(b => b.id), 0) + 1;
      
      // Convert content sections to a single content string
      const content = blogData.contentSections
        .filter(section => section.heading.trim() || section.description.trim())
        .map(section => {
          let sectionContent = '';
          if (section.heading.trim()) {
            sectionContent += `## ${section.heading.trim()}\n\n`;
          }
          if (section.description.trim()) {
            sectionContent += `${section.description.trim()}\n\n`;
          }
          return sectionContent;
        })
        .join('');

      const wordCount = content.split(' ').filter(word => word.length > 0).length;

      const newBlog = {
        id: newId,
        title: blogData.title,
        excerpt: blogData.excerpt,
        content: content,
        contentSections: blogData.contentSections,
        author: {
          name: blogData.authorName,
          avatar: blogData.authorAvatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
          bio: blogData.authorBio || "Content Creator"
        },
        category: blogData.category,
        tags: blogData.tags,
        image: blogData.image,
        publishedAt: new Date().toISOString(),
        readTime: `${Math.ceil(wordCount / 200)} min read`,
        views: Math.floor(Math.random() * 1000) + 100,
        likes: Math.floor(Math.random() * 50) + 10,
        featured: false
      };
      
      return newBlog;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Initial state
const initialState = {
  // Core data
  blogs: [],
  categories: [],
  filteredBlogs: [],
  selectedBlog: null,
  meta: null,

  // Filters
  filters: createFilterState({
    category: '',
    sortBy: 'newest',
  }),

  // Create blog state
  createLoading: false,
  createError: null,
  showCreateModal: false,

  // Loading and error states
  loading: false,
  error: null,
  success: false,
};

const blogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    // Standard reducers
    ...createEntityReducers(),
    ...createFilterReducers(),

    // Blog-specific reducers
    setBlogs: (state, action) => {
      state.blogs = action.payload;
      state.filteredBlogs = action.payload;
    },

    setCategories: (state, action) => {
      state.categories = action.payload;
    },

    selectBlog: (state, action) => {
      const id = action.payload;
      state.selectedBlog = state.blogs.find(blog => blog.id === id) || null;
    },

    // Filter management
    setCategory: (state, action) => {
      state.filters.category = action.payload;
      blogsSlice.caseReducers.applyFilters(state);
    },

    setSortBy: (state, action) => {
      state.filters.sortBy = action.payload;
      blogsSlice.caseReducers.applyFilters(state);
    },

    setSearchQuery: (state, action) => {
      state.filters.searchQuery = action.payload;
      blogsSlice.caseReducers.applyFilters(state);
    },

    clearFilters: (state) => {
      state.filters = {
        searchQuery: '',
        category: '',
        sortBy: 'newest',
      };
      state.filteredBlogs = [...state.blogs];
    },

    applyFilters: (state) => {
      let filtered = [...state.blogs];
      
      // Apply search filter
      if (state.filters.searchQuery) {
        const searchLower = state.filters.searchQuery.toLowerCase();
        filtered = filtered.filter(blog =>
          blog.title.toLowerCase().includes(searchLower) ||
          blog.excerpt.toLowerCase().includes(searchLower) ||
          blog.content.toLowerCase().includes(searchLower) ||
          blog.author.name.toLowerCase().includes(searchLower) ||
          blog.tags.some(tag => tag.toLowerCase().includes(searchLower))
        );
      }
      
      // Apply category filter
      if (state.filters.category) {
        filtered = filtered.filter(blog => blog.category === state.filters.category);
      }
      
      // Apply sorting
      switch (state.filters.sortBy) {
        case 'newest':
          filtered.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
          break;
        case 'oldest':
          filtered.sort((a, b) => new Date(a.publishedAt) - new Date(b.publishedAt));
          break;
        case 'popular':
          filtered.sort((a, b) => b.views - a.views);
          break;
        case 'liked':
          filtered.sort((a, b) => b.likes - a.likes);
          break;
        default:
          break;
      }
      
      state.filteredBlogs = filtered;
    },

    // Create blog modal management
    showCreateModal: (state) => {
      state.showCreateModal = true;
    },

    hideCreateModal: (state) => {
      state.showCreateModal = false;
      state.createError = null;
    },

    clearCreateError: (state) => {
      state.createError = null;
    },

    // Blog interactions
    likeBlog: (state, action) => {
      const blogId = action.payload;
      const blog = state.blogs.find(b => b.id === blogId);
      if (blog) {
        blog.likes += 1;
        // Update filtered blogs as well
        const filteredBlog = state.filteredBlogs.find(b => b.id === blogId);
        if (filteredBlog) {
          filteredBlog.likes += 1;
        }
      }
    },

    incrementViews: (state, action) => {
      const blogId = action.payload;
      const blog = state.blogs.find(b => b.id === blogId);
      if (blog) {
        blog.views += 1;
        // Update filtered blogs as well
        const filteredBlog = state.filteredBlogs.find(b => b.id === blogId);
        if (filteredBlog) {
          filteredBlog.views += 1;
        }
      }
    },

    // Reset state
    resetState: () => initialState,
  },

  extraReducers: (builder) => {
    builder
      // Load blogs
      .addCase(loadBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload.blogs;
        state.categories = action.payload.categories;
        state.filteredBlogs = action.payload.blogs;
        state.meta = action.payload.meta;
        state.error = null;
        state.success = true;
      })
      .addCase(loadBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      // Create blog
      .addCase(createBlog.pending, (state) => {
        state.createLoading = true;
        state.createError = null;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.createLoading = false;
        state.blogs.unshift(action.payload); // Add to beginning
        state.createError = null;
        state.showCreateModal = false;
        state.success = true;
        // Reapply filters to include new blog
        blogsSlice.caseReducers.applyFilters(state);
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.createLoading = false;
        state.createError = action.payload;
      });
  },
});

// Export actions
export const {
  // Standard actions
  setLoading,
  setError,
  clearError,
  setSuccess,
  
  // Blog actions
  setBlogs,
  setCategories,
  selectBlog,
  
  // Filter actions
  setCategory,
  setSortBy,
  setSearchQuery,
  clearFilters,
  
  // Modal actions
  showCreateModal,
  hideCreateModal,
  clearCreateError,
  
  // Interaction actions
  likeBlog,
  incrementViews,
  
  // Utility actions
  resetState,
} = blogsSlice.actions;

// Selectors
export const selectBlogs = (state) => state.blogs.blogs;
export const selectFilteredBlogs = (state) => state.blogs.filteredBlogs;
export const selectCategories = (state) => state.blogs.categories;
export const selectSelectedBlog = (state) => state.blogs.selectedBlog;
export const selectLoading = (state) => state.blogs.loading;
export const selectError = (state) => state.blogs.error;
export const selectFilters = (state) => state.blogs.filters;
export const selectCreateLoading = (state) => state.blogs.createLoading;
export const selectCreateError = (state) => state.blogs.createError;
export const selectShowCreateModal = (state) => state.blogs.showCreateModal;
export const selectMeta = (state) => state.blogs.meta;

// Complex selectors
export const selectFeaturedBlogs = (state) =>
  state.blogs.blogs.filter(blog => blog.featured);

export const selectRecentBlogs = (state) =>
  state.blogs.blogs
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    .slice(0, 5);

export const selectPopularBlogs = (state) =>
  state.blogs.blogs
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);

export const selectBlogById = (blogId) => (state) =>
  state.blogs.blogs.find(blog => blog.id === parseInt(blogId));

export const selectBlogsByCategory = (category) => (state) =>
  state.blogs.blogs.filter(blog => blog.category === category);

export const selectBlogsByAuthor = (authorName) => (state) =>
  state.blogs.blogs.filter(blog => blog.author.name === authorName);

export default blogsSlice.reducer;
