export const ecommerceCategories = [
  {
    id: 1,
    name: 'Electronics',
    slug: 'electronics',
    image:
      'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&q=80',
    description: 'Latest gadgets and electronic devices',
  },
  {
    id: 2,
    name: 'Fashion',
    slug: 'fashion',
    image:
      'https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&q=80',
    description: 'Trendy clothing and accessories',
  },
  {
    id: 3,
    name: 'Home & Garden',
    slug: 'home-garden',
    image:
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&q=80',
    description: 'Everything for your home and garden',
  },
  {
    id: 4,
    name: 'Sports',
    slug: 'sports',
    image:
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&q=80',
    description: 'Sports equipment and activewear',
  },
];

export const ecommerceProducts = [
  // Electronics
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    slug: 'premium-wireless-headphones',
    price: 299.99,
    originalPrice: 399.99,
    category: 'electronics',
    categoryId: 1,
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&q=80',
    ],
    description:
      'Experience premium sound quality with our top-of-the-line wireless headphones featuring noise cancellation and 30-hour battery life.',
    features: [
      'Active Noise Cancellation',
      '30-hour battery life',
      'Quick charge - 5 min for 3 hours playback',
      'Premium comfort fit',
      'Bluetooth 5.0',
    ],
    rating: 4.8,
    reviews: 245,
    stock: 15,
    availability: 'in_stock',
    featured: true,
    onSale: true,
  },
  {
    id: 2,
    name: 'Smart Fitness Watch',
    slug: 'smart-fitness-watch',
    price: 199.99,
    category: 'electronics',
    categoryId: 1,
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
      'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=500&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&q=80',
    ],
    description:
      'Track your fitness goals with this advanced smartwatch featuring heart rate monitoring, GPS, and water resistance.',
    features: [
      'Heart rate monitoring',
      'Built-in GPS',
      'Water resistant up to 50m',
      '7-day battery life',
      'Sleep tracking',
    ],
    rating: 4.6,
    reviews: 189,
    stock: 23,
    availability: 'in_stock',
    featured: true,
  },
  {
    id: 3,
    name: 'Wireless Charging Pad',
    slug: 'wireless-charging-pad',
    price: 49.99,
    category: 'electronics',
    categoryId: 1,
    image:
      'https://images.unsplash.com/photo-1609592706372-7b2b88277d99?w=500&q=80',
    images: [
      'https://images.unsplash.com/photo-1609592706372-7b2b88277d99?w=500&q=80',
    ],
    description:
      'Fast wireless charging for all Qi-compatible devices with sleek design and LED indicator.',
    features: [
      'Qi wireless charging',
      'Fast charging up to 15W',
      'LED charging indicator',
      'Non-slip design',
      'Universal compatibility',
    ],
    rating: 4.4,
    reviews: 76,
    stock: 45,
    availability: 'in_stock',
  },

  // Fashion
  {
    id: 4,
    name: 'Classic Denim Jacket',
    slug: 'classic-denim-jacket',
    price: 89.99,
    category: 'fashion',
    categoryId: 2,
    image:
      'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=500&q=80',
    images: [
      'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=500&q=80',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80',
    ],
    description:
      'Timeless denim jacket crafted from premium cotton denim. Perfect for layering and casual wear.',
    features: [
      '100% cotton denim',
      'Classic fit',
      'Multiple pockets',
      'Durable construction',
      'Machine washable',
    ],
    rating: 4.7,
    reviews: 134,
    stock: 28,
    availability: 'in_stock',
    featured: true,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    id: 5,
    name: 'Luxury Leather Handbag',
    slug: 'luxury-leather-handbag',
    price: 249.99,
    originalPrice: 349.99,
    category: 'fashion',
    categoryId: 2,
    image:
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&q=80',
    ],
    description:
      'Elegant leather handbag with spacious interior and premium finishing. Perfect for work or evening out.',
    features: [
      'Genuine leather',
      'Multiple compartments',
      'Adjustable strap',
      'Gold-tone hardware',
      'Dust bag included',
    ],
    rating: 4.9,
    reviews: 87,
    stock: 12,
    availability: 'limited_stock',
    onSale: true,
  },
  {
    id: 6,
    name: 'Comfortable Sneakers',
    slug: 'comfortable-sneakers',
    price: 129.99,
    category: 'fashion',
    categoryId: 2,
    image:
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&q=80',
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&q=80',
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500&q=80',
    ],
    description:
      'Ultra-comfortable sneakers with memory foam insole and breathable mesh upper. Perfect for daily wear.',
    features: [
      'Memory foam insole',
      'Breathable mesh upper',
      'Lightweight design',
      'Slip-resistant sole',
      'Available in multiple colors',
    ],
    rating: 4.5,
    reviews: 203,
    stock: 34,
    availability: 'in_stock',
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
  },

  // Home & Garden
  {
    id: 7,
    name: 'Modern Table Lamp',
    slug: 'modern-table-lamp',
    price: 79.99,
    category: 'home-garden',
    categoryId: 3,
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80',
    images: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=500&q=80',
    ],
    description:
      'Sleek modern table lamp with adjustable brightness and USB charging port. Perfect for any workspace.',
    features: [
      'Adjustable brightness',
      'Built-in USB port',
      'Touch control',
      'LED bulb included',
      'Modern design',
    ],
    rating: 4.6,
    reviews: 98,
    stock: 19,
    availability: 'in_stock',
    featured: true,
  },
  {
    id: 8,
    name: 'Ceramic Plant Pot Set',
    slug: 'ceramic-plant-pot-set',
    price: 39.99,
    category: 'home-garden',
    categoryId: 3,
    image:
      'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500&q=80',
    images: [
      'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500&q=80',
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&q=80',
    ],
    description:
      'Beautiful set of 3 ceramic plant pots with drainage holes and saucers. Perfect for indoor plants.',
    features: [
      'Set of 3 pots',
      'Drainage holes',
      'Matching saucers',
      'Easy to clean',
      'Various sizes',
    ],
    rating: 4.3,
    reviews: 156,
    stock: 41,
    availability: 'in_stock',
  },

  // Sports
  {
    id: 9,
    name: 'Yoga Exercise Mat',
    slug: 'yoga-exercise-mat',
    price: 34.99,
    category: 'sports',
    categoryId: 4,
    image:
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&q=80',
    images: [
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&q=80',
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=500&q=80',
    ],
    description:
      'Premium yoga mat with excellent grip and cushioning. Non-slip surface for safe practice.',
    features: [
      'Non-slip surface',
      '6mm thickness',
      'Eco-friendly material',
      'Carrying strap included',
      'Easy to clean',
    ],
    rating: 4.7,
    reviews: 267,
    stock: 52,
    availability: 'in_stock',
    featured: true,
  },
  {
    id: 10,
    name: 'Resistance Bands Set',
    slug: 'resistance-bands-set',
    price: 24.99,
    category: 'sports',
    categoryId: 4,
    image:
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&q=80',
    images: [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&q=80',
    ],
    description:
      'Complete set of resistance bands for strength training and rehabilitation. Multiple resistance levels.',
    features: [
      '5 resistance levels',
      'Door anchor included',
      'Comfortable handles',
      'Ankle straps',
      'Carrying bag',
    ],
    rating: 4.4,
    reviews: 189,
    stock: 67,
    availability: 'in_stock',
  },
];

