import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import blogsData from '../data/blogs.json';

// Async thunk for loading blogs (simulating API call)
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

// Async thunk for creating a new blog
export const createBlog = createAsyncThunk(
  'blogs/createBlog',
  async (blogData, { getState, rejectWithValue }) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const { blogs } = getState().blogs;
      const newId = Math.max(...blogs.map(b => b.id), 0) + 1;
      
      // Convert content sections to a single content string for compatibility
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

const initialState = {
  blogs: [],
  categories: [],
  filteredBlogs: [],
  loading: false,
  error: null,
  meta: null,
  // UI state
  searchTerm: '',
  selectedCategory: '',
  sortBy: 'newest',
  // Create blog state
  createBlogLoading: false,
  createBlogError: null,
  showCreateBlogModal: false,
};

const blogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    // Filter and search actions
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      blogsSlice.caseReducers.applyFilters(state);
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
      blogsSlice.caseReducers.applyFilters(state);
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
      blogsSlice.caseReducers.applyFilters(state);
    },
    clearFilters: (state) => {
      state.searchTerm = '';
      state.selectedCategory = '';
      state.sortBy = 'newest';
      state.filteredBlogs = [...state.blogs];
    },
    applyFilters: (state) => {
      let filtered = [...state.blogs];
      
      // Apply search filter
      if (state.searchTerm) {
        const searchLower = state.searchTerm.toLowerCase();
        filtered = filtered.filter(blog =>
          blog.title.toLowerCase().includes(searchLower) ||
          blog.excerpt.toLowerCase().includes(searchLower) ||
          blog.content.toLowerCase().includes(searchLower) ||
          blog.author.name.toLowerCase().includes(searchLower) ||
          blog.tags.some(tag => tag.toLowerCase().includes(searchLower))
        );
      }
      
      // Apply category filter
      if (state.selectedCategory) {
        filtered = filtered.filter(blog => blog.category === state.selectedCategory);
      }
      
      // Apply sorting
      switch (state.sortBy) {
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
    // Create blog modal actions
    showCreateBlogModal: (state) => {
      state.showCreateBlogModal = true;
    },
    hideCreateBlogModal: (state) => {
      state.showCreateBlogModal = false;
      state.createBlogError = null;
    },
    clearCreateBlogError: (state) => {
      state.createBlogError = null;
    },
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
      })
      .addCase(loadBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create blog
      .addCase(createBlog.pending, (state) => {
        state.createBlogLoading = true;
        state.createBlogError = null;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.createBlogLoading = false;
        state.blogs.unshift(action.payload); // Add to beginning of array
        state.createBlogError = null;
        state.showCreateBlogModal = false;
        // Reapply filters to include new blog
        blogsSlice.caseReducers.applyFilters(state);
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.createBlogLoading = false;
        state.createBlogError = action.payload;
      });
  },
});

export const {
  setSearchTerm,
  setSelectedCategory,
  setSortBy,
  clearFilters,
  showCreateBlogModal,
  hideCreateBlogModal,
  clearCreateBlogError,
} = blogsSlice.actions;

export default blogsSlice.reducer;
