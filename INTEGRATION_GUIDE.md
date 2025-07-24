# Frontend-Backend Integration Guide

This document outlines the integration between the React frontend and Express.js backend for the MultiVendor Platform.

## 🔗 Integration Overview

The frontend has been successfully integrated with the backend API using:
- **Axios** for HTTP requests
- **React Query (TanStack Query)** for data fetching and caching
- **React Toastify** for user notifications
- **JWT Authentication** for secure API access

## 📁 New File Structure

```
src/
├── constants/
│   └── api.js                 # API endpoints and configuration
├── services/
│   ├── apiClient.js          # Axios configuration and interceptors
│   ├── authService.js        # Authentication service
│   ├── hotelService.js       # Hotel business API service
│   ├── ecommerceService.js   # E-commerce API service
│   ├── automobileService.js  # Automobile API service
│   ├── weddingService.js     # Wedding service API service
│   ├── adminService.js       # Admin management API service
│   ├── homepageService.js    # Homepage content API service
│   └── index.js              # Service exports
├── hooks/
│   └── useApi.js             # Custom hooks for API calls
├── utils/
│   └── testApi.js            # API testing utilities
└── context/
    └── AuthContext.js        # Updated with real API integration
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
REACT_APP_API_BASE_URL=http://localhost:5000/api
REACT_APP_ENVIRONMENT=development
REACT_APP_APP_NAME=MultiVendor Platform
REACT_APP_VERSION=1.0.0
```

### Backend Requirements
Ensure your backend server is running on `http://localhost:5000` with the following endpoints:

- **Authentication**: `/api/auth/*`
- **Vendor Management**: `/api/vendor/*`
- **Admin Operations**: `/api/admin/*`
- **Business Categories**: `/api/hotel/*`, `/api/ecommerce/*`, `/api/automobile/*`, `/api/wedding/*`
- **Homepage**: `/api/homepage/*`
- **Health Check**: `/api/test/ping`

## 🚀 Usage Examples

### Authentication
```javascript
import { useAuth } from '../context/AuthContext';

function LoginComponent() {
  const { login, loading, isAuthenticated } = useAuth();
  
  const handleLogin = async (credentials) => {
    const result = await login(credentials);
    if (result.success) {
      // Login successful - user will be redirected
    }
  };
}
```

### API Service Usage
```javascript
import { hotelService } from '../services';
import { useApi } from '../hooks/useApi';

function HotelList() {
  const { data, loading, error, execute } = useApi(hotelService.getHotels);
  
  useEffect(() => {
    execute({ page: 1, limit: 10 });
  }, []);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      {data?.map(hotel => (
        <div key={hotel._id}>{hotel.name}</div>
      ))}
    </div>
  );
}
```

### Custom Hooks
```javascript
import { usePaginatedApi } from '../hooks/useApi';
import { ecommerceService } from '../services';

function ProductList() {
  const {
    data: products,
    loading,
    hasMore,
    loadMore
  } = usePaginatedApi(ecommerceService.getProducts);
  
  return (
    <div>
      {products.map(product => (
        <ProductCard key={product._id} product={product} />
      ))}
      {hasMore && (
        <button onClick={loadMore} disabled={loading}>
          Load More
        </button>
      )}
    </div>
  );
}
```

## 🔐 Authentication Flow

1. **User Login**: Calls backend `/api/auth/login`
2. **Token Storage**: JWT token stored in localStorage
3. **Auto-Injection**: Token automatically added to all API requests
4. **Token Refresh**: Automatic token validation on app initialization
5. **Auto-Logout**: Automatic logout on token expiration

## 🎯 Role-Based Access

The system supports three user roles:
- **Customer**: Browse and purchase/book services
- **Vendor**: Manage business listings and bookings
- **Admin**: Platform management and vendor approval

```javascript
import { useAuth } from '../context/AuthContext';

function ProtectedComponent() {
  const { isVendor, canAccessAdmin } = useAuth();
  
  if (isVendor()) {
    return <VendorDashboard />;
  }
  
  if (canAccessAdmin()) {
    return <AdminPanel />;
  }
  
  return <CustomerView />;
}
```

## 📊 Data Flow

1. **Component** → calls service function
2. **Service** → makes API request via apiClient
3. **apiClient** → adds auth headers, handles errors
4. **Backend** → processes request, returns data
5. **Service** → formats response
6. **Component** → updates UI with data

## 🛠️ Error Handling

- **Network Errors**: Automatic retry and user notification
- **Authentication Errors**: Automatic logout and redirect
- **Validation Errors**: Display field-specific errors
- **Server Errors**: User-friendly error messages

## 🧪 Testing the Integration

Use the test utilities to verify the integration:

```javascript
import { testApiConnection } from '../utils/testApi';

// Test API connection
const result = await testApiConnection();
console.log(result);
```

## 🔄 Migration from Mock Data

The existing components will gradually be updated to use real API data:

1. **Phase 1**: Authentication system (✅ Complete)
2. **Phase 2**: Homepage content integration
3. **Phase 3**: Business category components
4. **Phase 4**: Admin dashboard integration
5. **Phase 5**: Vendor management features

## 📝 Next Steps

1. **Update Components**: Replace mock data with API calls
2. **Add Loading States**: Implement proper loading indicators
3. **Error Boundaries**: Add comprehensive error handling
4. **Caching Strategy**: Optimize data fetching with React Query
5. **Performance**: Implement lazy loading and pagination

## 🚨 Important Notes

- **CORS**: Ensure backend has proper CORS configuration
- **Environment**: Update API URLs for different environments
- **Security**: Never commit sensitive data to version control
- **Testing**: Test all authentication flows thoroughly
- **Performance**: Monitor API response times and optimize as needed

## 🔗 Related Documentation

- [Backend API Documentation](../Backend_Starter/README.md)
- [Authentication Service](./src/services/authService.js)
- [API Client Configuration](./src/services/apiClient.js)
- [Custom Hooks](./src/hooks/useApi.js)