export const ecommerceVendors = [
  {
    id: 'techmart-downtown',
    name: 'TechMart Downtown',
    slug: 'techmart-downtown',
    category: 'ecommerce',
    logo: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200&q=80',
    image:
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
    rating: 4.8,
    reviewCount: 1245,
    address: '123 Tech Street, Downtown District',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94102',
    coordinates: { lat: 37.7749, lng: -122.4194 },
    distance: 0.8,
    description:
      'Your premier destination for cutting-edge electronics and gadgets. From smartphones to smart home devices.',
    specialties: ['Electronics', 'Gadgets', 'Smart Home', 'Mobile Accessories'],
    phone: '+1 (555) 123-TECH',
    email: 'info@techmart-downtown.com',
    website: 'www.techmart-downtown.com',
    hours: {
      monday: '9:00 AM - 9:00 PM',
      tuesday: '9:00 AM - 9:00 PM',
      wednesday: '9:00 AM - 9:00 PM',
      thursday: '9:00 AM - 9:00 PM',
      friday: '9:00 AM - 10:00 PM',
      saturday: '10:00 AM - 10:00 PM',
      sunday: '11:00 AM - 8:00 PM',
    },
    theme: {
      primaryColor: '#1e40af',
      secondaryColor: '#3b82f6',
      backgroundColor: '#f8fafc',
      textColor: '#1f2937',
    },
    featured: true,
  },
  {
    id: 'fashion-forward',
    name: 'Fashion Forward',
    slug: 'fashion-forward',
    category: 'ecommerce',
    logo: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&q=80',
    image:
      'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80',
    rating: 4.6,
    reviewCount: 892,
    address: '456 Style Avenue, Fashion Quarter',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94103',
    coordinates: { lat: 37.7849, lng: -122.4094 },
    distance: 1.2,
    description:
      'Trendy fashion for the modern individual. Discover the latest styles and timeless classics.',
    specialties: ["Women's Fashion", "Men's Fashion", 'Accessories', 'Shoes'],
    phone: '+1 (555) 456-STYLE',
    email: 'hello@fashionforward.com',
    website: 'www.fashionforward.com',
    hours: {
      monday: '10:00 AM - 8:00 PM',
      tuesday: '10:00 AM - 8:00 PM',
      wednesday: '10:00 AM - 8:00 PM',
      thursday: '10:00 AM - 8:00 PM',
      friday: '10:00 AM - 9:00 PM',
      saturday: '10:00 AM - 9:00 PM',
      sunday: '12:00 PM - 6:00 PM',
    },
    theme: {
      primaryColor: '#be185d',
      secondaryColor: '#ec4899',
      backgroundColor: '#fdf2f8',
      textColor: '#1f2937',
    },
    featured: false,
  },
  {
    id: 'home-essentials',
    name: 'Home Essentials',
    slug: 'home-essentials',
    category: 'ecommerce',
    logo: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&q=80',
    image:
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
    rating: 4.7,
    reviewCount: 654,
    address: '789 Garden Road, Suburb Plaza',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94105',
    coordinates: { lat: 37.7949, lng: -122.3994 },
    distance: 2.1,
    description:
      'Everything you need to make your house a home. From furniture to decor and garden essentials.',
    specialties: ['Furniture', 'Home Decor', 'Garden', 'Kitchen'],
    phone: '+1 (555) 789-HOME',
    email: 'contact@homeessentials.com',
    website: 'www.homeessentials.com',
    hours: {
      monday: '8:00 AM - 7:00 PM',
      tuesday: '8:00 AM - 7:00 PM',
      wednesday: '8:00 AM - 7:00 PM',
      thursday: '8:00 AM - 7:00 PM',
      friday: '8:00 AM - 8:00 PM',
      saturday: '9:00 AM - 8:00 PM',
      sunday: '10:00 AM - 6:00 PM',
    },
    theme: {
      primaryColor: '#059669',
      secondaryColor: '#10b981',
      backgroundColor: '#f0fdf4',
      textColor: '#1f2937',
    },
    featured: true,
  },
  {
    id: 'sports-zone',
    name: 'Sports Zone',
    slug: 'sports-zone',
    category: 'ecommerce',
    logo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&q=80',
    image:
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
    rating: 4.9,
    reviewCount: 1876,
    address: '321 Athletic Drive, Sports Complex',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94107',
    coordinates: { lat: 37.7649, lng: -122.4294 },
    distance: 1.5,
    description:
      'Your ultimate destination for sports equipment, activewear, and fitness gear.',
    specialties: [
      'Sports Equipment',
      'Activewear',
      'Fitness Gear',
      'Outdoor Recreation',
    ],
    phone: '+1 (555) 321-SPORT',
    email: 'info@sportszone.com',
    website: 'www.sportszone.com',
    hours: {
      monday: '6:00 AM - 9:00 PM',
      tuesday: '6:00 AM - 9:00 PM',
      wednesday: '6:00 AM - 9:00 PM',
      thursday: '6:00 AM - 9:00 PM',
      friday: '6:00 AM - 10:00 PM',
      saturday: '7:00 AM - 10:00 PM',
      sunday: '8:00 AM - 8:00 PM',
    },
    theme: {
      primaryColor: '#dc2626',
      secondaryColor: '#ef4444',
      backgroundColor: '#fef2f2',
      textColor: '#1f2937',
    },
    featured: false,
  },
];

