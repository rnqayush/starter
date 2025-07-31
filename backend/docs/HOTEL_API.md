# Hotel API Documentation

## Overview

The Hotel API provides comprehensive functionality for managing hotels, rooms, bookings, and analytics in a multi-business platform. This API supports advanced search, filtering, availability checking, and detailed analytics for hotel owners.

## Base URL

```
http://localhost:5000/api/hotels
```

## Authentication

Most endpoints require authentication using JWT tokens. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Endpoints

### 🏨 Basic Hotel Operations

#### Get All Hotels
```http
GET /api/hotels
```

**Response:**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "_id": "hotel_id",
      "name": "Taj Palace New Delhi",
      "description": "Legendary luxury hotel...",
      "category": "luxury",
      "starRating": 5,
      "business": {
        "name": "Taj Palace Business",
        "address": {...}
      }
    }
  ]
}
```

#### Get Single Hotel
```http
GET /api/hotels/:id
```

#### Create Hotel (Protected)
```http
POST /api/hotels
Authorization: Bearer <token>
```

#### Update Hotel (Protected)
```http
PUT /api/hotels/:id
Authorization: Bearer <token>
```

#### Delete Hotel (Protected)
```http
DELETE /api/hotels/:id
Authorization: Bearer <token>
```

### 🔍 Advanced Search & Discovery

#### Search Hotels
```http
GET /api/hotels/search?location=Delhi&checkIn=2024-08-15&checkOut=2024-08-18&guests=2&minPrice=10000&maxPrice=20000&starRating=4&amenities=WiFi,Spa&category=luxury&sortBy=name&sortOrder=asc&page=1&limit=10
```

**Query Parameters:**
- `location` - City, state, or country
- `checkIn` - Check-in date (YYYY-MM-DD)
- `checkOut` - Check-out date (YYYY-MM-DD)
- `guests` - Number of guests
- `minPrice` - Minimum price per night
- `maxPrice` - Maximum price per night
- `starRating` - Minimum star rating
- `amenities` - Comma-separated amenities
- `category` - Hotel category (luxury, business, budget)
- `sortBy` - Sort field (name, price, rating)
- `sortOrder` - Sort order (asc, desc)
- `page` - Page number
- `limit` - Results per page

**Response:**
```json
{
  "success": true,
  "data": {
    "hotels": [...],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalResults": 45,
      "hasNextPage": true,
      "hasPrevPage": false
    },
    "filters": {
      "location": "Delhi",
      "checkIn": "2024-08-15",
      "checkOut": "2024-08-18"
    }
  }
}
```

#### Check Hotel Availability
```http
GET /api/hotels/:id/availability?checkIn=2024-08-15&checkOut=2024-08-18&roomType=deluxe
```

**Response:**
```json
{
  "success": true,
  "data": {
    "hotel": {
      "id": "hotel_id",
      "name": "Taj Palace New Delhi"
    },
    "checkIn": "2024-08-15T00:00:00.000Z",
    "checkOut": "2024-08-18T00:00:00.000Z",
    "nights": 3,
    "availableRooms": [
      {
        "name": "Luxury Palace Room",
        "type": "deluxe",
        "pricePerNight": 12000,
        "totalPrice": 36000,
        "nights": 3,
        "availability": {
          "availableRooms": 8
        }
      }
    ],
    "totalAvailableRooms": 1
  }
}
```

#### Get Popular Hotels
```http
GET /api/hotels/popular?limit=6
```

#### Get Hotel Recommendations
```http
GET /api/hotels/recommendations?location=Mumbai&category=luxury&maxPrice=20000&amenities=Spa,Pool
```

### 📊 Analytics & Reporting (Protected)

#### Get Hotel Analytics
```http
GET /api/hotels/:id/analytics?period=30
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "period": "30 days",
    "overview": {
      "totalBookings": 45,
      "totalRevenue": 540000,
      "confirmedBookings": 38,
      "pendingBookings": 5,
      "cancelledBookings": 2,
      "occupancyRate": 75.5,
      "averageDailyRate": 12000,
      "revPAR": 9066
    },
    "trends": [
      {
        "date": "2024-07-01",
        "bookings": 3,
        "revenue": 36000
      }
    ],
    "roomPerformance": [
      {
        "roomType": "deluxe",
        "roomName": "Luxury Palace Room",
        "bookings": 25,
        "revenue": 300000,
        "occupancyRate": 83.3
      }
    ],
    "guestDemographics": {
      "adults": 85,
      "children": 12
    },
    "paymentBreakdown": {
      "paid": 38,
      "pending": 5,
      "failed": 2
    }
  }
}
```

#### Get Booking Calendar
```http
GET /api/hotels/:id/calendar?month=8&year=2024
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "month": 8,
    "year": 2024,
    "calendar": [
      {
        "date": "2024-08-01",
        "bookings": 2,
        "revenue": 24000,
        "occupiedRooms": 2,
        "bookingDetails": [
          {
            "id": "booking_id",
            "customerName": "John Smith",
            "roomType": "deluxe",
            "status": "confirmed",
            "checkIn": "2024-08-01",
            "checkOut": "2024-08-03"
          }
        ]
      }
    ],
    "summary": {
      "totalBookings": 45,
      "totalRevenue": 540000,
      "averageOccupancy": "2.50"
    }
  }
}
```

#### Get Revenue Analytics
```http
GET /api/hotels/:id/revenue?period=month
Authorization: Bearer <token>
```

**Query Parameters:**
- `period` - Analysis period (month, quarter, year)

## Database Seeding

### Basic Seeding
```bash
cd backend && npm run seed
```

### Enhanced Seeding (Multiple Hotels)
```bash
cd backend && npm run seed:enhanced
```

The enhanced seeder creates:
- 3 Business owners
- 3 Hotel businesses (Taj Palace, Oberoi, Leela Palace)
- 3 Luxury hotels with different room types
- 25+ diverse bookings with various statuses

## Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "statusCode": 400
}
```

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Rate Limiting

