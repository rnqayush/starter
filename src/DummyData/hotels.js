// Single comprehensive hotel data object for the entire application
export const hotelData = {
  hotels: [
    {
      id: 1,
      name: 'Grand Luxury Resort',
      slug: 'grand-luxury-resort',
      location: 'Mumbai, Maharashtra',
      address: 'Marine Drive, Mumbai',
      city: 'Mumbai',
      pincode: '400001',
      phone: '+91 22 6601 1825',
      email: 'reservations@grandluxuryresort.com',
      description:
        'Experience luxury at its finest with ocean views and world-class amenities. Grand Luxury Resort stands as a beacon of elegance and sophistication, offering unparalleled hospitality in the heart of Mumbai.',
      rating: 4.5,
      starRating: 5,
      image:
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3',
      images: [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3',
        'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3',
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3',
        'https://images.unsplash.com/photo-1578645510447-e20b4311e3ce?ixlib=rb-4.0.3',
      ],
      gallery: [
        {
          title: 'Hotel Exterior',
          image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3',
        },
        {
          title: 'Luxury Rooms',
          image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3',
        },
        {
          title: 'Ocean View',
          image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3',
        },
        {
          title: 'Swimming Pool',
          image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3',
        },
        {
          title: 'Spa & Wellness',
          image: 'https://images.unsplash.com/photo-1578645510447-e20b4311e3ce?ixlib=rb-4.0.3',
        },
      ],
      amenities: ['WiFi', 'Pool', 'Spa', 'Gym', 'Restaurant', 'Parking', 'AC'],
      amenityCategories: [
        {
          title: 'Recreation',
          items: [
            'Swimming Pool',
            'Fitness Center',
            'Spa & Wellness',
            'Game Room',
            'Tennis Court',
          ],
        },
        {
          title: 'Dining',
          items: [
            'Fine Dining Restaurant',
            'Rooftop Bar',
            'Room Service',
            'Breakfast Buffet',
            'Coffee Shop',
          ],
        },
        {
          title: 'Business',
          items: [
            'Business Center',
            'Meeting Rooms',
            'Conference Hall',
            'Free WiFi',
            'Printing Services',
          ],
        },
        {
          title: 'Services',
          items: [
            '24/7 Concierge',
            'Valet Parking',
            'Laundry Service',
            'Airport Transfer',
            'Tour Desk',
          ],
        },
      ],
      checkInTime: '3:00 PM',
      checkOutTime: '11:00 AM',
      policies: ['No smoking', 'Pets not allowed', 'ID proof required'],
      startingPrice: 8500,
      features: [
        {
          title: '24/7 Concierge',
          description:
            'Our dedicated concierge team is available round-the-clock to assist with all your needs.',
        },
        {
          title: 'Luxury Amenities',
          description:
            'Enjoy world-class facilities including spa, pool, and fine dining restaurants.',
        },
        {
          title: 'Business Center',
          description:
            'Fully equipped business facilities for meetings and corporate events.',
        },
        {
          title: 'Airport Transfer',
          description: 'Complimentary airport shuttle service for all our guests.',
        },
      ],
      reviews: [
        {
          id: 1,
          guestName: 'Raj Patel',
          rating: 5,
          date: '2024-01-15',
          comment:
            'Absolutely amazing experience! The staff was incredibly friendly and the ocean view from our room was breathtaking. The spa treatments were world-class.',
          roomType: 'Deluxe Ocean View',
          verified: true,
        },
        {
          id: 2,
          guestName: 'Priya Sharma',
          rating: 4,
          date: '2024-01-10',
          comment:
            'Beautiful hotel with excellent amenities. The pool area is stunning and the restaurant serves delicious food. Only minor issue was the WiFi speed.',
          roomType: 'Premium Suite',
          verified: true,
        },
        {
          id: 3,
          guestName: 'David Johnson',
          rating: 5,
          date: '2024-01-05',
          comment:
            'Perfect for a business trip. The conference facilities were top-notch and the business center had everything I needed. Highly recommend!',
          roomType: 'Deluxe Ocean View',
          verified: true,
        },
      ],
      contactFields: [
        { label: 'Address', value: 'Marine Drive, Mumbai' },
        { label: 'Phone', value: '+91 22 6601 1825' },
        { label: 'Email', value: 'reservations@grandluxuryresort.com' },
        { label: 'Check-in / Check-out', value: '3:00 PM / 11:00 AM' },
      ],
      rooms: [
        {
          id: 101,
          name: 'Deluxe Ocean View',
          type: 'Deluxe',
          price: 8500,
          maxGuests: 2,
          bedType: 'King Size',
          description: 'Spacious room with stunning ocean views and premium amenities',
          images: [
            'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3',
            'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3',
          ],
          amenities: [
            'Ocean View',
            'WiFi',
            'AC',
            'TV',
            'Mini Bar',
            'Room Service',
          ],
          reviews: [
            {
              id: 1,
              guestName: 'Ananya Gupta',
              rating: 5,
              date: '2024-01-20',
              comment:
                'The ocean view was absolutely stunning! Woke up to beautiful sunrises every morning. The room was spacious and very clean.',
              verified: true,
            },
            {
              id: 2,
              guestName: 'Michael Smith',
              rating: 4,
              date: '2024-01-18',
              comment:
                'Great room with amazing views. The bed was very comfortable and the mini bar was well stocked. Perfect for a romantic getaway.',
              verified: true,
            },
          ],
        },
        {
          id: 102,
          name: 'Premium Suite',
          type: 'Suite',
          price: 15000,
          maxGuests: 4,
          bedType: 'King + Sofa Bed',
          description: 'Luxurious suite with separate living area and panoramic ocean views',
          images: [
            'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3',
            'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3',
          ],
          amenities: [
            'Ocean View',
            'WiFi',
            'AC',
            'TV',
            'Mini Bar',
            'Room Service',
            'Balcony',
            'Living Room',
          ],
          reviews: [
            {
              id: 1,
              guestName: 'Sarah Wilson',
              rating: 5,
              date: '2024-01-22',
              comment:
                'Perfect for our family vacation! The kids loved the separate living area and the balcony had amazing views. Worth every penny!',
              verified: true,
            },
          ],
        },
      ],
    },
    {
      id: 2,
      name: 'Mountain View Lodge',
      slug: 'mountain-view-lodge',
      location: 'Manali, Himachal Pradesh',
      address: 'Old Manali Road, Manali',
      city: 'Manali',
      pincode: '175131',
      phone: '+91 1902 252 456',
      email: 'info@mountainviewlodge.com',
      description: 'Cozy mountain retreat with breathtaking Himalayan views and warm hospitality.',
      rating: 4.2,
      starRating: 4,
      image:
        'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3',
      images: [
        'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3',
        'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3',
      ],
      gallery: [
        {
          title: 'Lodge Exterior',
          image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3',
        },
        {
          title: 'Mountain Views',
          image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3',
        },
      ],
      amenities: ['WiFi', 'Restaurant', 'Parking', 'Heater', 'Garden'],
      amenityCategories: [
        {
          title: 'Comfort',
          items: ['Room Heater', 'Hot Water', 'Comfortable Bedding', 'Garden View'],
        },
        {
          title: 'Dining',
          items: ['Local Cuisine Restaurant', 'Organic Garden Produce', 'Bonfire Dinner'],
        },
        {
          title: 'Services',
          items: ['Trekking Guide', 'Local Tours', 'Laundry Service'],
        },
      ],
      checkInTime: '2:00 PM',
      checkOutTime: '12:00 PM',
      policies: ['No smoking in rooms', 'Pets allowed with prior notice'],
      startingPrice: 3500,
      features: [
        {
          title: 'Mountain Adventures',
          description: 'Guided treks and mountain expeditions with experienced local guides.',
        },
        {
          title: 'Organic Garden',
          description: 'Fresh vegetables and herbs grown in our own organic garden.',
        },
        {
          title: 'Cozy Atmosphere',
          description: 'Warm and welcoming lodge atmosphere with traditional mountain hospitality.',
        },
      ],
      reviews: [
        {
          id: 1,
          guestName: 'Amit Kumar',
          rating: 4,
          date: '2024-01-12',
          comment:
            'Great location for mountain lovers! The views are spectacular and the staff is very helpful with trekking arrangements.',
          roomType: 'Mountain View Double',
          verified: true,
        },
        {
          id: 2,
          guestName: 'Lisa Chen',
          rating: 5,
          date: '2024-01-08',
          comment:
            'Perfect mountain getaway! The organic food was delicious and the bonfire evenings were magical.',
          roomType: 'Mountain View Double',
          verified: true,
        },
      ],
      contactFields: [
        { label: 'Address', value: 'Old Manali Road, Manali' },
        { label: 'Phone', value: '+91 1902 252 456' },
        { label: 'Email', value: 'info@mountainviewlodge.com' },
        { label: 'Check-in / Check-out', value: '2:00 PM / 12:00 PM' },
      ],
      rooms: [
        {
          id: 201,
          name: 'Mountain View Double',
          type: 'Standard',
          price: 3500,
          maxGuests: 2,
          bedType: 'Double Bed',
          description: 'Comfortable room with beautiful mountain views and traditional decor',
          images: [
            'https://images.unsplash.com/photo-1586611292717-f828b167408c?ixlib=rb-4.0.3',
          ],
          amenities: ['Mountain View', 'WiFi', 'Heater', 'TV'],
          reviews: [
            {
              id: 1,
              guestName: 'Neha Tripathi',
              rating: 4,
              date: '2024-01-25',
              comment:
                'Cozy room with amazing mountain views. Perfect for a peaceful retreat. The heater worked perfectly during cold nights.',
              verified: true,
            },
          ],
        },
      ],
    },
    {
      id: 3,
      name: 'Heritage Palace Hotel',
      slug: 'heritage-palace-hotel',
      location: 'Jaipur, Rajasthan',
      address: 'City Palace Road, Jaipur',
      city: 'Jaipur',
      pincode: '302002',
      phone: '+91 141 236 4321',
      email: 'reservations@heritagepalace.com',
      description:
        'Royal heritage hotel with traditional Rajasthani architecture and royal hospitality.',
      rating: 4.7,
      starRating: 5,
      image:
        'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3',
      images: [
        'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3',
        'https://images.unsplash.com/photo-1578645510447-e20b4311e3ce?ixlib=rb-4.0.3',
      ],
      gallery: [
        {
          title: 'Palace Architecture',
          image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3',
        },
        {
          title: 'Royal Courtyard',
          image: 'https://images.unsplash.com/photo-1578645510447-e20b4311e3ce?ixlib=rb-4.0.3',
        },
      ],
      amenities: [
        'WiFi',
        'Pool',
        'Spa',
        'Restaurant',
        'Parking',
        'AC',
        'Cultural Shows',
      ],
      amenityCategories: [
        {
          title: 'Royal Experience',
          items: ['Cultural Shows', 'Traditional Music', 'Royal Dining', 'Heritage Tours'],
        },
        {
          title: 'Luxury',
          items: ['Spa Treatments', 'Swimming Pool', 'Fine Dining', 'Butler Service'],
        },
        {
          title: 'Modern Comfort',
          items: ['Air Conditioning', 'Free WiFi', 'Room Service', 'Valet Parking'],
        },
      ],
      checkInTime: '2:00 PM',
      checkOutTime: '11:00 AM',
      policies: ['Dress code for dinner', 'No outside food'],
      startingPrice: 6500,
      features: [
        {
          title: 'Royal Heritage',
          description: 'Experience the grandeur of Rajasthani royalty with authentic palace architecture.',
        },
        {
          title: 'Cultural Immersion',
          description: 'Daily cultural shows featuring traditional Rajasthani music and dance.',
        },
        {
          title: 'Authentic Cuisine',
          description: 'Traditional Rajasthani cuisine prepared by royal chefs.',
        },
      ],
      reviews: [
        {
          id: 1,
          guestName: 'Kavya Mehta',
          rating: 5,
          date: '2024-01-14',
          comment:
            'Felt like royalty! The architecture is stunning and the cultural shows were amazing. Perfect for experiencing Rajasthani culture.',
          roomType: 'Royal Heritage Room',
          verified: true,
        },
        {
          id: 2,
          guestName: 'Robert Anderson',
          rating: 4,
          date: '2024-01-09',
          comment:
            'Beautiful heritage property with excellent service. The traditional dinner was a highlight of our stay.',
          roomType: 'Royal Heritage Room',
          verified: true,
        },
      ],
      contactFields: [
        { label: 'Address', value: 'City Palace Road, Jaipur' },
        { label: 'Phone', value: '+91 141 236 4321' },
        { label: 'Email', value: 'reservations@heritagepalace.com' },
        { label: 'Check-in / Check-out', value: '2:00 PM / 11:00 AM' },
      ],
      rooms: [
        {
          id: 301,
          name: 'Royal Heritage Room',
          type: 'Heritage',
          price: 6500,
          maxGuests: 2,
          bedType: 'King Size',
          description: 'Elegantly decorated room with royal furniture and traditional Rajasthani decor',
          images: [
            'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3',
          ],
          amenities: ['Heritage Decor', 'WiFi', 'AC', 'TV', 'Mini Bar'],
          reviews: [
            {
              id: 1,
              guestName: 'Arjun Singh',
              rating: 5,
              date: '2024-01-28',
              comment:
                'Absolutely magnificent! The royal decor and traditional furnishings made us feel like we were living in a palace. Unforgettable experience!',
              verified: true,
            },
          ],
        },
      ],
    },
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
          image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3',
        },
        {
          title: 'Luxury Suites',
          image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3',
        },
        {
          title: 'Fine Dining',
          image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3',
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
          items: ['24/7 Concierge', 'Butler Service', 'Limousine Service', 'Personal Shopping'],
        },
        {
          title: 'Wellness',
          items: ['Luxury Spa', 'Fitness Center', 'Swimming Pool', 'Yoga Classes'],
        },
        {
          title: 'Business',
          items: ['Business Center', 'Meeting Rooms', 'Conference Facilities', 'Secretarial Services'],
        },
        {
          title: 'Dining',
          items: ['Multiple Restaurants', 'Room Service', 'Private Dining', 'Wine Cellar'],
        },
      ],
      checkInTime: '3:00 PM',
      checkOutTime: '12:00 PM',
      policies: ['Valid ID required', 'No smoking', 'Advance payment required'],
      startingPrice: 12000,
      features: [
        {
          title: 'Legendary Service',
          description: 'Experience the renowned Taj hospitality with personalized service and attention to detail.',
        },
        {
          title: 'Prime Location',
          description: 'Located in the heart of New Delhi with easy access to business districts and attractions.',
        },
        {
          title: 'World-Class Dining',
          description: 'Multiple award-winning restaurants serving global cuisines and signature dishes.',
        },
        {
          title: 'Luxury Spa',
          description: 'Rejuvenate at our luxury spa with traditional and modern wellness treatments.',
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
        {
          id: 402,
          name: 'Presidential Suite',
          type: 'Suite',
          price: 25000,
          maxGuests: 4,
          bedType: 'King + Queen',
          description:
            'Opulent presidential suite with panoramic city views and butler service, representing the pinnacle of luxury',
          images: [
            'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
          ],
          amenities: [
            'City View',
            'WiFi',
            'AC',
            'TV',
            'Mini Bar',
            'Room Service',
            'Butler Service',
            'Living Room',
            'Balcony',
            'Private Dining',
          ],
          reviews: [
            {
              id: 1,
              guestName: 'Alex Thompson',
              rating: 5,
              date: '2024-01-24',
              comment:
                'Absolutely incredible! The presidential suite exceeded all expectations. Butler service was impeccable and the views were stunning. Perfect for special occasions.',
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
  ownerHotels: [
    {
      id: 1,
      ownerId: 'owner123',
      name: 'Grand Luxury Resort',
      location: 'Mumbai, Maharashtra',
      status: 'active',
      image:
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3',
      totalRooms: 2,
      totalBookings: 15,
    },
    {
      id: 3,
      ownerId: 'owner123',
      name: 'Heritage Palace Hotel',
      location: 'Jaipur, Rajasthan',
      status: 'active',
      image:
        'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3',
      totalRooms: 1,
      totalBookings: 8,
    },
    {
      id: 4,
      ownerId: 'owner456',
      name: 'Taj Palace',
      location: 'New Delhi, Delhi',
      status: 'active',
      image:
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3',
      totalRooms: 2,
      totalBookings: 25,
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
export const fetchHotelData = async (hotelId) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return getHotelById(hotelId);
};

export const fetchHotelReviews = async (hotelId) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  const hotel = getHotelById(hotelId);
  return hotel?.reviews || [];
};

export const fetchRoomReviews = async (hotelId, roomId) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  const room = getRoomById(hotelId, roomId);
  return room?.reviews || [];
};

export const fetchHotelBookings = async (userId) => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return hotelData.bookings.filter(booking => booking.userId === userId);
};

// Default export for the main data object
export default hotelData;
