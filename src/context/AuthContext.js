import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { 
  selectAuth, 
  selectIsAuthenticated, 
  selectUser, 
  selectAuthLoading, 
  selectAuthError,
  loginStart,
  loginSuccess,
  loginFailure,
  logout as logoutAction,
  updateUser,
  clearError
} from '../store/slices/authSlice';
import { 
  useLoginMutation, 
  useRegisterMutation, 
  useVendorLoginMutation,
  useVendorRegisterMutation,
  useAdminLoginMutation,
  useLogoutMutation,
  useGetCurrentUserQuery,
  useUpdateProfileMutation,
  useRefreshTokenMutation
} from '../store/api/authApi';
import { USER_ROLES, STORAGE_KEYS } from '../constants/api';

// Create Auth Context
const AuthContext = createContext();

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  // RTK Query mutations
  const [loginMutation] = useLoginMutation();
  const [registerMutation] = useRegisterMutation();
  const [vendorLoginMutation] = useVendorLoginMutation();
  const [vendorRegisterMutation] = useVendorRegisterMutation();
  const [adminLoginMutation] = useAdminLoginMutation();
  const [logoutMutation] = useLogoutMutation();
  const [updateProfileMutation] = useUpdateProfileMutation();
  const [refreshTokenMutation] = useRefreshTokenMutation();

  // Get current user query (only if authenticated)
  const { refetch: refetchUser } = useGetCurrentUserQuery(undefined, {
    skip: !isAuthenticated,
  });

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
        const userData = localStorage.getItem(STORAGE_KEYS.USER);
        
        if (token && userData) {
          const parsedUser = JSON.parse(userData);
          dispatch(loginSuccess({ token, user: parsedUser }));
          
          // Verify token is still valid
          try {
            await refetchUser();
          } catch (error) {
            console.warn('Token verification failed:', error);
            dispatch(logoutAction());
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        dispatch(logoutAction());
      }
    };

    initializeAuth();
  }, [dispatch, refetchUser]);

  // Login function
  const login = async (credentials, userType = 'customer') => {
    try {
      dispatch(loginStart());
      
      let result;
      switch (userType) {
        case 'vendor':
          result = await vendorLoginMutation(credentials).unwrap();
          break;
        case 'admin':
          result = await adminLoginMutation(credentials).unwrap();
          break;
        default:
          result = await loginMutation(credentials).unwrap();
      }

      if (result.success) {
        dispatch(loginSuccess({
          token: result.data.token,
          user: result.data.user
        }));
        toast.success(result.message || 'Login successful!');
        return { success: true, data: result.data };
      } else {
        throw new Error(result.message || 'Login failed');
      }
    } catch (error) {
      const errorMessage = error.message || 'Login failed';
      dispatch(loginFailure(errorMessage));
      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  // Register function
  const register = async (userData, userType = 'customer') => {
    try {
      dispatch(loginStart());
      
      let result;
      if (userType === 'vendor') {
        result = await vendorRegisterMutation(userData).unwrap();
      } else {
        result = await registerMutation(userData).unwrap();
      }

      if (result.success) {
        dispatch(loginSuccess({
          token: result.data.token,
          user: result.data.user
        }));
        toast.success(result.message || 'Registration successful!');
        return { success: true, data: result.data };
      } else {
        throw new Error(result.message || 'Registration failed');
      }
    } catch (error) {
      const errorMessage = error.message || 'Registration failed';
      dispatch(loginFailure(errorMessage));
      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  // Vendor registration function (alias for register with vendor type)
  const registerVendor = async (vendorData) => {
    return await register(vendorData, 'vendor');
  };

  // Vendor login function (alias for login with vendor type)
  const loginVendor = async (credentials) => {
    return await login(credentials, 'vendor');
  };

  // Admin login function (alias for login with admin type)
  const loginAdmin = async (credentials) => {
    return await login(credentials, 'admin');
  };

  // Logout function
  const logout = async () => {
    try {
      await logoutMutation().unwrap();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      dispatch(logoutAction());
      toast.success('Logged out successfully');
    }
  };

  // Update user profile
  const updateProfile = async (updates) => {
    if (!user) return { success: false, message: 'No user logged in' };

    try {
      const result = await updateProfileMutation(updates).unwrap();
      
      if (result.success) {
        dispatch(updateUser(result.data));
        toast.success('Profile updated successfully!');
        return { success: true, data: result.data };
      } else {
        throw new Error(result.message || 'Profile update failed');
      }
    } catch (error) {
      const errorMessage = error.message || 'Profile update failed';
      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  // Check if user has specific role
  const hasRole = (role) => {
    return user?.role === role;
  };

  // Check if user is customer
  const isCustomer = () => {
    return hasRole(USER_ROLES.CUSTOMER);
  };

  // Check if user is vendor
  const isVendor = () => {
    return hasRole(USER_ROLES.VENDOR);
  };

  // Check if user is admin
  const isAdmin = () => {
    return hasRole(USER_ROLES.ADMIN);
  };

  // Check if user can access vendor features
  const canAccessVendor = () => {
    return isVendor() || isAdmin();
  };

  // Check if user can access admin features
  const canAccessAdmin = () => {
    return isAdmin();
  };

  // Get user display name
  const getDisplayName = () => {
    if (!user) return 'Guest';
    
    return user.name || user.businessName || getNameFromEmail(user.email);
  };

  // Helper to extract name from email
  const getNameFromEmail = (email) => {
    if (!email) return 'User';
    const name = email.split('@')[0];
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  // Refresh authentication state
  const refreshAuth = async () => {
    try {
      const result = await refetchUser();
      
      if (result.data?.success) {
        dispatch(updateUser(result.data.data));
        return { success: true, data: result.data.data };
      } else {
        dispatch(logoutAction());
        return { success: false, message: 'Session expired' };
      }
    } catch (error) {
      dispatch(logoutAction());
      return { success: false, message: error.message };
    }
  };

  // Clear error
  const clearAuthError = () => {
    dispatch(clearError());
  };

  const contextValue = {
    // State
    user,
    loading,
    isAuthenticated,
    error,

    // Actions
    login,
    register,
    registerVendor,
    loginVendor,
    loginAdmin,
    logout,
    updateProfile,
    refreshAuth,
    clearAuthError,

    // Utilities
    hasRole,
    isCustomer,
    isVendor,
    isAdmin,
    canAccessVendor,
    canAccessAdmin,
    getDisplayName,
  };

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          fontSize: '18px',
          color: '#6b7280',
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