export const sellerDashboardData = {
  dashboardStats: {
    totalSales: {
      value: 45280,
      currency: 'USD',
      change: 12.5,
      period: 'vs last month',
    },
    totalOrders: {
      value: 342,
      change: 8.2,
      period: 'vs last month',
    },
    totalProducts: {
      value: 156,
      change: 5.1,
      period: 'vs last month',
    },
    totalCustomers: {
      value: 1248,
      change: 15.3,
      period: 'vs last month',
    },
    averageOrderValue: {
      value: 132.46,
      currency: 'USD',
      change: -2.1,
      period: 'vs last month',
    },
    storeViews: {
      value: 8967,
      change: 23.1,
      period: 'vs last month',
    },
  },

  storeStatus: {
    isLive: true,
    lastToggled: '2024-01-15 10:30 AM',
  },

  lowStockAlerts: [
    {
      id: 1,
      productName: 'Premium Wireless Headphones',
      currentStock: 3,
      threshold: 5,
      image:
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&q=80',
    },
    {
      id: 2,
      productName: 'Classic Denim Jacket',
      currentStock: 1,
      threshold: 5,
      image:
        'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=100&q=80',
    },
    {
      id: 3,
      productName: 'Luxury Leather Handbag',
      currentStock: 2,
      threshold: 5,
      image:
        'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100&q=80',
    },
  ],

  topPerformingProducts: [
    {
      id: 1,
      name: 'Premium Wireless Headphones',
      sales: 156,
      revenue: 46798.44,
      growth: 23.5,
      image:
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&q=80',
    },
    {
      id: 2,
      name: 'Smart Fitness Watch',
      sales: 89,
      revenue: 17799.11,
      growth: 15.2,
      image:
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&q=80',
    },
    {
      id: 3,
      name: 'Yoga Exercise Mat',
      sales: 134,
      revenue: 4688.66,
      growth: 8.7,
      image:
        'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=100&q=80',
    },
  ],

  salesTrendData: [
    { date: '2024-01-01', sales: 1200, orders: 15 },
    { date: '2024-01-02', sales: 1850, orders: 22 },
    { date: '2024-01-03', sales: 980, orders: 12 },
    { date: '2024-01-04', sales: 2100, orders: 28 },
    { date: '2024-01-05', sales: 1600, orders: 18 },
    { date: '2024-01-06', sales: 2350, orders: 31 },
    { date: '2024-01-07', sales: 1900, orders: 24 },
    { date: '2024-01-08', sales: 2800, orders: 35 },
    { date: '2024-01-09', sales: 2200, orders: 29 },
    { date: '2024-01-10', sales: 1750, orders: 21 },
    { date: '2024-01-11', sales: 3100, orders: 38 },
    { date: '2024-01-12', sales: 2650, orders: 33 },
    { date: '2024-01-13', sales: 1950, orders: 25 },
    { date: '2024-01-14', sales: 2450, orders: 30 },
  ],

  sellerProducts: [
    {
      id: 1,
      name: 'Premium Wireless Headphones',
      category: 'Electronics',
      price: 299.99,
      stock: 24,
      sold: 156,
      status: 'active',
      image:
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&q=80',
      createdAt: '2024-01-15',
      revenue: 46798.44,
    },
    {
      id: 2,
      name: 'Smart Fitness Watch',
      category: 'Electronics',
      price: 199.99,
      stock: 18,
      sold: 89,
      status: 'active',
      image:
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&q=80',
      createdAt: '2024-01-10',
      revenue: 17799.11,
    },
    {
      id: 3,
      name: 'Classic Denim Jacket',
      category: 'Fashion',
      price: 89.99,
      stock: 0,
      sold: 67,
      status: 'out_of_stock',
      image:
        'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=100&q=80',
      createdAt: '2024-01-05',
      revenue: 6029.33,
    },
    {
      id: 4,
      name: 'Luxury Leather Handbag',
      category: 'Fashion',
      price: 249.99,
      stock: 12,
      sold: 43,
      status: 'active',
      image:
        'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100&q=80',
      createdAt: '2024-01-12',
      revenue: 10749.57,
    },
    {
      id: 5,
      name: 'Modern Table Lamp',
      category: 'Home & Garden',
      price: 79.99,
      stock: 31,
      sold: 78,
      status: 'active',
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
      createdAt: '2024-01-08',
      revenue: 6239.22,
    },
    {
      id: 6,
      name: 'Yoga Exercise Mat',
      category: 'Sports',
      price: 34.99,
      stock: 45,
      sold: 134,
      status: 'active',
      image:
        'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=100&q=80',
      createdAt: '2024-01-03',
      revenue: 4688.66,
    },
  ],

  sellerOrders: [
    {
      id: 'ORD-2024-001',
      customerName: 'Sarah Johnson',
      customerEmail: 'sarah.j@email.com',
      products: [
        { name: 'Premium Wireless Headphones', quantity: 1, price: 299.99 },
      ],
      total: 299.99,
      status: 'completed',
      paymentStatus: 'paid',
      orderDate: '2024-01-15',
      shippingAddress: '123 Main St, New York, NY 10001',
    },
    {
      id: 'ORD-2024-002',
      customerName: 'Mike Chen',
      customerEmail: 'mike.chen@email.com',
      products: [
        { name: 'Smart Fitness Watch', quantity: 1, price: 199.99 },
        { name: 'Yoga Exercise Mat', quantity: 1, price: 34.99 },
      ],
      total: 234.98,
      status: 'shipped',
      paymentStatus: 'paid',
      orderDate: '2024-01-14',
      shippingAddress: '456 Oak Ave, Los Angeles, CA 90210',
    },
    {
      id: 'ORD-2024-003',
      customerName: 'Emily Davis',
      customerEmail: 'emily.d@email.com',
      products: [{ name: 'Luxury Leather Handbag', quantity: 1, price: 249.99 }],
      total: 249.99,
      status: 'processing',
      paymentStatus: 'paid',
      orderDate: '2024-01-14',
      shippingAddress: '789 Pine St, Chicago, IL 60601',
    },
    {
      id: 'ORD-2024-004',
      customerName: 'David Wilson',
      customerEmail: 'david.w@email.com',
      products: [{ name: 'Modern Table Lamp', quantity: 2, price: 79.99 }],
      total: 159.98,
      status: 'pending',
      paymentStatus: 'pending',
      orderDate: '2024-01-13',
      shippingAddress: '321 Elm St, Houston, TX 77001',
    },
    {
      id: 'ORD-2024-005',
      customerName: 'Lisa Anderson',
      customerEmail: 'lisa.a@email.com',
      products: [
        { name: 'Classic Denim Jacket', quantity: 1, price: 89.99 },
        { name: 'Yoga Exercise Mat', quantity: 1, price: 34.99 },
      ],
      total: 124.98,
      status: 'cancelled',
      paymentStatus: 'refunded',
      orderDate: '2024-01-12',
      shippingAddress: '654 Maple Dr, Phoenix, AZ 85001',
    },
  ],

  categoryRevenueData: [
    { category: 'Electronics', revenue: 64597.55, percentage: 52.1 },
    { category: 'Fashion', revenue: 16778.9, percentage: 13.5 },
    { category: 'Sports', revenue: 4688.66, percentage: 3.8 },
    { category: 'Home & Garden', revenue: 6239.22, percentage: 5.0 },
    { category: 'Others', revenue: 31695.67, percentage: 25.6 },
  ],

  bestSellingProducts: [
    { name: 'Premium Wireless Headphones', sold: 156, revenue: 46798.44 },
    { name: 'Yoga Exercise Mat', sold: 134, revenue: 4688.66 },
    { name: 'Smart Fitness Watch', sold: 89, revenue: 17799.11 },
    { name: 'Modern Table Lamp', sold: 78, revenue: 6239.22 },
    { name: 'Classic Denim Jacket', sold: 67, revenue: 6029.33 },
    { name: 'Luxury Leather Handbag', sold: 43, revenue: 10749.57 },
  ],

  productCategories: [
    'Electronics',
    'Fashion',
    'Home & Garden',
    'Sports',
    'Books',
    'Beauty',
    'Health',
    'Automotive',
    'Toys',
    'Other',
  ],

  recentActivity: [
    {
      id: 1,
      type: 'order',
      message: 'New order received from Sarah Johnson',
      time: '2 minutes ago',
      icon: 'shopping-cart',
    },
    {
      id: 2,
      type: 'product',
      message: 'Premium Wireless Headphones is running low on stock',
      time: '1 hour ago',
      icon: 'exclamation-triangle',
    },
    {
      id: 3,
      type: 'payment',
      message: 'Payment of $299.99 confirmed',
      time: '3 hours ago',
      icon: 'credit-card',
    },
    {
      id: 4,
      type: 'review',
      message: 'New 5-star review for Smart Fitness Watch',
      time: '5 hours ago',
      icon: 'star',
    },
  ],
};

