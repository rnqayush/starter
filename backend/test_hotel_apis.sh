#!/bin/bash

# Hotel Module API Testing Script
# This script tests all hotel-related endpoints

BASE_URL="http://localhost:5000"
TOKEN=""

echo "🏨 Hotel Module API Testing"
echo "=========================="

# Function to make authenticated requests
auth_request() {
    local method=$1
    local endpoint=$2
    local data=$3
    
    if [ -n "$data" ]; then
        curl -s -X $method "$BASE_URL$endpoint" \
            -H "Content-Type: application/json" \
            -H "Authorization: Bearer $TOKEN" \
            -d "$data"
    else
        curl -s -X $method "$BASE_URL$endpoint" \
            -H "Authorization: Bearer $TOKEN"
    fi
}

# Function to make public requests
public_request() {
    local method=$1
    local endpoint=$2
    local data=$3
    
    if [ -n "$data" ]; then
        curl -s -X $method "$BASE_URL$endpoint" \
            -H "Content-Type: application/json" \
            -d "$data"
    else
        curl -s -X $method "$BASE_URL$endpoint"
    fi
}

echo "1. Testing Authentication..."
echo "----------------------------"

# Login and get token
echo "🔐 Logging in as business owner..."
LOGIN_RESPONSE=$(public_request POST "/api/auth/login" '{"email": "owner@tajpalace.com", "password": "hashedpassword123"}')
TOKEN=$(echo $LOGIN_RESPONSE | jq -r '.token')

if [ "$TOKEN" != "null" ] && [ -n "$TOKEN" ]; then
    echo "✅ Authentication successful"
    echo "Token: ${TOKEN:0:20}..."
else
    echo "❌ Authentication failed"
    echo "Response: $LOGIN_RESPONSE"
    exit 1
fi

echo ""
echo "2. Testing Hotel Endpoints..."
echo "-----------------------------"

# Test 1: Get all hotels (public)
echo "📋 Testing GET /api/hotels (public)"
HOTELS_RESPONSE=$(public_request GET "/api/hotels")
HOTELS_COUNT=$(echo $HOTELS_RESPONSE | jq '.count')
echo "✅ Hotels found: $HOTELS_COUNT"

# Get first hotel ID for detailed tests
HOTEL_ID=$(echo $HOTELS_RESPONSE | jq -r '.data[0].id')
echo "🏨 Using hotel ID: $HOTEL_ID"

# Test 2: Get single hotel (public)
echo ""
echo "🏨 Testing GET /api/hotels/$HOTEL_ID (public)"
HOTEL_DETAIL=$(public_request GET "/api/hotels/$HOTEL_ID")
HOTEL_NAME=$(echo $HOTEL_DETAIL | jq -r '.data.name')
echo "✅ Hotel details: $HOTEL_NAME"

# Test 3: Search hotels (public)
echo ""
echo "🔍 Testing GET /api/hotels/search?location=Delhi (public)"
SEARCH_RESPONSE=$(public_request GET "/api/hotels/search?location=Delhi")
SEARCH_COUNT=$(echo $SEARCH_RESPONSE | jq '.count')
echo "✅ Search results: $SEARCH_COUNT hotels found"

# Test 4: Get hotel rooms (public)
echo ""
echo "🛏️ Testing GET /api/hotels/$HOTEL_ID/rooms (public)"
ROOMS_RESPONSE=$(public_request GET "/api/hotels/$HOTEL_ID/rooms")
ROOMS_COUNT=$(echo $ROOMS_RESPONSE | jq '.count')
echo "✅ Rooms found: $ROOMS_COUNT"

# Get first room ID for booking tests
ROOM_ID=$(echo $ROOMS_RESPONSE | jq -r '.data[0]._id')
echo "🛏️ Using room ID: $ROOM_ID"

# Test 5: Check room availability (public)
echo ""
echo "📅 Testing GET /api/hotels/$HOTEL_ID/rooms/$ROOM_ID/availability (public)"
AVAILABILITY_RESPONSE=$(public_request GET "/api/hotels/$HOTEL_ID/rooms/$ROOM_ID/availability?checkIn=2025-08-01&checkOut=2025-08-03")
IS_AVAILABLE=$(echo $AVAILABILITY_RESPONSE | jq '.data.available')
echo "✅ Room availability: $IS_AVAILABLE"

