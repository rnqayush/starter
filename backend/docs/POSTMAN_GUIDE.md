# Postman Collection Guide

## Overview

This guide helps you set up and use the comprehensive Postman collection for the Multi-Business Platform API. The collection includes all endpoints for authentication, hotels, bookings, products, orders, and more.

## Files Included

1. **`Multi-Business-Platform-API.postman_collection.json`** - Complete API collection
2. **`Multi-Business-Platform.postman_environment.json`** - Environment variables
3. **`POSTMAN_GUIDE.md`** - This guide

## Quick Setup

### 1. Import Collection & Environment

1. Open Postman
2. Click **Import** button
3. Import both files:
   - `Multi-Business-Platform-API.postman_collection.json`
   - `Multi-Business-Platform.postman_environment.json`

### 2. Set Environment

1. Select **Multi-Business Platform Environment** from the environment dropdown
2. Verify `baseUrl` is set to `http://localhost:5000`

### 3. Start Your Server

```bash
cd backend
npm run dev
```

## Collection Structure

### 🔐 Authentication
- **Register User** - Create new user account
- **Login User** - Authenticate and get JWT token (auto-saves token)
- **Get Current User** - Get authenticated user details
- **Logout User** - Logout current user

### 🏨 Hotels
- **Get All Hotels** - List all hotels
- **Get Single Hotel** - Get hotel details by ID
- **Create Hotel** - Create new hotel (requires auth)

### 🔍 Hotel Search & Discovery
- **Search Hotels** - Advanced search with filters
- **Check Hotel Availability** - Check room availability for dates
- **Get Popular Hotels** - Get most popular hotels
- **Get Hotel Recommendations** - Get personalized recommendations

### 📊 Hotel Analytics (Protected)
- **Get Hotel Analytics** - Comprehensive hotel performance data
- **Get Booking Calendar** - Monthly booking calendar view
- **Get Revenue Analytics** - Revenue analysis by period

### 📋 Bookings
- **Get All Bookings** - List all bookings (requires auth)
- **Create Hotel Booking** - Create new hotel booking
- **Get Single Booking** - Get booking details
- **Update Booking Status** - Update booking status

### 🏢 Business
- **Get All Businesses** - List all businesses
- **Create Business** - Create new business (requires auth)

### 👥 Users
- **Get All Users** - List all users (admin only)
- **Get User Profile** - Get current user profile
- **Update User Profile** - Update user profile

### 🛍️ Products
- **Get All Products** - List all products
- **Create Product** - Create new product (requires auth)

### 📦 Orders
- **Get All Orders** - List all orders (requires auth)
- **Create Order** - Create new order

### Other Modules
- **💒 Weddings** - Wedding services
- **🚗 Vehicles** - Vehicle services
- **📝 Blogs** - Blog posts
- **🔍 Search** - Global search
- **📊 Analytics** - Platform analytics
- **🏥 Health Check** - API health status

## Getting Started Workflow

### Step 1: Health Check
1. Run **Health Check** to verify API is running
2. Should return status 200 with success message

### Step 2: Authentication
1. **Register User** with your details
2. **Login User** - token will be automatically saved to environment
3. **Get Current User** to verify authentication

### Step 3: Create Business (Optional)
1. **Create Business** to set up a hotel business
2. Copy the business ID from response

### Step 4: Test Hotel Features
1. **Get All Hotels** to see existing hotels
2. **Search Hotels** with various filters
3. **Check Hotel Availability** for specific dates
4. **Get Popular Hotels** and **Get Hotel Recommendations**

### Step 5: Test Bookings
1. **Create Hotel Booking** using hotel and room IDs
2. **Get All Bookings** to see your bookings
3. **Update Booking Status** to confirm booking

### Step 6: Analytics (Hotel Owners)
1. **Get Hotel Analytics** for performance insights
2. **Get Booking Calendar** for monthly view
3. **Get Revenue Analytics** for financial data

## Environment Variables

The environment includes these variables:

| Variable | Description | Auto-populated |
|----------|-------------|----------------|
| `baseUrl` | API base URL | ✅ |
| `authToken` | JWT authentication token | ✅ (on login) |
| `userId` | Current user ID | Manual |
| `businessId` | Business ID | Manual |
| `hotelId` | Hotel ID for testing | Manual |
| `bookingId` | Booking ID for testing | Manual |
| `productId` | Product ID for testing | Manual |
| `orderId` | Order ID for testing | Manual |

## Sample Data Setup

### Option 1: Basic Seeding
```bash
cd backend && npm run seed
```

### Option 2: Enhanced Seeding (Recommended)
```bash
cd backend && npm run seed:enhanced
```

The enhanced seeding creates:
- 3 Business owners
- 3 Hotel businesses (Taj Palace, Oberoi, Leela Palace)
- 3 Luxury hotels with multiple room types
- 25+ diverse bookings

## Authentication Flow

1. **Register** or **Login** to get JWT token
2. Token is automatically saved to `authToken` environment variable
3. Protected endpoints automatically use the token
4. If token expires, login again to refresh

## Testing Hotel Search

### Basic Search
```
GET /api/hotels/search?location=Delhi&category=luxury
```

### Advanced Search with Filters
```
GET /api/hotels/search?location=Delhi&checkIn=2024-08-15&checkOut=2024-08-18&guests=2&minPrice=10000&maxPrice=20000&starRating=4&category=luxury&amenities=WiFi,Spa&page=1&limit=10
```

### Availability Check
```
GET /api/hotels/{hotelId}/availability?checkIn=2024-08-15&checkOut=2024-08-18&roomType=deluxe
```

## Testing Analytics

### Hotel Performance (30 days)
```
GET /api/hotels/{hotelId}/analytics?period=30
```

### Booking Calendar (August 2024)
```
GET /api/hotels/{hotelId}/calendar?month=8&year=2024
```

### Revenue Analysis (Monthly)
```
GET /api/hotels/{hotelId}/revenue?period=month
```

## Common Use Cases

### 1. Hotel Owner Dashboard
1. Login as business owner
2. Get hotel analytics
3. View booking calendar
4. Check revenue trends

### 2. Customer Booking Flow
1. Search hotels by location/dates
2. Check availability
3. Create booking
4. View booking details

### 3. Platform Admin
1. Login as admin
2. View all users
3. Get platform analytics
4. Monitor all businesses

## Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "statusCode": 400
}
```

Common status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Tips for Testing

1. **Start with Health Check** to ensure API is running
2. **Always authenticate first** for protected endpoints
3. **Use enhanced seeding** for realistic test data
4. **Copy IDs from responses** to use in subsequent requests
5. **Check environment variables** if requests fail
6. **Monitor console** for detailed error messages

## Troubleshooting

### Token Issues
- If getting 401 errors, re-login to refresh token
- Check that `authToken` environment variable is set

### Connection Issues
- Verify server is running on `http://localhost:5000`
- Check `baseUrl` in environment settings

### Data Issues
- Run seeding scripts to populate test data
- Use enhanced seeding for comprehensive data

## Advanced Features

### Pre-request Scripts
The login request includes a script that automatically saves the JWT token to the environment.

### Test Scripts
Some requests include test scripts for validation and data extraction.

### Variables
Use `{{variableName}}` syntax to reference environment variables in requests.

## Support

For issues with the API or Postman collection:
1. Check server logs for errors
2. Verify environment variables are set correctly
3. Ensure you're using the correct HTTP methods and endpoints
4. Review the API documentation in `HOTEL_API.md`

---

**Happy Testing! 🚀**