// Utility functions for ecommerce
export const getProductsByCategory = categorySlug => {
  return ecommerceProducts.filter(product => product.category === categorySlug);
};

export const getProductById = id => {
  return ecommerceProducts.find(product => product.id === parseInt(id));
};

export const getFeaturedProducts = () => {
  return ecommerceProducts.filter(product => product.featured);
};

export const getOnSaleProducts = () => {
  return ecommerceProducts.filter(product => product.onSale);
};

export const getProductsByAvailability = availability => {
  return ecommerceProducts.filter(product => product.availability === availability);
};

export const updateProductAvailability = (productId, availability) => {
  const productIndex = ecommerceProducts.findIndex(product => product.id === productId);
  if (productIndex !== -1) {
    ecommerceProducts[productIndex].availability = availability;
    switch (availability) {
      case 'out_of_stock':
        ecommerceProducts[productIndex].stock = 0;
        break;
      case 'limited_stock':
        if (ecommerceProducts[productIndex].stock > 10) {
          ecommerceProducts[productIndex].stock = Math.floor(Math.random() * 10) + 1;
        }
        break;
      case 'pre_order':
        ecommerceProducts[productIndex].stock = 0;
        break;
      default:
        break;
    }
    return ecommerceProducts[productIndex];
  }
  return null;
};