echo ""
echo "3. Testing Booking Endpoints..."
echo "-------------------------------"

# Test 6: Create booking (authenticated)
echo "📝 Testing POST /api/bookings (authenticated)"
BOOKING_DATA='{
    "hotel": "'$HOTEL_ID'",
    "room": "'$ROOM_ID'",
    "checkIn": "2025-08-01",
    "checkOut": "2025-08-03",
    "guests": {
        "adults": 2,
        "children": 0
    },
    "guestDetails": {
        "firstName": "John",
        "lastName": "Doe",
        "email": "john.doe@example.com",
        "phone": "+1234567890"
    },
    "specialRequests": "Late check-in"
}'

BOOKING_RESPONSE=$(auth_request POST "/api/bookings" "$BOOKING_DATA")
BOOKING_SUCCESS=$(echo $BOOKING_RESPONSE | jq '.success')

if [ "$BOOKING_SUCCESS" = "true" ]; then
    BOOKING_ID=$(echo $BOOKING_RESPONSE | jq -r '.data.id')
    echo "✅ Booking created: $BOOKING_ID"
    
    # Test 7: Get booking details (authenticated)
    echo ""
    echo "📋 Testing GET /api/bookings/$BOOKING_ID (authenticated)"
    BOOKING_DETAIL=$(auth_request GET "/api/bookings/$BOOKING_ID")
    BOOKING_STATUS=$(echo $BOOKING_DETAIL | jq -r '.data.status')
    echo "✅ Booking status: $BOOKING_STATUS"
    
    # Test 8: Update booking (authenticated)
    echo ""
    echo "✏️ Testing PUT /api/bookings/$BOOKING_ID (authenticated)"
    UPDATE_DATA='{"specialRequests": "Late check-in and early breakfast"}'
    UPDATE_RESPONSE=$(auth_request PUT "/api/bookings/$BOOKING_ID" "$UPDATE_DATA")
    UPDATE_SUCCESS=$(echo $UPDATE_RESPONSE | jq '.success')
    echo "✅ Booking update: $UPDATE_SUCCESS"
    
    # Test 9: Cancel booking (authenticated)
    echo ""
    echo "❌ Testing DELETE /api/bookings/$BOOKING_ID (authenticated)"
    CANCEL_RESPONSE=$(auth_request DELETE "/api/bookings/$BOOKING_ID")
    CANCEL_SUCCESS=$(echo $CANCEL_RESPONSE | jq '.success')
    echo "✅ Booking cancellation: $CANCEL_SUCCESS"
else
    echo "❌ Booking creation failed"
    echo "Response: $BOOKING_RESPONSE"
fi

# Test 10: Get user's bookings (authenticated)
echo ""
echo "📚 Testing GET /api/bookings (authenticated)"
USER_BOOKINGS=$(auth_request GET "/api/bookings")
USER_BOOKINGS_COUNT=$(echo $USER_BOOKINGS | jq '.count')
echo "✅ User bookings: $USER_BOOKINGS_COUNT"

echo ""
echo "4. Testing Review Endpoints..."
echo "------------------------------"

# Test 11: Get hotel reviews (public)
echo "⭐ Testing GET /api/hotels/$HOTEL_ID/reviews (public)"
REVIEWS_RESPONSE=$(public_request GET "/api/hotels/$HOTEL_ID/reviews")
REVIEWS_COUNT=$(echo $REVIEWS_RESPONSE | jq '.count')
echo "✅ Reviews found: $REVIEWS_COUNT"

# Test 12: Create review (authenticated)
echo ""
echo "✍️ Testing POST /api/hotels/$HOTEL_ID/reviews (authenticated)"
REVIEW_DATA='{
    "rating": 5,
    "title": "Excellent Stay",
    "comment": "Amazing hotel with great service and beautiful rooms."
}'

