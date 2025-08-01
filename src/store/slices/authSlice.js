import { createSlice } from '@reduxjs/toolkit';
import { validateUserCredentials, getUserByEmail } from '../../DummyData';

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
  loginAttempts: 0,
  lastLoginTime: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
      state.loginAttempts = 0;
      state.lastLoginTime = new Date().toISOString();
      
      // Store in localStorage for persistence
      localStorage.setItem('auth_user', JSON.stringify(action.payload));
      localStorage.setItem('auth_timestamp', state.lastLoginTime);
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
      state.loginAttempts += 1;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      state.loginAttempts = 0;
      state.lastLoginTime = null;
      
      // Clear localStorage
      localStorage.removeItem('auth_user');
      localStorage.removeItem('auth_timestamp');
    },
    clearError: (state) => {
      state.error = null;
    },
    updateUserProfile: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        // Update localStorage
        localStorage.setItem('auth_user', JSON.stringify(state.user));
      }
    },
    restoreSession: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.lastLoginTime = action.payload.timestamp;
    },
    registerStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
      state.lastLoginTime = new Date().toISOString();
      
      // Store in localStorage for persistence
      localStorage.setItem('auth_user', JSON.stringify(action.payload));
      localStorage.setItem('auth_timestamp', state.lastLoginTime);
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  clearError,
  updateUserProfile,
  restoreSession,
  registerStart,
  registerSuccess,
  registerFailure,
} = authSlice.actions;

// Thunk for handling login
export const loginUser = (email, password) => async (dispatch) => {
  dispatch(loginStart());
  
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = validateUserCredentials(email, password);
    
    if (user) {
      // Create safe user object (without password)
      const safeUser = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        businessName: user.businessName,
        businessCategory: user.businessCategory,
        phone: user.phone,
        address: user.address,
        website: user.website,
        avatar: user.avatar,
        isActive: user.isActive,
        permissions: user.permissions,
        createdAt: user.createdAt,
      };
      
      dispatch(loginSuccess(safeUser));
      return { success: true, user: safeUser };
    } else {
      dispatch(loginFailure('Invalid email or password'));
      return { success: false, error: 'Invalid email or password' };
    }
  } catch (error) {
    dispatch(loginFailure('Login failed. Please try again.'));
    return { success: false, error: 'Login failed. Please try again.' };
  }
};

// Thunk for handling registration
export const registerUser = (userData) => async (dispatch) => {
  dispatch(registerStart());
  
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Check if user already exists
    const existingUser = getUserByEmail(userData.email);
    if (existingUser) {
      dispatch(registerFailure('An account with this email already exists'));
      return { success: false, error: 'An account with this email already exists' };
    }
    
    // Create new user object
    const newUser = {
      id: `user_${Date.now()}`,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      role: 'business_owner',
      businessName: userData.businessName,
      businessCategory: userData.businessCategory,
      phone: userData.phone,
      address: userData.address,
      website: userData.website || '',
      avatar: `https://via.placeholder.com/100x100/4F46E5/ffffff?text=${userData.firstName.charAt(0)}${userData.lastName.charAt(0)}`,
      isActive: true,
      permissions: ['manage_business'],
      createdAt: new Date().toISOString(),
    };
    
    dispatch(registerSuccess(newUser));
    return { success: true, user: newUser };
  } catch (error) {
    dispatch(registerFailure('Registration failed. Please try again.'));
    return { success: false, error: 'Registration failed. Please try again.' };
  }
};

// Thunk for restoring session from localStorage
export const restoreUserSession = () => (dispatch) => {
  try {
    const storedUser = localStorage.getItem('auth_user');
    const storedTimestamp = localStorage.getItem('auth_timestamp');
    
    if (storedUser && storedTimestamp) {
      const user = JSON.parse(storedUser);
      const timestamp = storedTimestamp;
      
      // Check if session is still valid (24 hours)
      const sessionAge = Date.now() - new Date(timestamp).getTime();
      const maxAge = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
      
      if (sessionAge < maxAge) {
        dispatch(restoreSession({ user, timestamp }));
        return true;
      } else {
        // Session expired, clear storage
        localStorage.removeItem('auth_user');
        localStorage.removeItem('auth_timestamp');
      }
    }
  } catch (error) {
    console.error('Failed to restore session:', error);
    localStorage.removeItem('auth_user');
    localStorage.removeItem('auth_timestamp');
  }
  return false;
};

// Selectors
export const selectAuth = (state) => state.auth;
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;
export const selectUserRole = (state) => state.auth.user?.role;
export const selectUserPermissions = (state) => state.auth.user?.permissions || [];
export const selectIsAdmin = (state) => state.auth.user?.role === 'admin';
export const selectIsBusinessOwner = (state) => state.auth.user?.role === 'business_owner';
export const selectIsCustomer = (state) => state.auth.user?.role === 'customer';

export default authSlice.reducer;
