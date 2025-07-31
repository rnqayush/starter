# 🏨 Hotel Booking API - Postman Collection Guide

## 📋 Overview

This comprehensive Postman collection provides complete testing coverage for the Multi-Business Platform Hotel Booking API. It includes authentication, hotel management, booking system, reviews, and data seeding endpoints.

## 🚀 Quick Start

### 1. Import Collection & Environment
1. Import `Hotel-Booking-API.postman_collection.json` into Postman
2. Import `Hotel-Booking-API.postman_environment.json` as environment
3. Select the "Hotel Booking API Environment" in Postman

### 2. Start the Server
```bash
cd backend
npm run dev
```
Server will start on `http://localhost:5000`

### 3. Seed the Database (Optional)
Run the "Seed Database" request in the "🌱 Data Seeding & Management" folder to populate with sample data.

## 📁 Collection Structure

### 🔐 Authentication
- **Register User** - Create new user account
- **Login User** - Authenticate and get JWT token
- **Get Current User** - Get authenticated user details
- **Logout User** - End user session

### 🏨 Hotel Management
- **Get All Hotels** - List all available hotels with pagination
- **Get Hotel by ID** - Detailed hotel information
- **Search Hotels** - Filter hotels by location, dates, price
- **Get Hotel Rooms** - List rooms for a specific hotel
- **Check Room Availability** - Verify room availability for dates

### 📚 Booking Management
- **Create Booking** - Make a new hotel reservation
- **Get User Bookings** - List user's bookings with filters
- **Get Booking by ID** - Detailed booking information
- **Update Booking** - Modify booking details
- **Cancel Booking** - Cancel existing reservation

### ⭐ Review System
- **Get Hotel Reviews** - List reviews for a hotel
- **Create Hotel Review** - Add new review and rating
- **Update Review** - Modify existing review
- **Delete Review** - Remove review

### 🌱 Data Seeding & Management
- **Seed Database** - Populate with sample data
- **Clear Database** - Remove all data (development only)
- **Get Database Stats** - View data counts

### 🔧 System & Health
- **Health Check** - API status verification
- **API Documentation** - Access Swagger docs

## 🔄 Automated Workflows

### Environment Variables Auto-Population
The collection automatically sets environment variables:

- `authToken` - JWT token from login
- `userId` - Current user ID
- `hotelId` - Selected hotel ID
- `roomId` - Selected room ID
- `bookingId` - Created booking ID
- `reviewId` - Created review ID

### Test Scripts
Each request includes automated tests:
- Response time validation (< 5 seconds)
- JSON structure validation
- Success status verification
- Environment variable extraction

## 🏨 Sample Data Available

After seeding, you'll have:

### Hotels (3)
1. **Taj Palace New Delhi**
   - 5-star luxury hotel
   - 2 room types: Deluxe Room, Royal Suite
   - Location: New Delhi, India

2. **The Oberoi Mumbai**
   - 5-star business hotel
   - 2 room types: Ocean View Room, Executive Suite
   - Location: Mumbai, India

3. **The Leela Palace Bangalore**
   - 5-star royal palace hotel
   - 2 room types: Palace Room, Presidential Suite
   - Location: Bangalore, India

### Users (4)
- 3 Business owners (hotel managers)
- 1 Customer account

### Bookings (31)
- Various booking statuses
- Different date ranges
- Multiple guest configurations

## 🔧 Configuration

### Environment Variables
```json
{
  "baseUrl": "http://localhost:5000",
  "authToken": "auto-populated",
  "userId": "auto-populated",
  "hotelId": "auto-populated",
  "roomId": "auto-populated",
  "bookingId": "auto-populated"
}
```

### Pre-request Scripts
- Auto-sets base URL if not configured
- Logs request details for debugging

### Test Scripts
- Validates response times
- Checks JSON structure
- Extracts and stores relevant IDs

## 📝 Usage Examples

### 1. Complete Booking Flow
1. Run "Login User" to authenticate
2. Run "Get All Hotels" to see available hotels
3. Run "Get Hotel Rooms" for selected hotel
4. Run "Check Room Availability" for desired dates
5. Run "Create Booking" to make reservation
6. Run "Get Booking by ID" to verify booking

### 2. Review Management
1. Ensure you're authenticated
2. Run "Get Hotel Reviews" to see existing reviews
3. Run "Create Hotel Review" to add your review
4. Run "Update Review" to modify if needed

### 3. Search & Filter
1. Run "Search Hotels" with location filter
2. Adjust query parameters for different searches:
   - `location=Mumbai`
   - `checkIn=2025-08-01&checkOut=2025-08-03`
   - `minPrice=5000&maxPrice=15000`

## 🧪 Testing Scenarios

### Authentication Testing
- Valid login credentials
- Invalid credentials handling
- Token expiration scenarios
- Unauthorized access attempts

### Booking Testing
- Valid booking creation
- Double booking prevention
- Date validation
- Guest limit validation
- Cancellation workflows

### Error Handling
- Invalid hotel/room IDs
- Malformed request data
- Missing authentication
- Server error responses

## 🔍 Debugging Tips

### Common Issues
1. **Server not running**: Ensure `npm run dev` is running
2. **Authentication failed**: Check login credentials
3. **Empty responses**: Run database seeding first
4. **Token expired**: Re-run login request

### Logging
- Check Postman console for request/response logs
- Server logs available in terminal
- Environment variables visible in Postman

## 🚀 Advanced Features

### Batch Testing
Use Postman Runner to execute entire collection:
1. Select collection
2. Choose environment
3. Run all requests in sequence

### Data-Driven Testing
- Import CSV with test data
- Use variables for different scenarios
- Automated test execution

### CI/CD Integration
Export collection and run with Newman:
```bash
newman run Hotel-Booking-API.postman_collection.json \
  -e Hotel-Booking-API.postman_environment.json
```

## 📊 Expected Results

### Successful Responses
- Authentication: 200/201 with JWT token
- Hotel listings: 200 with hotel array
- Booking creation: 201 with booking details
- Reviews: 200/201 with review data

### Error Responses
- 400: Bad request (validation errors)
- 401: Unauthorized (missing/invalid token)
- 404: Not found (invalid IDs)
- 500: Server error

## 🎯 Best Practices

1. **Always authenticate first** before testing protected endpoints
2. **Use environment variables** instead of hardcoded values
3. **Check response status** before proceeding to next request
4. **Seed database** before running comprehensive tests
5. **Clear sensitive data** from environment after testing

---

## 🆘 Support

For issues or questions:
1. Check server logs in terminal
2. Verify environment variables are set
3. Ensure database is running (MongoDB)
4. Review API documentation at `/api-docs`

**Happy Testing! 🚀**

