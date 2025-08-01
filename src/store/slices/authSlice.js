import { createSlice } from '@reduxjs/toolkit';
import usersData from '../../DummyData/users.json';

// Helper function to extract name from email
const getNameFromEmail = email => {
  if (!email) return 'User';
  const name = email.split('@')[0];
  return name.charAt(0).toUpperCase() + name.slice(1);
};

// Helper function to generate avatar URL
const generateAvatar = name => {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=1e40af&color=fff`;
};

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Initialize state from localStorage if available
const initializeFromStorage = () => {
  try {
    const savedUser = localStorage.getItem('user');
    const savedAuth = localStorage.getItem('isAuthenticated');

    if (savedUser && savedAuth === 'true') {
      const parsedUser = JSON.parse(savedUser);
      return {
        user: parsedUser,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    }
  } catch (error) {
    // Clear corrupted data
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
  }
  return initialState;
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initializeFromStorage(),
  reducers: {
    loginStart: state => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
      
      // Persist to localStorage
      localStorage.setItem('user', JSON.stringify(action.payload));
      localStorage.setItem('isAuthenticated', 'true');
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.user = null;
      state.isAuthenticated = false;
    },
    registerStart: state => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
      
      // Persist to localStorage
      localStorage.setItem('user', JSON.stringify(action.payload));
      localStorage.setItem('isAuthenticated', 'true');
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.user = null;
      state.isAuthenticated = false;
    },
    logout: state => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      
      // Clear localStorage
      localStorage.removeItem('user');
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('userEnquiries');
      localStorage.removeItem('shopSettings');
      localStorage.removeItem('recentlyViewed');
      localStorage.removeItem('pageViews');
    },
    updateProfile: (state, action) => {
      if (state.user) {
        state.user = {
          ...state.user,
          ...action.payload,
          lastModified: new Date().toISOString(),
        };
        
        // Update localStorage
        localStorage.setItem('user', JSON.stringify(state.user));
      }
    },
    switchRole: (state, action) => {
      if (state.user) {
        const newRole = action.payload;
        state.user.role = newRole;
        
        // Add seller data if switching to seller
        if (newRole === 'seller' && !state.user.seller) {
          state.user.seller = {
            businessName: `${state.user.name}'s Store`,
            businessType: 'General',
            verified: false,
            rating: 0,
            totalSales: 0,
            totalProducts: 0,
            joinedDate: new Date().toISOString(),
            settings: {
              autoRespond: true,
              showLocation: true,
              allowReviews: true,
            },
          };
        }
        
        // Update localStorage
        localStorage.setItem('user', JSON.stringify(state.user));
      }
    },
    clearError: state => {
      state.error = null;
    },
  },
});

// Async thunk actions
export const loginUser = credentials => async dispatch => {
  dispatch(loginStart());
  
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find user in dummy data
    const user = usersData.users.find(
      u => u.email === credentials.email && u.password === credentials.password
    );
    
    if (!user) {
      throw new Error('Invalid email or password');
    }
    
    // Create user session data
    const userData = {
      ...user,
      lastLogin: new Date().toISOString(),
    };
    
    dispatch(loginSuccess(userData));
    return { success: true, user: userData };
  } catch (error) {
    dispatch(loginFailure(error.message));
    return { success: false, error: error.message };
  }
};

export const registerUser = userData => async dispatch => {
  dispatch(registerStart());
  
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Check if email already exists
    const existingUser = usersData.users.find(u => u.email === userData.email);
    if (existingUser) {
      throw new Error('Email already exists');
    }
    
    const newUser = {
      id: Date.now(),
      ...userData,
      avatar: generateAvatar(userData.name),
      preferences: {
        notifications: {
          email: true,
          sms: false,
          push: true,
        },
        language: 'en',
        currency: 'USD',
      },
      profile: {
        bio: '',
        location: '',
        website: '',
        socialLinks: {},
      },
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    };
    
    // Add seller data if registering as seller
    if (userData.role === 'seller') {
      newUser.seller = {
        businessName: userData.businessName || `${userData.name}'s Store`,
        businessType: userData.businessType || 'General',
        verified: false,
        rating: 0,
        totalSales: 0,
        totalProducts: 0,
        joinedDate: new Date().toISOString(),
        settings: {
          autoRespond: true,
          showLocation: true,
          allowReviews: true,
        },
      };
    }
    
    dispatch(registerSuccess(newUser));
    return { success: true, user: newUser };
  } catch (error) {
    dispatch(registerFailure(error.message));
    return { success: false, error: error.message };
  }
};

// Selectors
export const selectAuth = state => state.auth;
export const selectUser = state => state.auth.user;
export const selectIsAuthenticated = state => state.auth.isAuthenticated;
export const selectAuthLoading = state => state.auth.loading;
export const selectAuthError = state => state.auth.error;

// Utility selectors
export const selectUserRole = state => state.auth.user?.role;
export const selectCanAccessSeller = state => {
  const role = state.auth.user?.role;
  return role === 'seller' || role === 'admin';
};
export const selectDisplayName = state => {
  const user = state.auth.user;
  if (!user) return 'Guest';
  return user.name || getNameFromEmail(user.email);
};

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  logout,
  updateProfile,
  switchRole,
  clearError,
} = authSlice.actions;

export default authSlice.reducer;
