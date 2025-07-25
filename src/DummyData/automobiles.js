export const automobileCategories = [
  {
    id: 1,
    name: 'Luxury Cars',
    slug: 'luxury-cars',
    image:
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&q=80',
    description: 'Premium luxury vehicles and supercars',
  },
  {
    id: 2,
    name: 'Electric Vehicles',
    slug: 'electric-vehicles',
    image:
      'https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=500&q=80',
    description: 'Eco-friendly electric and hybrid vehicles',
  },
  {
    id: 3,
    name: 'SUVs & Trucks',
    slug: 'suvs-trucks',
    image:
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=500&q=80',
    description: 'Family SUVs, pickup trucks, and off-road vehicles',
  },
  {
    id: 4,
    name: 'Classic Cars',
    slug: 'classic-cars',
    image:
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=500&q=80',
    description: 'Vintage and classic automobiles',
  },
];

export const automobileVehicles = [
  // Luxury Cars
  {
    id: 1,
    name: '2024 Mercedes-Benz S-Class',
    slug: '2024-mercedes-benz-s-class',
    price: 109899,
    originalPrice: 119899,
    category: 'luxury-cars',
    categoryId: 1,
    image:
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=500&q=80',
    images: [
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=500&q=80',
      'https://images.unsplash.com/photo-1563720223185-11003d516935?w=500&q=80',
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=500&q=80',
    ],
    description:
      'Experience ultimate luxury with the latest Mercedes-Benz S-Class featuring cutting-edge technology and unparalleled comfort.',
    features: [
      'MBUX Hyperscreen',
      'Executive rear seating package',
      'Air suspension with adaptive damping',
      'Burmester 4D surround sound',
      'Level 3 autonomous driving',
    ],
    specifications: {
      engine: '3.0L Twin-Turbo V6',
      horsepower: '429 HP',
      transmission: '9-Speed Automatic',
      drivetrain: 'RWD',
      fuelEconomy: '23/32 MPG',
      seating: '5 passengers',
    },
    rating: 4.9,
    reviews: 127,
    stock: 8,
    availability: 'in_stock',
    featured: true,
    onSale: true,
    year: 2024,
    make: 'Mercedes-Benz',
    model: 'S-Class',
    trim: 'S 500 4MATIC',
    mileage: 0,
    condition: 'new',
  },
  {
    id: 2,
    name: '2024 BMW X5 M50i',
    slug: '2024-bmw-x5-m50i',
    price: 73900,
    category: 'luxury-cars',
    categoryId: 1,
    image:
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=500&q=80',
    images: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=500&q=80',
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=500&q=80',
      'https://images.unsplash.com/photo-1570294752112-27ac5df09ba9?w=500&q=80',
    ],
    description:
      'The ultimate luxury SUV combining performance, comfort, and cutting-edge technology for the modern driver.',
    features: [
      'M Performance TwinPower Turbo',
      'xDrive intelligent all-wheel drive',
      'Panoramic moonroof',
      'Harman Kardon surround sound',
      'Wireless Apple CarPlay',
    ],
    specifications: {
      engine: '4.4L Twin-Turbo V8',
      horsepower: '523 HP',
      transmission: '8-Speed Automatic',
      drivetrain: 'AWD',
      fuelEconomy: '17/22 MPG',
      seating: '7 passengers',
    },
    rating: 4.7,
    reviews: 89,
    stock: 12,
    availability: 'in_stock',
    featured: true,
    year: 2024,
    make: 'BMW',
    model: 'X5',
    trim: 'M50i',
    mileage: 0,
    condition: 'new',
  },

  // Electric Vehicles
  {
    id: 3,
    name: '2024 Tesla Model S Plaid',
    slug: '2024-tesla-model-s-plaid',
    price: 129990,
    category: 'electric-vehicles',
    categoryId: 2,
    image:
      'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=500&q=80',
    images: [
      'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=500&q=80',
      'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=500&q=80',
      'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=500&q=80',
    ],
    description:
      'The fastest production sedan ever built with tri-motor all-wheel drive and revolutionary technology.',
    features: [
      'Tri-motor all-wheel drive',
      '17-inch cinematic display',
      'Full self-driving capability',
      'Over-the-air updates',
      'Carbon fiber interior',
    ],
    specifications: {
      engine: 'Electric Tri-Motor',
      horsepower: '1,020 HP',
      transmission: 'Single-Speed',
      drivetrain: 'AWD',
      range: '396 miles',
      seating: '5 passengers',
    },
    rating: 4.8,
    reviews: 203,
    stock: 6,
    availability: 'limited_stock',
    featured: true,
    year: 2024,
    make: 'Tesla',
    model: 'Model S',
    trim: 'Plaid',
    mileage: 0,
    condition: 'new',
  },
  {
    id: 4,
    name: '2024 Ford Mustang Mach-E GT',
    slug: '2024-ford-mustang-mach-e-gt',
    price: 63995,
    category: 'electric-vehicles',
    categoryId: 2,
    image:
      'https://images.unsplash.com/photo-1599912027806-cffa7fdc6188?w=500&q=80',
    images: [
      'https://images.unsplash.com/photo-1599912027806-cffa7fdc6188?w=500&q=80',
      'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=500&q=80',
    ],
    description:
      'Electric performance SUV that delivers Mustang soul with zero emissions and exhilarating acceleration.',
    features: [
      'Dual-motor all-wheel drive',
      '15.5-inch SYNC 4A touchscreen',
      'Mustang-inspired design',
      'MagneRide damping system',
      'B&O sound system',
    ],
    specifications: {
      engine: 'Electric Dual-Motor',
      horsepower: '480 HP',
      transmission: 'Single-Speed',
      drivetrain: 'AWD',
      range: '270 miles',
      seating: '5 passengers',
    },
    rating: 4.6,
    reviews: 156,
    stock: 15,
    availability: 'in_stock',
    year: 2024,
    make: 'Ford',
    model: 'Mustang Mach-E',
    trim: 'GT',
    mileage: 0,
    condition: 'new',
  },

  // SUVs & Trucks
  {
    id: 5,
    name: '2024 Ford F-150 Lightning',
    slug: '2024-ford-f-150-lightning',
    price: 59974,
    originalPrice: 64974,
    category: 'suvs-trucks',
    categoryId: 3,
    image:
      'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=500&q=80',
    images: [
      'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=500&q=80',
      'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=500&q=80',
    ],
    description:
      "America's best-selling truck goes electric with incredible capability, power, and advanced technology.",
    features: [
      'Dual-motor electric powertrain',
      'Pro Power Onboard',
      'Intelligent Backup Power',
      'Over-the-air updates',
      'SYNC 4A with 15.5-inch screen',
    ],
    specifications: {
      engine: 'Electric Dual-Motor',
      horsepower: '452 HP',
      transmission: 'Single-Speed',
      drivetrain: 'AWD',
      range: '320 miles',
      towingCapacity: '10,000 lbs',
    },
    rating: 4.7,
    reviews: 234,
    stock: 11,
    availability: 'in_stock',
    featured: true,
    onSale: true,
    year: 2024,
    make: 'Ford',
    model: 'F-150 Lightning',
    trim: 'XLT',
    mileage: 0,
    condition: 'new',
  },
  {
    id: 6,
    name: '2024 Jeep Grand Cherokee L',
    slug: '2024-jeep-grand-cherokee-l',
    price: 56995,
    category: 'suvs-trucks',
    categoryId: 3,
    image:
      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=500&q=80',
    images: [
      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=500&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80',
    ],
    description:
      'Three-row luxury SUV with legendary Jeep capability and premium comfort for the whole family.',
    features: [
      'Best-in-class towing capacity',
      'Uconnect 5 with 10.1-inch display',
      'Three rows of seating',
      'Advanced 4x4 capability',
      'McIntosh premium audio',
    ],
    specifications: {
      engine: '5.7L HEMI V8',
      horsepower: '357 HP',
      transmission: '8-Speed Automatic',
      drivetrain: '4WD',
      fuelEconomy: '14/22 MPG',
      seating: '7 passengers',
    },
    rating: 4.5,
    reviews: 178,
    stock: 19,
    availability: 'in_stock',
    year: 2024,
    make: 'Jeep',
    model: 'Grand Cherokee L',
    trim: 'Summit',
    mileage: 0,
    condition: 'new',
  },

  // Classic Cars
  {
    id: 7,
    name: '1969 Ford Mustang Boss 429',
    slug: '1969-ford-mustang-boss-429',
    price: 189500,
    category: 'classic-cars',
    categoryId: 4,
    image:
      'https://images.unsplash.com/photo-1494905998402-395d579af36f?w=500&q=80',
    images: [
      'https://images.unsplash.com/photo-1494905998402-395d579af36f?w=500&q=80',
      'https://images.unsplash.com/photo-1580414454467-1c1a6c3d0d72?w=500&q=80',
    ],
    description:
      'Rare and pristine 1969 Mustang Boss 429, fully restored to concours condition. A true American muscle car legend.',
    features: [
      'Numbers matching 429 Super Cobra Jet',
      '4-speed manual transmission',
      'Fully documented restoration',
      'Concours condition',
      'Investment grade classic',
    ],
    specifications: {
      engine: '7.0L 429 Super Cobra Jet V8',
      horsepower: '375 HP',
      transmission: '4-Speed Manual',
      drivetrain: 'RWD',
      fuelEconomy: '8/12 MPG',
      seating: '4 passengers',
    },
    rating: 4.9,
    reviews: 45,
    stock: 1,
    availability: 'limited_stock',
    featured: true,
    year: 1969,
    make: 'Ford',
    model: 'Mustang',
    trim: 'Boss 429',
    mileage: 48750,
    condition: 'restored',
  },
  {
    id: 8,
    name: '1967 Chevrolet Camaro SS',
    slug: '1967-chevrolet-camaro-ss',
    price: 74900,
    category: 'classic-cars',
    categoryId: 4,
    image:
      'https://images.unsplash.com/photo-1552424745-34a8783d73b8?w=500&q=80',
    images: [
      'https://images.unsplash.com/photo-1552424745-34a8783d73b8?w=500&q=80',
      'https://images.unsplash.com/photo-1517019540136-d9717f10d4c4?w=500&q=80',
    ],
    description:
      'Beautiful 1967 Camaro SS with original 396 big block. Frame-off restoration with attention to every detail.',
    features: [
      'Original 396 L78 big block',
      'Muncie 4-speed transmission',
      'Positraction rear end',
      'Power steering and brakes',
      'SS appearance package',
    ],
    specifications: {
      engine: '6.5L 396 L78 V8',
      horsepower: '375 HP',
      transmission: '4-Speed Manual',
      drivetrain: 'RWD',
      fuelEconomy: '9/13 MPG',
      seating: '4 passengers',
    },
    rating: 4.8,
    reviews: 32,
    stock: 1,
    availability: 'limited_stock',
    year: 1967,
    make: 'Chevrolet',
    model: 'Camaro',
    trim: 'SS',
    mileage: 67890,
    condition: 'restored',
  },
];

