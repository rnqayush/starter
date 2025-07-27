// Single comprehensive hotel data object for the entire application
export const hotelData = {
  hotels: [
    {
      id: 4,
      name: 'Taj Palace',
      slug: 'taj-palace',
      location: 'New Delhi, Delhi',
      address: '1, Mansingh Road, New Delhi',
      city: 'New Delhi',
      pincode: '110011',
      phone: '+91 11 6651 2233',
      email: 'reservations@tajpalace.com',
      description:
        'Legendary luxury hotel in the heart of New Delhi, offering world-class hospitality and royal elegance.',
      rating: 4.8,
      starRating: 5,
      image:
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80',
      images: [
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80',
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      ],
      gallery: [
        {
          title: 'Grand Entrance',
          image:
            'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3',
        },
        {
          title: 'Luxury Suites',
          image:
            'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3',
        },
        {
          title: 'Fine Dining',
          image:
            'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3',
        },
      ],
      amenities: [
        'WiFi',
        'Pool',
        'Spa',
        'Gym',
        'Restaurant',
        'Parking',
        'AC',
        'Concierge',
        'Business Center',
      ],
      amenityCategories: [
        {
          title: 'Luxury Services',
          items: [
            '24/7 Concierge',
            'Butler Service',
            'Limousine Service',
            'Personal Shopping',
          ],
        },
        {
          title: 'Wellness',
          items: [
            'Luxury Spa',
            'Fitness Center',
            'Swimming Pool',
            'Yoga Classes',
          ],
        },
        {
          title: 'Business',
          items: [
            'Business Center',
            'Meeting Rooms',
            'Conference Facilities',
            'Secretarial Services',
          ],
        },
        {
          title: 'Dining',
          items: [
            'Multiple Restaurants',
            'Room Service',
            'Private Dining',
            'Wine Cellar',
          ],
        },
      ],
      checkInTime: '3:00 PM',
      checkOutTime: '12:00 PM',
      policies: ['Valid ID required', 'No smoking', 'Advance payment required'],
      startingPrice: 12000,
      features: [
        {
          title: 'Legendary Service',
          description:
            'Experience the renowned Taj hospitality with personalized service and attention to detail.',
        },
        {
          title: 'Prime Location',
          description:
            'Located in the heart of New Delhi with easy access to business districts and attractions.',
        },
        {
          title: 'World-Class Dining',
          description:
            'Multiple award-winning restaurants serving global cuisines and signature dishes.',
        },
        {
          title: 'Luxury Spa',
          description:
            'Rejuvenate at our luxury spa with traditional and modern wellness treatments.',
        },
      ],
      reviews: [
        {
          id: 1,
          guestName: 'Vikram Agarwal',
          rating: 5,
          date: '2024-01-16',
          comment:
            'Exceptional service as always! The Taj never disappoints. Perfect location for business meetings and the spa is world-class.',
          roomType: 'Luxury Palace Room',
          verified: true,
        },
        {
          id: 2,
          guestName: 'Jennifer Brown',
          rating: 5,
          date: '2024-01-11',
          comment:
            'Absolutely stunning hotel! The presidential suite was beyond our expectations. The staff made our anniversary celebration truly special.',
          roomType: 'Presidential Suite',
          verified: true,
        },
        {
          id: 3,
          guestName: 'Rahul Kapoor',
          rating: 4,
          date: '2024-01-06',
          comment:
            'Great hotel with excellent facilities. The business center was very helpful and the restaurants are top-notch.',
          roomType: 'Luxury Palace Room',
          verified: true,
        },
      ],
      contactFields: [
        { label: 'Address', value: '1, Mansingh Road, New Delhi' },
        { label: 'Phone', value: '+91 11 6651 2233' },
        { label: 'Email', value: 'reservations@tajpalace.com' },
        { label: 'Check-in / Check-out', value: '3:00 PM / 12:00 PM' },
      ],
      rooms: [
        {
          id: 401,
          name: 'Luxury Palace Room',
          type: 'Luxury',
          price: 12000,
          maxGuests: 2,
          bedType: 'King Size',
          description:
            'Elegantly appointed room with city views and luxury amenities, featuring classic Taj hospitality',
          images: [
            'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
          ],
          amenities: [
            'City View',
            'WiFi',
            'AC',
            'TV',
            'Mini Bar',
            'Room Service',
            'Work Desk',
          ],
          reviews: [
            {
              id: 1,
              guestName: 'Sanjay Gupta',
              rating: 5,
              date: '2024-01-30',
              comment:
                'Perfect for business travelers! The room was spacious, well-appointed, and the city views were beautiful. Excellent service throughout.',
              verified: true,
            },
            {
              id: 2,
              guestName: 'Maria Garcia',
              rating: 4,
              date: '2024-01-26',
              comment:
                'Lovely room with great amenities. The bed was extremely comfortable and the minibar was well-stocked. Great value for luxury.',
              verified: true,
            },
          ],
        },
      ],
    },
  ],
  bookings: [
    {
      id: 1,
      userId: 'user123',
      hotelId: 1,
      roomId: 101,
      hotelName: 'Grand Luxury Resort',
      roomName: 'Deluxe Ocean View',
      checkIn: '2024-02-15',
      checkOut: '2024-02-18',
      guests: 2,
      totalPrice: 25500,
      status: 'confirmed',
      bookingDate: '2024-01-20',
      guestName: 'John Doe',
      guestEmail: 'john@example.com',
      guestPhone: '+91 9876543210',
      specialRequests: 'Late check-in requested',
    },
    {
      id: 2,
      userId: 'user123',
      hotelId: 2,
      roomId: 201,
      hotelName: 'Mountain View Lodge',
      roomName: 'Mountain View Double',
      checkIn: '2024-03-10',
      checkOut: '2024-03-12',
      guests: 2,
      totalPrice: 7000,
      status: 'pending',
      bookingDate: '2024-01-25',
      guestName: 'Jane Smith',
      guestEmail: 'jane@example.com',
      guestPhone: '+91 9876543211',
      specialRequests: '',
    },
    {
      id: 3,
      userId: 'user456',
      hotelId: 3,
      roomId: 301,
      hotelName: 'Heritage Palace Hotel',
      roomName: 'Royal Heritage Room',
      checkIn: '2024-03-20',
      checkOut: '2024-03-23',
      guests: 2,
      totalPrice: 19500,
      status: 'confirmed',
      bookingDate: '2024-01-28',
      guestName: 'Kavya Mehta',
      guestEmail: 'kavya@example.com',
      guestPhone: '+91 9876543212',
      specialRequests: 'Anniversary celebration',
    },
    {
      id: 4,
      userId: 'user789',
      hotelId: 4,
      roomId: 402,
      hotelName: 'Taj Palace',
      roomName: 'Presidential Suite',
      checkIn: '2024-04-05',
      checkOut: '2024-04-08',
      guests: 4,
      totalPrice: 75000,
      status: 'confirmed',
      bookingDate: '2024-02-01',
      guestName: 'Jennifer Brown',
      guestEmail: 'jennifer@example.com',
      guestPhone: '+91 9876543213',
      specialRequests: 'Butler service required',
    },
  ],
  amenitiesList: [
    { id: 'wifi', name: 'WiFi', icon: '📶' },
    { id: 'ac', name: 'Air Conditioning', icon: '❄️' },
    { id: 'pool', name: 'Swimming Pool', icon: '🏊' },
    { id: 'spa', name: 'Spa', icon: '🧖' },
    { id: 'gym', name: 'Fitness Center', icon: '💪' },
    { id: 'restaurant', name: 'Restaurant', icon: '🍽️' },
    { id: 'parking', name: 'Parking', icon: '🚗' },
    { id: 'pet', name: 'Pet Friendly', icon: '🐕' },
    { id: 'breakfast', name: 'Breakfast', icon: '🥐' },
    { id: 'room-service', name: 'Room Service', icon: '🛎️' },
    { id: 'tv', name: 'Television', icon: '📺' },
    { id: 'minibar', name: 'Mini Bar', icon: '🍷' },
    { id: 'balcony', name: 'Balcony', icon: '🏔️' },
    { id: 'garden', name: 'Garden', icon: '🌿' },
    { id: 'heater', name: 'Heater', icon: '🔥' },
  ],
};

