export const hotels = [
  {
    id: 1,
    name: "Grand Luxury Resort",
    slug: "grand-luxury-resort",
    location: "Mumbai, Maharashtra",
    address: "Marine Drive, Mumbai",
    city: "Mumbai",
    pincode: "400001",
    description:
      "Experience luxury at its finest with ocean views and world-class amenities.",
    rating: 4.5,
    starRating: 5,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3",
    ],
    amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Parking", "AC"],
    checkInTime: "3:00 PM",
    checkOutTime: "11:00 AM",
    policies: ["No smoking", "Pets not allowed", "ID proof required"],
    startingPrice: 8500,
    rooms: [
      {
        id: 101,
        name: "Deluxe Ocean View",
        type: "Deluxe",
        price: 8500,
        maxGuests: 2,
        bedType: "King Size",
        description: "Spacious room with stunning ocean views",
        images: [
          "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3",
          "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3",
        ],
        amenities: [
          "Ocean View",
          "WiFi",
          "AC",
          "TV",
          "Mini Bar",
          "Room Service",
        ],
      },
      {
        id: 102,
        name: "Premium Suite",
        type: "Suite",
        price: 15000,
        maxGuests: 4,
        bedType: "King + Sofa Bed",
        description: "Luxurious suite with separate living area",
        images: [
          "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3",
          "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3",
        ],
        amenities: [
          "Ocean View",
          "WiFi",
          "AC",
          "TV",
          "Mini Bar",
          "Room Service",
          "Balcony",
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Mountain View Lodge",
    slug: "mountain-view-lodge",
    location: "Manali, Himachal Pradesh",
    address: "Old Manali Road, Manali",
    city: "Manali",
    pincode: "175131",
    description: "Cozy mountain retreat with breathtaking Himalayan views.",
    rating: 4.2,
    starRating: 4,
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3",
    images: [
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3",
    ],
    amenities: ["WiFi", "Restaurant", "Parking", "Heater", "Garden"],
    checkInTime: "2:00 PM",
    checkOutTime: "12:00 PM",
    policies: ["No smoking in rooms", "Pets allowed with prior notice"],
    startingPrice: 3500,
    rooms: [
      {
        id: 201,
        name: "Mountain View Double",
        type: "Standard",
        price: 3500,
        maxGuests: 2,
        bedType: "Double Bed",
        description: "Comfortable room with mountain views",
        images: [
          "https://images.unsplash.com/photo-1586611292717-f828b167408c?ixlib=rb-4.0.3",
        ],
        amenities: ["Mountain View", "WiFi", "Heater", "TV"],
      },
    ],
  },
  {
    id: 3,
    name: "Heritage Palace Hotel",
    slug: "heritage-palace-hotel",
    location: "Jaipur, Rajasthan",
    address: "City Palace Road, Jaipur",
    city: "Jaipur",
    pincode: "302002",
    description:
      "Royal heritage hotel with traditional Rajasthani architecture.",
    rating: 4.7,
    starRating: 5,
    image:
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3",
    images: [
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1578645510447-e20b4311e3ce?ixlib=rb-4.0.3",
    ],
    amenities: [
      "WiFi",
      "Pool",
      "Spa",
      "Restaurant",
      "Parking",
      "AC",
      "Cultural Shows",
    ],
    checkInTime: "2:00 PM",
    checkOutTime: "11:00 AM",
    policies: ["Dress code for dinner", "No outside food"],
    startingPrice: 6500,
    rooms: [
      {
        id: 301,
        name: "Royal Heritage Room",
        type: "Heritage",
        price: 6500,
        maxGuests: 2,
        bedType: "King Size",
        description: "Elegantly decorated room with royal furniture",
        images: [
          "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3",
        ],
        amenities: ["Heritage Decor", "WiFi", "AC", "TV", "Mini Bar"],
      },
    ],
  },
  {
    id: 4,
    name: "Taj Palace",
    slug: "taj-palace",
    location: "New Delhi, Delhi",
    address: "1, Mansingh Road, New Delhi",
    city: "New Delhi",
    pincode: "110011",
    description:
      "Legendary luxury hotel in the heart of New Delhi, offering world-class hospitality and royal elegance.",
    rating: 4.8,
    starRating: 5,
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    ],
    amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Parking", "AC", "Concierge", "Business Center"],
    checkInTime: "3:00 PM",
    checkOutTime: "12:00 PM",
    policies: ["Valid ID required", "No smoking", "Advance payment required"],
    startingPrice: 12000,
    rooms: [
      {
        id: 401,
        name: "Luxury Palace Room",
        type: "Luxury",
        price: 12000,
        maxGuests: 2,
        bedType: "King Size",
        description: "Elegantly appointed room with city views and luxury amenities",
        images: [
          "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
          "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        ],
        amenities: [
          "City View",
          "WiFi",
          "AC",
          "TV",
          "Mini Bar",
          "Room Service",
          "Work Desk",
        ],
      },
      {
        id: 402,
        name: "Presidential Suite",
        type: "Suite",
        price: 25000,
        maxGuests: 4,
        bedType: "King + Queen",
        description: "Opulent presidential suite with panoramic city views and butler service",
        images: [
          "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
          "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        ],
        amenities: [
          "City View",
          "WiFi",
          "AC",
          "TV",
          "Mini Bar",
          "Room Service",
          "Butler Service",
          "Living Room",
          "Balcony",
        ],
      },
    ],
  },
];

export const bookings = [
  {
    id: 1,
    userId: "user123",
    hotelId: 1,
    roomId: 101,
    hotelName: "Grand Luxury Resort",
    roomName: "Deluxe Ocean View",
    checkIn: "2024-02-15",
    checkOut: "2024-02-18",
    guests: 2,
    totalPrice: 25500,
    status: "confirmed",
    bookingDate: "2024-01-20",
    guestName: "John Doe",
    guestEmail: "john@example.com",
    guestPhone: "+91 9876543210",
    specialRequests: "Late check-in requested",
  },
  {
    id: 2,
    userId: "user123",
    hotelId: 2,
    roomId: 201,
    hotelName: "Mountain View Lodge",
    roomName: "Mountain View Double",
    checkIn: "2024-03-10",
    checkOut: "2024-03-12",
    guests: 2,
    totalPrice: 7000,
    status: "pending",
    bookingDate: "2024-01-25",
    guestName: "Jane Smith",
    guestEmail: "jane@example.com",
    guestPhone: "+91 9876543211",
    specialRequests: "",
  },
];

export const ownerHotels = [
  {
    id: 1,
    ownerId: "owner123",
    name: "Grand Luxury Resort",
    location: "Mumbai, Maharashtra",
    status: "active",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3",
    totalRooms: 2,
    totalBookings: 15,
  },
  {
    id: 3,
    ownerId: "owner123",
    name: "Heritage Palace Hotel",
    location: "Jaipur, Rajasthan",
    status: "active",
    image:
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3",
    totalRooms: 1,
    totalBookings: 8,
  },
];

export const amenitiesList = [
  { id: "wifi", name: "WiFi", icon: "📶" },
  { id: "ac", name: "Air Conditioning", icon: "❄️" },
  { id: "pool", name: "Swimming Pool", icon: "🏊" },
  { id: "spa", name: "Spa", icon: "🧖" },
  { id: "gym", name: "Fitness Center", icon: "💪" },
  { id: "restaurant", name: "Restaurant", icon: "🍽️" },
  { id: "parking", name: "Parking", icon: "🚗" },
  { id: "pet", name: "Pet Friendly", icon: "🐕" },
  { id: "breakfast", name: "Breakfast", icon: "🥐" },
  { id: "room-service", name: "Room Service", icon: "🛎️" },
  { id: "tv", name: "Television", icon: "📺" },
  { id: "minibar", name: "Mini Bar", icon: "🍷" },
  { id: "balcony", name: "Balcony", icon: "🏔️" },
  { id: "garden", name: "Garden", icon: "🌿" },
  { id: "heater", name: "Heater", icon: "🔥" },
];

// Helper functions
export const getHotelById = (id) => {
  return hotels.find((hotel) => hotel.id === parseInt(id));
};

export const getHotelBySlug = (slug) => {
  return hotels.find((hotel) => hotel.slug === slug);
};

export const getHotelByIdOrSlug = (identifier) => {
  // First try to find by slug
  const hotelBySlug = getHotelBySlug(identifier);
  if (hotelBySlug) return hotelBySlug;

  // If not found by slug, try by ID
  return getHotelById(identifier);
};

export const getRoomById = (hotelId, roomId) => {
  const hotel = getHotelById(hotelId);
  return hotel?.rooms.find((room) => room.id === parseInt(roomId));
};

export const getHotelsByCity = (city) => {
  return hotels.filter((hotel) =>
    hotel.city.toLowerCase().includes(city.toLowerCase()),
  );
};

export const searchHotels = (searchTerm) => {
  const term = searchTerm.toLowerCase();
  return hotels.filter(
    (hotel) =>
      hotel.name.toLowerCase().includes(term) ||
      hotel.location.toLowerCase().includes(term) ||
      hotel.city.toLowerCase().includes(term),
  );
};