export const automobileVendors = [
  {
    id: 'luxury-auto-gallery',
    name: 'Luxury Auto Gallery',
    slug: 'luxury-auto-gallery',
    category: 'automobiles',
    logo: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=200&q=80',
    image:
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80',
    rating: 4.8,
    reviewCount: 523,
    address: '123 Auto Mile, Luxury District',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94110',
    coordinates: { lat: 37.7749, lng: -122.4194 },
    distance: 0.7,
    description:
      'Premium luxury vehicles from world-renowned brands. Experience excellence in automotive craftsmanship.',
    specialties: [
      'Luxury Cars',
      'Sports Cars',
      'Electric Vehicles',
      'Custom Modifications',
    ],
    phone: '+1 (555) 123-LUXURY',
    email: 'sales@luxuryautogallery.com',
    website: 'www.luxuryautogallery.com',
    hours: {
      monday: '9:00 AM - 7:00 PM',
      tuesday: '9:00 AM - 7:00 PM',
      wednesday: '9:00 AM - 7:00 PM',
      thursday: '9:00 AM - 7:00 PM',
      friday: '9:00 AM - 8:00 PM',
      saturday: '10:00 AM - 8:00 PM',
      sunday: '12:00 PM - 6:00 PM',
    },
    theme: {
      primaryColor: '#1f2937',
      secondaryColor: '#374151',
      backgroundColor: '#f9fafb',
      textColor: '#1f2937',
    },
    featured: true,
    inventory: [
      { type: 'Luxury Sedans', count: 45 },
      { type: 'Sports Cars', count: 28 },
      { type: 'SUVs', count: 32 },
      { type: 'Electric Vehicles', count: 15 },
    ],
  },
  {
    id: 'family-first-motors',
    name: 'Family First Motors',
    slug: 'family-first-motors',
    category: 'automobiles',
    logo: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=200&q=80',
    image:
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80',
    rating: 4.6,
    reviewCount: 892,
    address: '456 Family Avenue, Suburban Center',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94111',
    coordinates: { lat: 37.7849, lng: -122.4094 },
    distance: 1.4,
    description:
      'Reliable family vehicles at honest prices. Safety and comfort for every family adventure.',
    specialties: ['Family SUVs', 'Minivans', 'Sedans', 'Safety Features'],
    phone: '+1 (555) 456-FAMILY',
    email: 'info@familyfirstmotors.com',
    website: 'www.familyfirstmotors.com',
    hours: {
      monday: '8:00 AM - 7:00 PM',
      tuesday: '8:00 AM - 7:00 PM',
      wednesday: '8:00 AM - 7:00 PM',
      thursday: '8:00 AM - 7:00 PM',
      friday: '8:00 AM - 8:00 PM',
      saturday: '9:00 AM - 8:00 PM',
      sunday: '11:00 AM - 6:00 PM',
    },
    theme: {
      primaryColor: '#059669',
      secondaryColor: '#10b981',
      backgroundColor: '#f0fdf4',
      textColor: '#1f2937',
    },
    featured: false,
    inventory: [
      { type: 'Family SUVs', count: 67 },
      { type: 'Minivans', count: 23 },
      { type: 'Sedans', count: 54 },
      { type: 'Hatchbacks', count: 31 },
    ],
  },
  {
    id: 'electric-future',
    name: 'Electric Future',
    slug: 'electric-future',
    category: 'automobiles',
    logo: 'https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=200&q=80',
    image:
      'https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=800&q=80',
    rating: 4.9,
    reviewCount: 267,
    address: '789 Green Drive, Eco Park',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94112',
    coordinates: { lat: 37.7949, lng: -122.3994 },
    distance: 2.2,
    description:
      'The future of transportation is here. Cutting-edge electric vehicles for the environmentally conscious.',
    specialties: [
      'Electric Cars',
      'Hybrid Vehicles',
      'Charging Solutions',
      'Eco-Friendly Options',
    ],
    phone: '+1 (555) 789-ELECTRIC',
    email: 'contact@electricfuture.com',
    website: 'www.electricfuture.com',
    hours: {
      monday: '10:00 AM - 6:00 PM',
      tuesday: '10:00 AM - 6:00 PM',
      wednesday: '10:00 AM - 6:00 PM',
      thursday: '10:00 AM - 6:00 PM',
      friday: '10:00 AM - 7:00 PM',
      saturday: '10:00 AM - 7:00 PM',
      sunday: '12:00 PM - 5:00 PM',
    },
    theme: {
      primaryColor: '#0ea5e9',
      secondaryColor: '#38bdf8',
      backgroundColor: '#f0f9ff',
      textColor: '#1f2937',
    },
    featured: true,
    inventory: [
      { type: 'Electric Sedans', count: 34 },
      { type: 'Electric SUVs', count: 28 },
      { type: 'Hybrid Models', count: 41 },
      { type: 'Electric Trucks', count: 12 },
    ],
  },
  {
    id: 'classic-car-collection',
    name: 'Classic Car Collection',
    slug: 'classic-car-collection',
    category: 'automobiles',
    logo: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=200&q=80',
    image:
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&q=80',
    rating: 4.7,
    reviewCount: 178,
    address: '321 Vintage Boulevard, Heritage District',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94113',
    coordinates: { lat: 37.7649, lng: -122.4294 },
    distance: 1.9,
    description:
      'Timeless classics and vintage automobiles. Restored to perfection, driven with passion.',
    specialties: [
      'Classic Cars',
      'Vintage Restoration',
      'Collectibles',
      'Custom Builds',
    ],
    phone: '+1 (555) 321-CLASSIC',
    email: 'vintage@classiccarscollection.com',
    website: 'www.classiccarscollection.com',
    hours: {
      monday: 'Closed',
      tuesday: '10:00 AM - 5:00 PM',
      wednesday: '10:00 AM - 5:00 PM',
      thursday: '10:00 AM - 5:00 PM',
      friday: '10:00 AM - 6:00 PM',
      saturday: '10:00 AM - 6:00 PM',
      sunday: '12:00 PM - 4:00 PM',
    },
    theme: {
      primaryColor: '#dc2626',
      secondaryColor: '#ef4444',
      backgroundColor: '#fef2f2',
      textColor: '#1f2937',
    },
    featured: false,
    inventory: [
      { type: '1950s Classics', count: 12 },
      { type: '1960s Muscle Cars', count: 18 },
      { type: 'Vintage Convertibles', count: 8 },
      { type: 'Restored Originals', count: 22 },
    ],
  },
];