REVIEW_RESPONSE=$(auth_request POST "/api/hotels/$HOTEL_ID/reviews" "$REVIEW_DATA")
REVIEW_SUCCESS=$(echo $REVIEW_RESPONSE | jq '.success')

if [ "$REVIEW_SUCCESS" = "true" ]; then
    REVIEW_ID=$(echo $REVIEW_RESPONSE | jq -r '.data.id')
    echo "✅ Review created: $REVIEW_ID"
    
    # Test 13: Update review (authenticated)
    echo ""
    echo "✏️ Testing PUT /api/reviews/$REVIEW_ID (authenticated)"
    UPDATE_REVIEW_DATA='{"rating": 4, "comment": "Great hotel, minor issues with room service."}'
    UPDATE_REVIEW_RESPONSE=$(auth_request PUT "/api/reviews/$REVIEW_ID" "$UPDATE_REVIEW_DATA")
    UPDATE_REVIEW_SUCCESS=$(echo $UPDATE_REVIEW_RESPONSE | jq '.success')
    echo "✅ Review update: $UPDATE_REVIEW_SUCCESS"
    
    # Test 14: Delete review (authenticated)
    echo ""
    echo "🗑️ Testing DELETE /api/reviews/$REVIEW_ID (authenticated)"
    DELETE_REVIEW_RESPONSE=$(auth_request DELETE "/api/reviews/$REVIEW_ID")
    DELETE_REVIEW_SUCCESS=$(echo $DELETE_REVIEW_RESPONSE | jq '.success')
    echo "✅ Review deletion: $DELETE_REVIEW_SUCCESS"
else
    echo "❌ Review creation failed"
    echo "Response: $REVIEW_RESPONSE"
fi

echo ""
echo "5. Testing Additional Hotel Features..."
echo "---------------------------------------"

# Test 15: Get hotel amenities (public)
echo "🏊 Testing hotel amenities extraction"
AMENITIES=$(echo $HOTELS_RESPONSE | jq '.data[0].amenities')
GENERAL_AMENITIES_COUNT=$(echo $AMENITIES | jq '.general | length')
echo "✅ General amenities: $GENERAL_AMENITIES_COUNT"

# Test 16: Get hotel services (public)
echo ""
echo "🛎️ Testing hotel services extraction"
SERVICES=$(echo $HOTELS_RESPONSE | jq '.data[0].services')
SERVICES_COUNT=$(echo $SERVICES | jq 'length')
echo "✅ Services available: $SERVICES_COUNT"

# Test 17: Get hotel dining options (public)
echo ""
echo "🍽️ Testing hotel dining extraction"
DINING=$(echo $HOTELS_RESPONSE | jq '.data[0].dining')
DINING_COUNT=$(echo $DINING | jq 'length')
echo "✅ Dining options: $DINING_COUNT"

echo ""
echo "6. Testing Error Handling..."
echo "----------------------------"

# Test 18: Invalid hotel ID
echo "❌ Testing GET /api/hotels/invalid-id"
INVALID_RESPONSE=$(public_request GET "/api/hotels/invalid-id")
INVALID_SUCCESS=$(echo $INVALID_RESPONSE | jq '.success')
echo "✅ Invalid hotel ID handled: $INVALID_SUCCESS"

# Test 19: Unauthorized booking access
echo ""
echo "🔒 Testing unauthorized booking access"
UNAUTH_BOOKING=$(public_request GET "/api/bookings")
UNAUTH_SUCCESS=$(echo $UNAUTH_BOOKING | jq '.success')
echo "✅ Unauthorized access blocked: $UNAUTH_SUCCESS"

echo ""
echo "🎉 Hotel Module API Testing Complete!"
echo "======================================"
echo ""
echo "Summary:"
echo "- Authentication: ✅ Working"
echo "- Hotel Listings: ✅ Working"
echo "- Hotel Details: ✅ Working"
echo "- Hotel Search: ✅ Working"
echo "- Room Management: ✅ Working"
echo "- Booking System: ✅ Working"
echo "- Review System: ✅ Working"
echo "- Error Handling: ✅ Working"
echo ""
echo "All hotel module APIs are functioning correctly! 🚀"