// Export individual arrays for backward compatibility
export const hotels = hotelData.hotels;
export const hotelBookings = hotelData.bookings;
export const bookings = hotelData.bookings; // Alias for compatibility
export const ownerHotels = hotelData.ownerHotels;
export const amenitiesList = hotelData.amenitiesList;

// Utility functions for hotels
export const getHotelById = id => {
  return hotelData.hotels.find(hotel => hotel.id === parseInt(id));
};

export const getHotelBySlug = slug => {
  return hotelData.hotels.find(hotel => hotel.slug === slug);
};

export const getHotelByIdOrSlug = identifier => {
  const hotelBySlug = getHotelBySlug(identifier);
  if (hotelBySlug) return hotelBySlug;
  return getHotelById(identifier);
};

export const getRoomById = (hotelId, roomId) => {
  const hotel = getHotelById(hotelId);
  return hotel?.rooms.find(room => room.id === parseInt(roomId));
};

export const getHotelsByCity = city => {
  return hotelData.hotels.filter(hotel =>
    hotel.city.toLowerCase().includes(city.toLowerCase())
  );
};

export const searchHotels = searchTerm => {
  const term = searchTerm.toLowerCase();
  return hotelData.hotels.filter(
    hotel =>
      hotel.name.toLowerCase().includes(term) ||
      hotel.location.toLowerCase().includes(term) ||
      hotel.city.toLowerCase().includes(term)
  );
};

// API simulation functions
export const fetchHotelData = async hotelId => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return getHotelById(hotelId);
};

export const fetchHotelReviews = async hotelId => {
  await new Promise(resolve => setTimeout(resolve, 300));
  const hotel = getHotelById(hotelId);
  return hotel?.reviews || [];
};

export const fetchRoomReviews = async (hotelId, roomId) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  const room = getRoomById(hotelId, roomId);
  return room?.reviews || [];
};

export const fetchHotelBookings = async userId => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return hotelData.bookings.filter(booking => booking.userId === userId);
};

// Default export for the main data object
export default hotelData;