// Utility functions for automobiles
export const getVehiclesByCategory = categorySlug => {
  return automobileVehicles.filter(
    vehicle => vehicle.category === categorySlug
  );
};

export const getVehicleById = id => {
  return automobileVehicles.find(vehicle => vehicle.id === parseInt(id));
};

export const getFeaturedVehicles = () => {
  return automobileVehicles.filter(vehicle => vehicle.featured);
};

export const getOnSaleVehicles = () => {
  return automobileVehicles.filter(vehicle => vehicle.onSale);
};

export const getVehiclesByAvailability = availability => {
  return automobileVehicles.filter(
    vehicle => vehicle.availability === availability
  );
};

export const getVehiclesByCondition = condition => {
  return automobileVehicles.filter(vehicle => vehicle.condition === condition);
};

export const getVehiclesByMake = make => {
  return automobileVehicles.filter(
    vehicle => vehicle.make.toLowerCase() === make.toLowerCase()
  );
};

export const getVehiclesByPriceRange = (minPrice, maxPrice) => {
  return automobileVehicles.filter(
    vehicle => vehicle.price >= minPrice && vehicle.price <= maxPrice
  );
};

export const getAvailabilityStatus = vehicle => {
  if (!vehicle) return 'unknown';

  if (vehicle.availability === 'out_of_stock' || vehicle.stock === 0) {
    return 'out_of_stock';
  } else if (vehicle.availability === 'limited_stock' || vehicle.stock <= 5) {
    return 'limited_stock';
  } else if (vehicle.availability === 'pre_order') {
    return 'pre_order';
  } else {
    return 'in_stock';
  }
};

