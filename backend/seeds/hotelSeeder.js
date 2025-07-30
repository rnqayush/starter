const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

// Import models
const Hotel = require('../models/Hotel');
const Business = require('../models/Business');
const User = require('../models/User');
const Booking = require('../models/Booking');

// Import database connection
const connectDB = require('../config/database');

// Load hotel data from frontend
const hotelDataPath = path.join(__dirname, '../../frontend/src/DummyData/hotels.json');
const hotelData = JSON.parse(fs.readFileSync(hotelDataPath, 'utf8'));

/**
 * Transform frontend hotel data to backend schema
 */
const transformHotelData = (frontendHotel, businessId) => {
  const hotel = frontendHotel.hotel;
  
  return {
    business: businessId,
    name: hotel.name,
    description: hotel.description,
    category: 'luxury', // Based on 5-star rating
    starRating: hotel.starRating,
    images: hotel.images || [hotel.image],
    
    // Transform rooms data
    rooms: hotel.rooms ? hotel.rooms.map(room => {
      // Map room type to valid enum values
      let roomType = 'deluxe'; // default
      const type = room.type.toLowerCase();
      if (type.includes('suite')) roomType = 'suite';
      else if (type.includes('deluxe')) roomType = 'deluxe';
      else if (type.includes('single')) roomType = 'single';
      else if (type.includes('double')) roomType = 'double';
      else if (type.includes('family')) roomType = 'family';
      else if (type.includes('presidential')) roomType = 'presidential';
      else if (type.includes('twin')) roomType = 'twin';
      
      return {
        name: room.name,
        type: roomType,
        description: room.description,
        images: room.images || [],
        capacity: {
          adults: room.maxGuests || 2,
          children: 0
        },
        bedConfiguration: {
          kingBeds: room.bedType === 'King Size' ? 1 : 0,
          queenBeds: room.bedType === 'Queen Size' ? 1 : 0,
          doubleBeds: room.bedType === 'Double' ? 1 : 0,
          singleBeds: room.bedType === 'Single' ? 1 : 0
        },
        size: {
          value: parseInt(room.area) || 50,
          unit: 'sqm'
        },
        amenities: room.amenities || [],
        pricing: {
          basePrice: room.price || hotel.startingPrice,
          currency: 'INR',
          taxes: 0,
          serviceFee: 0
        },
        availability: {
          totalRooms: 10, // Default value
          availableRooms: 8 // Default available
        },
        policies: {
          checkIn: hotel.checkInTime || '15:00',
          checkOut: hotel.checkOutTime || '11:00',
          cancellation: 'Free cancellation up to 24 hours before check-in',
          smoking: false,
          pets: false
        },
        isActive: room.available !== false
      };
    }) : [],
    
    // Transform amenities
    amenities: {
      general: extractAmenities(hotel.sections?.amenities, 'general'),
      business: extractAmenities(hotel.sections?.amenities, 'business'),
      wellness: extractAmenities(hotel.sections?.amenities, 'wellness'),
      dining: extractAmenities(hotel.sections?.amenities, 'dining'),
      entertainment: [],
      connectivity: ['WiFi', 'High-Speed Internet'],
      accessibility: []
    },
    
    // Services
    services: [
      {
        name: 'Concierge Service',
        description: '24/7 concierge assistance',
        price: 0,
        isActive: true
      },
      {
        name: 'Room Service',
        description: '24-hour room service',
        price: 0,
        isActive: true
      }
    ],
    
    // Dining options
    dining: [
      {
        name: 'Main Restaurant',
        type: 'restaurant',
        cuisine: 'Multi-cuisine',
        description: 'Fine dining restaurant with international cuisine',
        hours: {
          open: '07:00',
          close: '23:00'
        },
        images: [],
        isActive: true
      }
    ],
    
    // Policies
    policies: {
      checkIn: hotel.checkInTime || '15:00',
      checkOut: hotel.checkOutTime || '12:00',
      cancellation: 'Free cancellation up to 24 hours before check-in',
      children: 'Children are welcome',
      pets: {
        allowed: false,
        fee: 0,
        restrictions: 'Pets not allowed'
      },
      smoking: false,
      ageRestriction: {
        minimum: 18
      }
    },
    
    // Location data
    location: {},
    
    // Reviews (transform testimonials)
    reviews: hotel.sections?.testimonials?.reviews ? hotel.sections.testimonials.reviews.map(review => ({
      rating: review.rating,
      title: `Review by ${review.guestName}`,
      comment: review.comment,
      images: [],
      helpful: 0,
      createdAt: new Date(review.date)
    })) : [],
    
    // Analytics
    analytics: {
      totalBookings: 150,
      totalRevenue: 2500000,
      averageRating: hotel.rating,
      occupancyRate: 75,
      averageDailyRate: hotel.startingPrice
    },
    
    isActive: true
  };
};

