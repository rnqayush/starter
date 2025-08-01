import { createSlice } from '@reduxjs/toolkit';
import authAPI from '../../services/authAPI';

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  loading: false,
  error: null,
  loginAttempts: 0,
  lastLoginTime: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: state => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
      state.loginAttempts = 0;
      state.lastLoginTime = new Date().toISOString();

      // Store in localStorage for persistence
      localStorage.setItem('auth_user', JSON.stringify(action.payload.user));
      localStorage.setItem('auth_timestamp', state.lastLoginTime);
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.error = action.payload;
      state.loginAttempts += 1;
    },
    logout: state => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.error = null;
      state.loginAttempts = 0;
      state.lastLoginTime = null;

      // Clear localStorage
      authAPI.clearAuthData();
    },
    clearError: state => {
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
      state.token = action.payload.token;
      state.lastLoginTime = action.payload.timestamp;
    },
    registerStart: state => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
      state.lastLoginTime = new Date().toISOString();

      // Store in localStorage for persistence
      localStorage.setItem('auth_user', JSON.stringify(action.payload.user));
      localStorage.setItem('auth_timestamp', state.lastLoginTime);
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
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
export const loginUser = (email, password) => async dispatch => {
  dispatch(loginStart());

  try {
    const response = await authAPI.login({ email, password });

    if (response.success) {
      dispatch(
        loginSuccess({
          user: response.data.user,
          token: response.data.token,
        })
      );
      return { success: true, user: response.data.user };
    } else {
      dispatch(loginFailure(response.message || 'Login failed'));
      return { success: false, error: response.message || 'Login failed' };
    }
  } catch (error) {
    const errorMessage = error.message || 'Network error. Please try again.';
    dispatch(loginFailure(errorMessage));
    return { success: false, error: errorMessage };
  }
};

// Thunk for handling registration
export const registerUser = userData => async dispatch => {
  dispatch(registerStart());

  try {
    const response = await authAPI.register(userData);

    if (response.success) {
      dispatch(
        registerSuccess({
          user: response.data.user,
          token: response.data.token,
        })
      );
      return { success: true, user: response.data.user };
    } else {
      dispatch(registerFailure(response.message || 'Registration failed'));
      return {
        success: false,
        error: response.message || 'Registration failed',
      };
    }
  } catch (error) {
    const errorMessage = error.message || 'Network error. Please try again.';
    dispatch(registerFailure(errorMessage));
    return { success: false, error: errorMessage };
  }
};

// Thunk for handling logout
export const logoutUser = () => async dispatch => {
  try {
    await authAPI.logout();
  } catch (error) {
    console.warn('Logout API call failed:', error);
  } finally {
    dispatch(logout());
  }
};

// Thunk for updating user profile
export const updateUserProfileAPI = (userId, updates) => async dispatch => {
  try {
    const response = await authAPI.updateProfile(userId, updates);

    if (response.success) {
      dispatch(updateUserProfile(response.data.user));
      return { success: true, user: response.data.user };
    } else {
      return { success: false, error: response.message || 'Update failed' };
    }
  } catch (error) {
    const errorMessage = error.message || 'Network error. Please try again.';
    return { success: false, error: errorMessage };
  }
};

// Thunk for restoring session from localStorage or token
export const restoreUserSession = () => async dispatch => {
  try {
    const token = authAPI.getToken();
    const storedUser = localStorage.getItem('auth_user');
    const storedTimestamp = localStorage.getItem('auth_timestamp');

    if (token && storedUser && storedTimestamp) {
      // Check if session is still valid (24 hours)
      const sessionAge = Date.now() - new Date(storedTimestamp).getTime();
      const maxAge = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

      if (sessionAge < maxAge) {
        try {
          // Verify token with backend
          const response = await authAPI.verifyToken();

          if (response.success) {
            const user = JSON.parse(storedUser);
            dispatch(
              restoreSession({
                user: response.data.user || user, // Use fresh data from API if available
                token,
                timestamp: storedTimestamp,
              })
            );
            return true;
          }
        } catch (error) {
          console.warn('Token verification failed:', error);
          // Token is invalid, clear storage
          authAPI.clearAuthData();
          return false;
        }
      } else {
        // Session expired, clear storage
        authAPI.clearAuthData();
        return false;
      }
    }

    return false;
  } catch (error) {
    console.error('Failed to restore session:', error);
    authAPI.clearAuthData();
    return false;
  }
};

// Selectors
export const selectAuth = state => state.auth;
export const selectUser = state => state.auth.user;
export const selectIsAuthenticated = state => state.auth.isAuthenticated;
export const selectAuthLoading = state => state.auth.loading;
export const selectAuthError = state => state.auth.error;
export const selectAuthToken = state => state.auth.token;
export const selectUserRole = state => state.auth.user?.role;
export const selectUserPermissions = state =>
  state.auth.user?.permissions || [];
export const selectIsAdmin = state => state.auth.user?.role === 'admin';
export const selectIsBusinessOwner = state =>
  state.auth.user?.role === 'business_owner';
export const selectIsCustomer = state => state.auth.user?.role === 'customer';

export default authSlice.reducer;