export const getAvailabilityLabel = availability => {
  switch (availability) {
    case 'in_stock':
      return 'In Stock';
    case 'out_of_stock':
      return 'Sold Out';
    case 'limited_stock':
      return 'Limited Stock';
    case 'pre_order':
      return 'Pre Order';
    default:
      return 'Unknown';
  }
};

export const getAvailabilityColor = availability => {
  switch (availability) {
    case 'in_stock':
      return '#10b981';
    case 'out_of_stock':
      return '#ef4444';
    case 'limited_stock':
      return '#f59e0b';
    case 'pre_order':
      return '#3b82f6';
    default:
      return '#6b7280';
  }
};

export const getVendorsByLocation = (city, state) => {
  return automobileVendors.filter(
    vendor =>
      vendor.city.toLowerCase() === city.toLowerCase() &&
      vendor.state.toLowerCase() === state.toLowerCase()
  );
};

export const getVendorById = id => {
  return automobileVendors.find(vendor => vendor.id === id);
};

export const getVendorBySlug = slug => {
  return automobileVendors.find(vendor => vendor.slug === slug);
};

export const getVendorByIdOrSlug = identifier => {
  const vendorBySlug = getVendorBySlug(identifier);
  if (vendorBySlug) return vendorBySlug;
  return getVendorById(identifier);
};

export const getFeaturedVendors = () => {
  return automobileVendors.filter(vendor => vendor.featured);
};

export const searchVendors = query => {
  const searchTerm = query.toLowerCase();
  return automobileVendors.filter(
    vendor =>
      vendor.name.toLowerCase().includes(searchTerm) ||
      vendor.specialties.some(specialty =>
        specialty.toLowerCase().includes(searchTerm)
      ) ||
      vendor.description.toLowerCase().includes(searchTerm)
  );
};
