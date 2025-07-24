import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import authService from '../services/authService';
import { USER_ROLES } from '../constants/api';

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
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Check if user is authenticated
        if (authService.isAuthenticated()) {
          // Verify token is still valid by fetching current user
          const result = await authService.refreshAuth();
          
          if (result.success) {
            setUser(result.data);
            setIsAuthenticated(true);
          } else {
            // Token expired or invalid
            authService.clearUserSession();
            setUser(null);
            setIsAuthenticated(false);
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        authService.clearUserSession();
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = async (credentials) => {
    setLoading(true);
    try {
      const result = await authService.login(credentials);
      
      if (result.success) {
        setUser(result.data.user);
        setIsAuthenticated(true);
        toast.success('Login successful!');
        return result;
      } else {
        toast.error(result.message || 'Login failed');
        return result;
      }
    } catch (error) {
      const errorMessage = error.message || 'Login failed';
      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (userData) => {
    setLoading(true);
    try {
      const result = await authService.register(userData);
      
      if (result.success) {
        setUser(result.data.user);
        setIsAuthenticated(true);
        toast.success('Registration successful!');
        return result;
      } else {
        toast.error(result.message || 'Registration failed');
        return result;
      }
    } catch (error) {
      const errorMessage = error.message || 'Registration failed';
      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Vendor registration function
  const registerVendor = async (vendorData) => {
    setLoading(true);
    try {
      const result = await authService.registerVendor(vendorData);
      
      if (result.success) {
        setUser(result.data.user);
        setIsAuthenticated(true);
        toast.success('Vendor registration successful! Awaiting approval.');
        return result;
      } else {
        toast.error(result.message || 'Vendor registration failed');
        return result;
      }
    } catch (error) {
      const errorMessage = error.message || 'Vendor registration failed';
      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Vendor login function
  const loginVendor = async (credentials) => {
    setLoading(true);
    try {
      const result = await authService.loginVendor(credentials);
      
      if (result.success) {
        setUser(result.data.user);
        setIsAuthenticated(true);
        toast.success('Vendor login successful!');
        return result;
      } else {
        toast.error(result.message || 'Vendor login failed');
        return result;
      }
    } catch (error) {
      const errorMessage = error.message || 'Vendor login failed';
      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Admin login function
  const loginAdmin = async (credentials) => {
    setLoading(true);
    try {
      const result = await authService.loginAdmin(credentials);
      
      if (result.success) {
        setUser(result.data.user);
        setIsAuthenticated(true);
        toast.success('Admin login successful!');
        return result;
      } else {
        toast.error(result.message || 'Admin login failed');
        return result;
      }
    } catch (error) {
      const errorMessage = error.message || 'Admin login failed';
      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      setIsAuthenticated(false);
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear local state even if API call fails
      setUser(null);
      setIsAuthenticated(false);
      authService.clearUserSession();
    }
  };

  // Update user profile
  const updateProfile = async (updates) => {
    if (!user) return { success: false, message: 'No user logged in' };

    setLoading(true);
    try {
      const result = await authService.updateProfile(updates);
      
      if (result.success) {
        setUser(result.data);
        toast.success('Profile updated successfully!');
        return result;
      } else {
        toast.error(result.message || 'Profile update failed');
        return result;
      }
    } catch (error) {
      const errorMessage = error.message || 'Profile update failed';
      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Check if user has specific role
  const hasRole = (role) => {
    return authService.hasRole(role);
  };

  // Check if user is customer
  const isCustomer = () => {
    return authService.isCustomer();
  };

  // Check if user is vendor
  const isVendor = () => {
    return authService.isVendor();
  };

  // Check if user is admin
  const isAdmin = () => {
    return authService.isAdmin();
  };

  // Check if user can access vendor features
  const canAccessVendor = () => {
    return authService.canAccessVendor();
  };

  // Check if user can access admin features
  const canAccessAdmin = () => {
    return authService.canAccessAdmin();
  };

  // Get user display name
  const getDisplayName = () => {
    return authService.getUserDisplayName();
  };

  // Refresh authentication state
  const refreshAuth = async () => {
    setLoading(true);
    try {
      const result = await authService.refreshAuth();
      
      if (result.success) {
        setUser(result.data);
        setIsAuthenticated(true);
        return result;
      } else {
        setUser(null);
        setIsAuthenticated(false);
        return result;
      }
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  };

  const contextValue = {
    // State
    user,
    loading,
    isAuthenticated,

    // Actions
    login,
    register,
    registerVendor,
    loginVendor,
    loginAdmin,
    logout,
    updateProfile,
    refreshAuth,

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
