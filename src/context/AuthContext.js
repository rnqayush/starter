import { createContext, useContext, useState, useEffect } from 'react';

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

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const savedUser = localStorage.getItem('user');
        const savedAuth = localStorage.getItem('isAuthenticated');

        if (savedUser && savedAuth === 'true') {
          const parsedUser = JSON.parse(savedUser);
          setUser(parsedUser);
          setIsAuthenticated(true);
        }
      } catch (error) {
        // Clear corrupted data
        localStorage.removeItem('user');
        localStorage.removeItem('isAuthenticated');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = async credentials => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // For demo purposes, create user based on email
      const userData = {
        id: Date.now(),
        email: credentials.email,
        name: credentials.name || getNameFromEmail(credentials.email),
        phone: credentials.phone || '',
        role: credentials.role || 'customer', // customer, seller, admin
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(credentials.name || getNameFromEmail(credentials.email))}&background=1e40af&color=fff`,
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

      // If seller, add seller-specific data
      if (credentials.role === 'seller') {
        userData.seller = {
          businessName: credentials.businessName || `${userData.name}'s Store`,
          businessType: credentials.businessType || 'General',
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

      setUser(userData);
      setIsAuthenticated(true);

      // Persist to localStorage
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('isAuthenticated', 'true');

      return { success: true, user: userData };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async userData => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      const newUser = {
        id: Date.now(),
        ...userData,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=1e40af&color=fff`,
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

      // If seller registration, add seller data
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

      setUser(newUser);
      setIsAuthenticated(true);

      // Persist to localStorage
      localStorage.setItem('user', JSON.stringify(newUser));
      localStorage.setItem('isAuthenticated', 'true');

      return { success: true, user: newUser };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');

    // Clear other user-specific data
    localStorage.removeItem('userEnquiries');
    localStorage.removeItem('shopSettings');
    localStorage.removeItem('recentlyViewed');
    localStorage.removeItem('pageViews');
  };

  // Update user profile
  const updateProfile = async updates => {
    if (!user) return { success: false, error: 'No user logged in' };

    try {
      const updatedUser = {
        ...user,
        ...updates,
        lastModified: new Date().toISOString(),
      };

      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));

      return { success: true, user: updatedUser };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Switch user role (for demo purposes)
  const switchRole = newRole => {
    if (!user) return;

    const updatedUser = { ...user, role: newRole };

    // Add seller data if switching to seller
    if (newRole === 'seller' && !user.seller) {
      updatedUser.seller = {
        businessName: `${user.name}'s Store`,
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

    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  // Check if user has specific role
  const hasRole = role => {
    return user?.role === role;
  };

  // Check if user can access seller features
  const canAccessSeller = () => {
    return user?.role === 'seller' || user?.role === 'admin';
  };

  // Get user display name
  const getDisplayName = () => {
    if (!user) return 'Guest';
    return user.name || getNameFromEmail(user.email);
  };

  // Helper function to extract name from email
  const getNameFromEmail = email => {
    if (!email) return 'User';
    const name = email.split('@')[0];
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  // Generate temporary guest user for demo
  const generateGuestUser = () => {
    const guestId = `guest_${Date.now()}`;
    return {
      id: guestId,
      name: 'Guest User',
      email: `${guestId}@demo.com`,
      role: 'customer',
      isGuest: true,
      avatar: `https://ui-avatars.com/api/?name=Guest&background=6b7280&color=fff`,
      preferences: {
        notifications: {
          email: false,
          sms: false,
          push: false,
        },
        language: 'en',
        currency: 'USD',
      },
    };
  };

  const contextValue = {
    // State
    user,
    loading,
    isAuthenticated,

    // Actions
    login,
    register,
    logout,
    updateProfile,
    switchRole,

    // Utilities
    hasRole,
    canAccessSeller,
    getDisplayName,
    generateGuestUser,
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
