import { useSelector, useDispatch } from 'react-redux';
import { 
  selectAuth, 
  selectIsAuthenticated, 
  selectUser, 
  selectAuthLoading, 
  selectAuthError,
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
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
  useGetCurrentUserQuery
} from '../store/api/authApi';
import { toast } from 'react-toastify';

export const useAuth = () => {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  // RTK Query mutations
  const [loginMutation] = useLoginMutation();
  const [registerMutation] = useRegisterMutation();
  const [vendorLoginMutation] = useVendorLoginMutation();
  const [vendorRegisterMutation] = useVendorRegisterMutation();
  const [adminLoginMutation] = useAdminLoginMutation();
  const [logoutMutation] = useLogoutMutation();

  // Get current user query (only if authenticated)
  const { data: currentUser, refetch: refetchUser } = useGetCurrentUserQuery(undefined, {
    skip: !isAuthenticated,
  });

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
      return { success: false, error: errorMessage };
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
      return { success: false, error: errorMessage };
    }
  };

  // Logout function
  const handleLogout = async () => {
    try {
      await logoutMutation().unwrap();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      dispatch(logout());
      toast.success('Logged out successfully');
    }
  };

  // Update user profile
  const updateProfile = (userData) => {
    dispatch(updateUser(userData));
  };

  // Clear error
  const clearAuthError = () => {
    dispatch(clearError());
  };

  return {
    // State
    auth,
    isAuthenticated,
    user,
    isLoading,
    error,
    
    // Actions
    login,
    register,
    logout: handleLogout,
    updateProfile,
    clearError: clearAuthError,
    refetchUser,
    
    // Helper functions
    isCustomer: user?.role === 'customer',
    isVendor: user?.role === 'vendor',
    isAdmin: user?.role === 'admin',
  };
};