export const getAvailabilityStatus = product => {
  if (!product) return 'unknown';

  if (product.availability === 'out_of_stock' || product.stock === 0) {
    return 'out_of_stock';
  } else if (product.availability === 'limited_stock' || product.stock <= 10) {
    return 'limited_stock';
  } else if (product.availability === 'pre_order') {
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
      return 'Out of Stock';
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
  return ecommerceVendors.filter(
    vendor =>
      vendor.city.toLowerCase() === city.toLowerCase() &&
      vendor.state.toLowerCase() === state.toLowerCase()
  );
};

export const getVendorById = id => {
  return ecommerceVendors.find(vendor => vendor.id === id);
};

export const getVendorBySlug = slug => {
  return ecommerceVendors.find(vendor => vendor.slug === slug);
};

export const getVendorByIdOrSlug = identifier => {
  const vendorBySlug = getVendorBySlug(identifier);
  if (vendorBySlug) return vendorBySlug;
  return getVendorById(identifier);
};

export const getFeaturedVendors = () => {
  return ecommerceVendors.filter(vendor => vendor.featured);
};

export const searchVendors = query => {
  const searchTerm = query.toLowerCase();
  return ecommerceVendors.filter(
    vendor =>
      vendor.name.toLowerCase().includes(searchTerm) ||
      vendor.specialties.some(specialty =>
        specialty.toLowerCase().includes(searchTerm)
      ) ||
      vendor.description.toLowerCase().includes(searchTerm)
  );
};
