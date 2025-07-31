const mongoose = require('mongoose');
const User = require('../models/User');
const Business = require('../models/Business');
const Hotel = require('../models/Hotel');
const Booking = require('../models/Booking');

const hotelSeeder = async () => {
  try {
    console.log('🏨 Starting hotel seeder...');

    // Clear existing data
    await User.deleteMany({});
    await Business.deleteMany({});
    await Hotel.deleteMany({});
    await Booking.deleteMany({});

    console.log('🧹 Cleared existing data');

    // Create a user (business owner)
    const user = await User.create({
      name: 'Taj Palace Owner',
      email: 'owner@tajpalace.com',
      password: 'hashedpassword123',
      role: 'business_owner',
      isVerified: true,
      profile: {
        phone: '+91 11 6651 2233',
        address: {
          street: '1, Mansingh Road',
          city: 'New Delhi',
          state: 'Delhi',
          zipCode: '110011',
          country: 'India'
        }
      }
    });

    console.log('👤 Created user:', user.name);

    // Create a business
    const business = await Business.create({
      name: 'Taj Palace Business',
      slug: 'taj-palace-business',
      description: 'Luxury hotel business offering world-class hospitality and accommodation services in the heart of New Delhi. Specializing in premium hotel experiences with traditional Indian hospitality and modern amenities.',
      owner: user._id,
      type: 'hotel',
      contact: {
        email: 'reservations@tajpalace.com',
        phone: '+91 11 6651 2233',
        website: 'https://www.tajpalace.com'
      },
      address: {
        street: '1, Mansingh Road, New Delhi',
        city: 'New Delhi',
        state: 'Delhi',
        zipCode: '110011',
        country: 'India'
      },
      isActive: true
    });

    console.log('🏢 Created business:', business.name);

    // Create a hotel with comprehensive data
    const hotel = await Hotel.create({
      business: business._id,
      name: 'Taj Palace',
      description: 'Legendary luxury hotel in the heart of New Delhi, offering world-class hospitality and royal elegance with a perfect blend of Indian traditions and contemporary luxury.',
      category: 'luxury',
      starRating: 5,
      images: [
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80',
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
      ],
      rooms: [{
        name: 'Luxury Palace Room',
        type: 'deluxe',
        description: 'Elegantly appointed room with city views and luxury amenities, featuring classic Taj hospitality',
        images: [
          'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
          'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
        ],
        capacity: {
          adults: 2,
          children: 0
        },
        bedConfiguration: {
          kingBeds: 1,
          queenBeds: 0,
          doubleBeds: 0,
          singleBeds: 0,
          sofaBeds: 0
        },
        size: {
          value: 50,
          unit: 'sqm'
        },
        amenities: ['City View', 'WiFi', 'AC', 'TV', 'Mini Bar', 'Room Service', 'Work Desk'],
        pricing: {
          basePrice: 12000,
          currency: 'INR',
          taxes: 0,
          serviceFee: 0,
          seasonalRates: []
        },
        availability: {
          totalRooms: 10,
          availableRooms: 8,
          blockedDates: []
        },
        policies: {
          checkIn: '3:00 PM',
          checkOut: '12:00 PM',
          cancellation: 'Free cancellation up to 24 hours before check-in',
          smoking: false,
          pets: false
        },
        isActive: true
      }],
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
      dining: [{
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
      }],
      amenities: {
        general: ['24/7 Concierge', 'Butler Service', 'Limousine Service', 'Personal Shopping', 'Valet Parking'],
        business: ['Business Center', 'Meeting Rooms', 'Conference Facilities', 'Secretarial Services', 'High-Speed Internet'],
        wellness: ['Luxury Spa', 'Fitness Center', 'Swimming Pool', 'Yoga Classes', 'Salon Services'],
        dining: ['Multiple Restaurants', 'Room Service', 'Private Dining', 'Wine Cellar', 'Specialty Bars'],
        entertainment: [],
        connectivity: ['WiFi', 'High-Speed Internet'],
        accessibility: []
      },
      policies: {
        checkIn: '3:00 PM',
        checkOut: '12:00 PM',
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
      location: {
        nearbyAttractions: [],
        transportation: []
      },
      analytics: {
        totalBookings: 150,
        totalRevenue: 2500000,
        averageRating: 4.8,
        occupancyRate: 75,
        averageDailyRate: 12000
      },
      isActive: true
    });

    console.log('🏨 Created hotel:', hotel.name);

    // Create sample bookings
    const bookings = await Booking.create([
      {
        business: business._id,
        customer: {
          name: 'John Smith',
          email: 'john.smith@email.com',
          phone: '+1 555 0123'
        },
        bookingType: 'hotel',
        hotelBooking: {
          hotel: hotel._id,
          room: hotel.rooms[0]._id,
          checkIn: new Date('2024-08-15'),
          checkOut: new Date('2024-08-18'),
          guests: {
            adults: 2,
            children: 0
          },
          roomRate: 12000,
          totalNights: 3
        },
        totalAmount: 36000,
        status: 'confirmed',
        paymentStatus: 'paid'
      },
      {
        business: business._id,
        customer: {
          name: 'Sarah Johnson',
          email: 'sarah.johnson@email.com',
          phone: '+1 555 0456'
        },
        bookingType: 'hotel',
        hotelBooking: {
          hotel: hotel._id,
          room: hotel.rooms[0]._id,
          checkIn: new Date('2024-09-01'),
          checkOut: new Date('2024-09-05'),
          guests: {
            adults: 2,
            children: 1
          },
          roomRate: 12000,
          totalNights: 4
        },
        totalAmount: 48000,
        status: 'confirmed',
        paymentStatus: 'paid'
      },
      {
        business: business._id,
        customer: {
          name: 'Michael Brown',
          email: 'michael.brown@email.com',
          phone: '+1 555 0789'
        },
        bookingType: 'hotel',
        hotelBooking: {
          hotel: hotel._id,
          room: hotel.rooms[0]._id,
          checkIn: new Date('2024-10-10'),
          checkOut: new Date('2024-10-12'),
          guests: {
            adults: 1,
            children: 0
          },
          roomRate: 12000,
          totalNights: 2
        },
        totalAmount: 24000,
        status: 'pending',
        paymentStatus: 'pending'
      },
      {
        business: business._id,
        customer: {
          name: 'Emily Davis',
          email: 'emily.davis@email.com',
          phone: '+1 555 0321'
        },
        bookingType: 'hotel',
        hotelBooking: {
          hotel: hotel._id,
          room: hotel.rooms[0]._id,
          checkIn: new Date('2024-11-20'),
          checkOut: new Date('2024-11-25'),
          guests: {
            adults: 2,
            children: 2
          },
          roomRate: 12000,
          totalNights: 5
        },
        totalAmount: 60000,
        status: 'confirmed',
        paymentStatus: 'paid'
      }
    ]);

    console.log(`📋 Created ${bookings.length} sample bookings`);

    console.log('\n✅ Hotel seeding completed successfully!');
    console.log(`📊 Summary:`);
    console.log(`   - Users: 1`);
    console.log(`   - Businesses: 1`);
    console.log(`   - Hotels: 1`);
    console.log(`   - Rooms: 1`);
    console.log(`   - Bookings: ${bookings.length}`);

    return {
      user,
      business,
      hotel,
      bookings
    };

  } catch (error) {
    console.error('❌ Error seeding hotel data:', error);
    throw error;
  }
};

module.exports = hotelSeeder;