API requests are rate-limited to prevent abuse:
- 100 requests per 15 minutes for search endpoints
- 50 requests per 15 minutes for analytics endpoints

## Data Models

### Hotel Schema
```javascript
{
  business: ObjectId,
  name: String,
  description: String,
  category: String, // luxury, business, budget
  starRating: Number,
  images: [String],
  rooms: [{
    name: String,
    type: String,
    description: String,
    capacity: { adults: Number, children: Number },
    pricing: { basePrice: Number, currency: String },
    availability: { totalRooms: Number, availableRooms: Number }
  }],
  amenities: {
    general: [String],
    business: [String],
    wellness: [String],
    dining: [String]
  },
  analytics: {
    totalBookings: Number,
    totalRevenue: Number,
    averageRating: Number,
    occupancyRate: Number
  }
}
```

### Booking Schema
```javascript
{
  business: ObjectId,
  customer: {
    name: String,
    email: String,
    phone: String
  },
  bookingType: String,
  hotelBooking: {
    hotel: ObjectId,
    room: ObjectId,
    checkIn: Date,
    checkOut: Date,
    guests: { adults: Number, children: Number },
    totalNights: Number
  },
  totalAmount: Number,
  status: String, // confirmed, pending, cancelled
  paymentStatus: String // paid, pending, failed
}
```

## Examples

### Search for luxury hotels in Delhi
```bash
curl "http://localhost:5000/api/hotels/search?location=Delhi&category=luxury&starRating=4"
```

### Check availability for specific dates
```bash
curl "http://localhost:5000/api/hotels/hotel_id/availability?checkIn=2024-08-15&checkOut=2024-08-18"
```

### Get hotel analytics (requires authentication)
```bash
curl -H "Authorization: Bearer your_token" \
     "http://localhost:5000/api/hotels/hotel_id/analytics?period=30"
```

## Support

For API support and questions, please refer to the main project documentation or contact the development team.

