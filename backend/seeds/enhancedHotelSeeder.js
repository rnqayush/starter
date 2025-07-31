const mongoose = require('mongoose');
const User = require('../models/User');
const Business = require('../models/Business');
const Hotel = require('../models/Hotel');
const Booking = require('../models/Booking');

const enhancedHotelSeeder = async () => {
  try {
    console.log('🏨 Starting enhanced hotel seeder...');

    // Clear existing data
    await User.deleteMany({});
    await Business.deleteMany({});
    await Hotel.deleteMany({});
    await Booking.deleteMany({});

    console.log('🧹 Cleared existing data');

    // Create multiple users (business owners)
    const users = await User.create([
      {
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
      },
      {
        name: 'Oberoi Hotels Owner',
        email: 'owner@oberoi.com',
        password: 'hashedpassword123',
        role: 'business_owner',
        isVerified: true,
        profile: {
          phone: '+91 22 6632 5757',
          address: {
            street: 'Nariman Point',
            city: 'Mumbai',
            state: 'Maharashtra',
            zipCode: '400021',
            country: 'India'
          }
        }
      },
      {
        name: 'Leela Palace Owner',
        email: 'owner@leela.com',
        password: 'hashedpassword123',
        role: 'business_owner',
        isVerified: true,
        profile: {
          phone: '+91 80 2521 1234',
          address: {
            street: 'HAL Airport Road',
            city: 'Bangalore',
            state: 'Karnataka',
            zipCode: '560008',
            country: 'India'
          }
        }
      }
    ]);

    console.log(`👥 Created ${users.length} users`);

    // Create businesses
    const businesses = await Business.create([
      {
        name: 'Taj Palace Business',
        slug: 'taj-palace-business',
        description: 'Luxury hotel business offering world-class hospitality and accommodation services in the heart of New Delhi. Specializing in premium hotel experiences with traditional Indian hospitality and modern amenities.',
        owner: users[0]._id,
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
      },
      {
        name: 'The Oberoi Business',
        slug: 'oberoi-business',
        description: 'Premium luxury hotel chain known for exceptional service and elegant accommodations. Offering sophisticated hospitality experiences across major Indian cities.',
        owner: users[1]._id,
        type: 'hotel',
        contact: {
          email: 'reservations@oberoi.com',
          phone: '+91 22 6632 5757',
          website: 'https://www.oberoi.com'
        },
        address: {
          street: 'Nariman Point',
          city: 'Mumbai',
          state: 'Maharashtra',
          zipCode: '400021',
          country: 'India'
        },
        isActive: true
      },
      {
        name: 'The Leela Palace Business',
        slug: 'leela-palace-business',
        description: 'Royal luxury hotel brand offering palatial accommodations and world-class amenities. Known for opulent interiors and personalized service.',
        owner: users[2]._id,
        type: 'hotel',
        contact: {
          email: 'reservations@leela.com',
          phone: '+91 80 2521 1234',
          website: 'https://www.leela.com'
        },
        address: {
          street: 'HAL Airport Road',
          city: 'Bangalore',
          state: 'Karnataka',
          zipCode: '560008',
          country: 'India'
        },
        isActive: true
      }
    ]);

    console.log(`🏢 Created ${businesses.length} businesses`);

    // Create hotels with diverse data
    const hotels = await Hotel.create([
      {
        business: businesses[0]._id,
        name: 'Taj Palace New Delhi',
        description: 'Legendary luxury hotel in the heart of New Delhi, offering world-class hospitality and royal elegance with a perfect blend of Indian traditions and contemporary luxury.',
        category: 'luxury',
        starRating: 5,
        images: [
          'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1632&q=80',
          'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
        ],
        rooms: [
          {
            name: 'Luxury Palace Room',
            type: 'deluxe',
            description: 'Elegantly appointed room with city views and luxury amenities',
            images: ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'],
            capacity: { adults: 2, children: 1 },
            bedConfiguration: { kingBeds: 1, queenBeds: 0, doubleBeds: 0, singleBeds: 0, sofaBeds: 0 },
            size: { value: 50, unit: 'sqm' },
            amenities: ['City View', 'WiFi', 'AC', 'TV', 'Mini Bar', 'Room Service'],
            pricing: { basePrice: 12000, currency: 'INR', taxes: 0, serviceFee: 0, seasonalRates: [] },
            availability: { totalRooms: 10, availableRooms: 8, blockedDates: [] },
            policies: { checkIn: '3:00 PM', checkOut: '12:00 PM', cancellation: 'Free cancellation up to 24 hours', smoking: false, pets: false },
            isActive: true
          },
          {
            name: 'Executive Suite',
            type: 'suite',
            description: 'Spacious suite with separate living area and premium amenities',
            images: ['https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'],
            capacity: { adults: 3, children: 2 },
            bedConfiguration: { kingBeds: 1, queenBeds: 0, doubleBeds: 0, singleBeds: 1, sofaBeds: 1 },
            size: { value: 85, unit: 'sqm' },
            amenities: ['City View', 'WiFi', 'AC', 'TV', 'Mini Bar', 'Room Service', 'Butler Service'],
            pricing: { basePrice: 25000, currency: 'INR', taxes: 0, serviceFee: 0, seasonalRates: [] },
            availability: { totalRooms: 5, availableRooms: 4, blockedDates: [] },
            policies: { checkIn: '3:00 PM', checkOut: '12:00 PM', cancellation: 'Free cancellation up to 24 hours', smoking: false, pets: false },
            isActive: true
          }
        ],
        services: [
          { name: 'Concierge Service', description: '24/7 concierge assistance', price: 0, isActive: true },
          { name: 'Room Service', description: '24-hour room service', price: 0, isActive: true },
          { name: 'Spa Services', description: 'Full-service spa treatments', price: 5000, isActive: true }
        ],
        dining: [
          {
            name: 'Wasabi by Morimoto',
            type: 'restaurant',
            cuisine: 'Japanese',
            description: 'Award-winning Japanese restaurant',
            hours: { open: '19:00', close: '23:30' },
            images: [],
            isActive: true
          }
        ],
        amenities: {
          general: ['24/7 Concierge', 'Butler Service', 'Limousine Service', 'Valet Parking'],
          business: ['Business Center', 'Meeting Rooms', 'Conference Facilities'],
          wellness: ['Luxury Spa', 'Fitness Center', 'Swimming Pool'],
          dining: ['Multiple Restaurants', 'Room Service', 'Private Dining'],
          entertainment: ['Live Music', 'Cultural Shows'],
          connectivity: ['WiFi', 'High-Speed Internet'],
          accessibility: ['Wheelchair Access', 'Braille Signage']
        },
        policies: {
          checkIn: '3:00 PM',
          checkOut: '12:00 PM',
          cancellation: 'Free cancellation up to 24 hours before check-in',
          children: 'Children are welcome',
          pets: { allowed: false, fee: 0, restrictions: 'Pets not allowed' },
          smoking: false,
          ageRestriction: { minimum: 18 }
        },
        location: {
          nearbyAttractions: ['India Gate', 'Red Fort', 'Lotus Temple'],
          transportation: ['Metro Station - 2km', 'Airport - 15km']
        },
        analytics: {
          totalBookings: 250,
          totalRevenue: 4500000,
          averageRating: 4.8,
          occupancyRate: 85,
          averageDailyRate: 15000
        },
        isActive: true
      },
      {
        business: businesses[1]._id,
        name: 'The Oberoi Mumbai',
        description: 'Sophisticated luxury hotel overlooking the Arabian Sea, offering contemporary elegance and impeccable service in the heart of Mumbai\'s business district.',
        category: 'luxury',
        starRating: 5,
        images: [
          'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
        ],
        rooms: [
          {
            name: 'Ocean View Room',
            type: 'deluxe',
            description: 'Elegant room with panoramic views of the Arabian Sea',
            images: ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'],
            capacity: { adults: 2, children: 1 },
            bedConfiguration: { kingBeds: 1, queenBeds: 0, doubleBeds: 0, singleBeds: 0, sofaBeds: 0 },
            size: { value: 45, unit: 'sqm' },
            amenities: ['Ocean View', 'WiFi', 'AC', 'TV', 'Mini Bar', 'Room Service'],
            pricing: { basePrice: 18000, currency: 'INR', taxes: 0, serviceFee: 0, seasonalRates: [] },
            availability: { totalRooms: 12, availableRooms: 10, blockedDates: [] },
            policies: { checkIn: '3:00 PM', checkOut: '12:00 PM', cancellation: 'Free cancellation up to 24 hours', smoking: false, pets: false },
            isActive: true
          }
        ],
        services: [
          { name: 'Concierge Service', description: '24/7 concierge assistance', price: 0, isActive: true },
          { name: 'Business Services', description: 'Full business center facilities', price: 0, isActive: true }
        ],
        dining: [
          {
            name: 'Fenix',
            type: 'restaurant',
            cuisine: 'European',
            description: 'Contemporary European cuisine with ocean views',
            hours: { open: '19:00', close: '23:30' },
            images: [],
            isActive: true
          }
        ],
        amenities: {
          general: ['24/7 Concierge', 'Valet Parking', 'Airport Transfer'],
          business: ['Business Center', 'Meeting Rooms'],
          wellness: ['Spa', 'Fitness Center', 'Swimming Pool'],
          dining: ['Fine Dining Restaurant', 'Room Service'],
          entertainment: [],
          connectivity: ['WiFi', 'High-Speed Internet'],
          accessibility: ['Wheelchair Access']
        },
        policies: {
          checkIn: '3:00 PM',
          checkOut: '12:00 PM',
          cancellation: 'Free cancellation up to 24 hours before check-in',
          children: 'Children are welcome',
          pets: { allowed: false, fee: 0, restrictions: 'Pets not allowed' },
          smoking: false,
          ageRestriction: { minimum: 18 }
        },
        location: {
          nearbyAttractions: ['Gateway of India', 'Marine Drive', 'Colaba Causeway'],
          transportation: ['Airport - 25km', 'Railway Station - 5km']
        },
        analytics: {
          totalBookings: 180,
          totalRevenue: 3200000,
          averageRating: 4.7,
          occupancyRate: 78,
          averageDailyRate: 18000
        },
        isActive: true
      },
      {
        business: businesses[2]._id,
        name: 'The Leela Palace Bangalore',
        description: 'Royal palace hotel offering opulent accommodations and world-class amenities in the Garden City of India.',
        category: 'luxury',
        starRating: 5,
        images: [
          'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
        ],
        rooms: [
          {
            name: 'Royal Club Room',
            type: 'deluxe',
            description: 'Luxurious room with garden views and royal amenities',
            images: ['https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'],
            capacity: { adults: 2, children: 1 },
            bedConfiguration: { kingBeds: 1, queenBeds: 0, doubleBeds: 0, singleBeds: 0, sofaBeds: 0 },
            size: { value: 55, unit: 'sqm' },
            amenities: ['Garden View', 'WiFi', 'AC', 'TV', 'Mini Bar', 'Room Service', 'Club Lounge Access'],
            pricing: { basePrice: 15000, currency: 'INR', taxes: 0, serviceFee: 0, seasonalRates: [] },
            availability: { totalRooms: 8, availableRooms: 6, blockedDates: [] },
            policies: { checkIn: '3:00 PM', checkOut: '12:00 PM', cancellation: 'Free cancellation up to 24 hours', smoking: false, pets: false },
            isActive: true
          }
        ],
        services: [
          { name: 'Royal Butler Service', description: 'Personalized butler service', price: 0, isActive: true },
          { name: 'Spa Services', description: 'Traditional Ayurvedic treatments', price: 4000, isActive: true }
        ],
        dining: [
          {
            name: 'Jamavar',
            type: 'restaurant',
            cuisine: 'Indian',
            description: 'Authentic Indian cuisine in royal setting',
            hours: { open: '19:00', close: '23:30' },
            images: [],
            isActive: true
          }
        ],
        amenities: {
          general: ['24/7 Concierge', 'Butler Service', 'Royal Treatment'],
          business: ['Business Center', 'Meeting Rooms'],
          wellness: ['Ayurvedic Spa', 'Fitness Center', 'Swimming Pool', 'Yoga Classes'],
          dining: ['Indian Restaurant', 'Room Service'],
          entertainment: ['Cultural Performances'],
          connectivity: ['WiFi', 'High-Speed Internet'],
          accessibility: ['Wheelchair Access']
        },
        policies: {
          checkIn: '3:00 PM',
          checkOut: '12:00 PM',
          cancellation: 'Free cancellation up to 24 hours before check-in',
          children: 'Children are welcome',
          pets: { allowed: false, fee: 0, restrictions: 'Pets not allowed' },
          smoking: false,
          ageRestriction: { minimum: 18 }
        },
        location: {
          nearbyAttractions: ['Lalbagh Botanical Garden', 'Bangalore Palace', 'UB City Mall'],
          transportation: ['Airport - 8km', 'City Center - 12km']
        },
        analytics: {
          totalBookings: 200,
          totalRevenue: 3800000,
          averageRating: 4.9,
          occupancyRate: 82,
          averageDailyRate: 16000
        },
        isActive: true
      }
    ]);

    console.log(`🏨 Created ${hotels.length} hotels`);

    // Create diverse bookings
    const bookings = [];
    const customerNames = [
      'John Smith', 'Sarah Johnson', 'Michael Brown', 'Emily Davis',
      'David Wilson', 'Lisa Anderson', 'Robert Taylor', 'Jennifer Martinez',
      'William Garcia', 'Jessica Rodriguez', 'James Lopez', 'Ashley Lee'
    ];

    const statuses = ['confirmed', 'pending', 'cancelled'];
    const paymentStatuses = ['paid', 'pending', 'failed'];

    // Generate bookings for each hotel
    for (let hotelIndex = 0; hotelIndex < hotels.length; hotelIndex++) {
      const hotel = hotels[hotelIndex];
      const bookingCount = 8 + Math.floor(Math.random() * 5); // 8-12 bookings per hotel

      for (let i = 0; i < bookingCount; i++) {
        const customerIndex = Math.floor(Math.random() * customerNames.length);
        const roomIndex = Math.floor(Math.random() * hotel.rooms.length);
        const room = hotel.rooms[roomIndex];
        
        const checkInDate = new Date();
        checkInDate.setDate(checkInDate.getDate() + Math.floor(Math.random() * 60) + 1); // 1-60 days from now
        
        const nights = Math.floor(Math.random() * 5) + 1; // 1-5 nights
        const checkOutDate = new Date(checkInDate);
        checkOutDate.setDate(checkOutDate.getDate() + nights);

        const adults = Math.floor(Math.random() * 3) + 1; // 1-3 adults
        const children = Math.floor(Math.random() * 2); // 0-1 children

        const totalAmount = room.pricing.basePrice * nights;
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const paymentStatus = status === 'confirmed' ? 'paid' : paymentStatuses[Math.floor(Math.random() * paymentStatuses.length)];

        bookings.push({
          business: hotel.business,
          customer: {
            name: customerNames[customerIndex],
            email: `${customerNames[customerIndex].toLowerCase().replace(' ', '.')}@email.com`,
            phone: `+1 555 ${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`
          },
          bookingType: 'hotel',
          hotelBooking: {
            hotel: hotel._id,
            room: room._id,
            checkIn: checkInDate,
            checkOut: checkOutDate,
            guests: { adults, children },
            roomRate: room.pricing.basePrice,
            totalNights: nights
          },
          totalAmount,
          status,
          paymentStatus
        });
      }
    }

    const createdBookings = await Booking.create(bookings);
    console.log(`📋 Created ${createdBookings.length} sample bookings`);

    console.log('\n✅ Enhanced hotel seeding completed successfully!');
    console.log(`📊 Summary:`);
    console.log(`   - Users: ${users.length}`);
    console.log(`   - Businesses: ${businesses.length}`);
    console.log(`   - Hotels: ${hotels.length}`);
    console.log(`   - Total Rooms: ${hotels.reduce((sum, hotel) => sum + hotel.rooms.length, 0)}`);
    console.log(`   - Bookings: ${createdBookings.length}`);

    return {
      users,
      businesses,
      hotels,
      bookings: createdBookings
    };

  } catch (error) {
    console.error('❌ Error seeding enhanced hotel data:', error);
    throw error;
  }
};

module.exports = enhancedHotelSeeder;