/**
 * Extract amenities by category
 */
const extractAmenities = (amenitiesSection, category) => {
  if (!amenitiesSection?.categories) return [];
  
  const categoryMap = {
    general: ['Luxury Services'],
    business: ['Business'],
    wellness: ['Wellness'],
    dining: ['Dining']
  };
  
  const targetCategories = categoryMap[category] || [];
  const amenities = [];
  
  amenitiesSection.categories.forEach(cat => {
    if (targetCategories.includes(cat.title)) {
      amenities.push(...cat.items);
    }
  });
  
  return amenities;
};

/**
 * Create business data from hotel information
 */
const createBusinessData = (hotel, ownerId) => {
  return {
    name: `${hotel.name} Business`,
    slug: hotel.slug + '-business',
    description: `Business entity for ${hotel.name}`,
    type: 'hotel',
    owner: ownerId,
    logo: hotel.image,
    coverImage: hotel.images?.[0] || hotel.image,
    images: hotel.images || [hotel.image],
    contact: {
      email: hotel.email,
      phone: hotel.phone,
      website: hotel.website ? (hotel.website.startsWith('http') ? hotel.website : `https://${hotel.website}`) : undefined
    },
    address: {
      street: hotel.address,
      city: hotel.city,
      state: 'Delhi',
      country: 'India',
      zipCode: hotel.pincode
    },
    socialMedia: hotel.sections?.footer?.socialLinks ? {
      facebook: hotel.sections.footer.socialLinks.find(s => s.platform === 'Facebook')?.url,
      twitter: hotel.sections.footer.socialLinks.find(s => s.platform === 'Twitter')?.url,
      instagram: hotel.sections.footer.socialLinks.find(s => s.platform === 'Instagram')?.url,
      linkedin: hotel.sections.footer.socialLinks.find(s => s.platform === 'LinkedIn')?.url
    } : {},
    businessHours: {
      monday: { open: '00:00', close: '23:59', closed: false },
      tuesday: { open: '00:00', close: '23:59', closed: false },
      wednesday: { open: '00:00', close: '23:59', closed: false },
      thursday: { open: '00:00', close: '23:59', closed: false },
      friday: { open: '00:00', close: '23:59', closed: false },
      saturday: { open: '00:00', close: '23:59', closed: false },
      sunday: { open: '00:00', close: '23:59', closed: false }
    },
    isActive: true,
    isVerified: true
  };
};

/**
 * Create default user for hotel owner
 */
const createDefaultUser = () => {
  return {
    name: 'Hotel Owner',
    email: 'owner@tajpalace.com',
    password: 'password123', // This will be hashed by the model
    role: 'business_owner',
    isActive: true,
    isEmailVerified: true,
    profile: {
      firstName: 'Hotel',
      lastName: 'Owner',
      phone: '+91 11 6651 2233',
      address: {
        street: '1, Mansingh Road',
        city: 'New Delhi',
        state: 'Delhi',
        country: 'India',
        zipCode: '110011'
      }
    }
  };
};

/**
 * Transform booking data
 */
const transformBookings = (bookings, hotelId, userId, businessId) => {
  return bookings.map((booking, index) => {
    const checkInDate = new Date(booking.checkIn);
    const checkOutDate = new Date(booking.checkOut);
    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    
    return {
      bookingNumber: `HTL-${Date.now()}-${index + 1}`,
      business: businessId,
      hotel: hotelId,
      bookingType: 'hotel',
      customer: userId,
      guestDetails: {
        primaryGuest: {
          name: booking.guestName,
          email: booking.guestEmail,
          phone: booking.guestPhone
        },
        additionalGuests: [],
        totalGuests: {
          adults: booking.guests,
          children: 0
        },
        specialRequests: booking.specialRequests
      },
      roomDetails: {
        room: null, // Will be set after hotel creation
        roomType: booking.roomName,
        roomNumber: `${Math.floor(Math.random() * 900) + 100}`,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        nights: nights,
        roomsBooked: 1
      },
      pricing: {
        baseAmount: booking.totalPrice,
        taxes: 0,
        serviceFees: 0,
        discounts: 0,
        totalAmount: booking.totalPrice,
        currency: 'INR'
      },
      payment: {
        status: 'paid',
        method: 'credit_card',
        paidAmount: booking.totalPrice,
        paymentDate: new Date(booking.bookingDate)
      },
      status: booking.status,
      cancellation: {
        isCancelled: false
      },
      createdAt: new Date(booking.bookingDate)
    };
  });
};

/**
 * Seed the database
 */
const seedDatabase = async () => {
  try {
    console.log('🌱 Starting hotel database seeding...');
    
    // Connect to database
    await connectDB();
    
    // Clear existing data
    console.log('🧹 Clearing existing data...');
    await Hotel.deleteMany({});
    await Business.deleteMany({});
    await User.deleteMany({});
    await Booking.deleteMany({});
    
    // Create default user
    console.log('👤 Creating default user...');
    const userData = createDefaultUser();
    const user = await User.create(userData);
    console.log(`✅ User created: ${user.email}`);
    
    // Create business
    console.log('🏢 Creating business...');
    const businessData = createBusinessData(hotelData.data.hotel, user._id);
    const business = await Business.create(businessData);
    console.log(`✅ Business created: ${business.name}`);
    
    // Create hotel
    console.log('🏨 Creating hotel...');
    const hotelTransformed = transformHotelData(hotelData.data, business._id);
    const hotel = await Hotel.create(hotelTransformed);
    console.log(`✅ Hotel created: ${hotel.name}`);
    
    // Create bookings
    console.log('📅 Creating bookings...');
    const bookingsData = transformBookings(hotelData.data.bookings, hotel._id, user._id, business._id);
    
    // Set room IDs for bookings
    bookingsData.forEach(booking => {
      if (hotel.rooms.length > 0) {
        booking.roomDetails.room = hotel.rooms[0]._id;
      }
    });
    
    const bookings = await Booking.insertMany(bookingsData);
    console.log(`✅ Created ${bookings.length} bookings`);
    
    // Update business with hotel reference
    business.hotels = [hotel._id];
    await business.save();
    
    console.log('🎉 Database seeding completed successfully!');
    console.log(`📊 Summary:`);
    console.log(`   - Users: 1`);
    console.log(`   - Businesses: 1`);
    console.log(`   - Hotels: 1`);
    console.log(`   - Rooms: ${hotel.rooms.length}`);
    console.log(`   - Bookings: ${bookings.length}`);
    
    return {
      user,
      business,
      hotel,
      bookings
    };
    
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    throw error;
  }
};

/**
 * Clear database
 */
const clearDatabase = async () => {
  try {
    console.log('🧹 Clearing database...');
    
    await connectDB();
    
    await Hotel.deleteMany({});
    await Business.deleteMany({});
    await User.deleteMany({});
    await Booking.deleteMany({});
    
    console.log('✅ Database cleared successfully!');
  } catch (error) {
    console.error('❌ Database clearing failed:', error);
    throw error;
  }
};

// CLI interface
const command = process.argv[2];

if (command === 'seed') {
  seedDatabase()
    .then(() => {
      console.log('🏁 Seeding process completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Seeding process failed:', error);
      process.exit(1);
    });
} else if (command === 'clear') {
  clearDatabase()
    .then(() => {
      console.log('🏁 Clearing process completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Clearing process failed:', error);
      process.exit(1);
    });
} else {
  console.log('Usage: node hotelSeeder.js [seed|clear]');
  process.exit(1);
}

module.exports = {
  seedDatabase,
  clearDatabase,
  transformHotelData,
  createBusinessData,
  createDefaultUser
};
