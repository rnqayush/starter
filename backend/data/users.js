const bcrypt = require('bcryptjs');

// Helper function to hash passwords
const hashPassword = password => {
  return bcrypt.hashSync(password, 10);
};

const users = [
  {
    id: 'user_001',
    email: 'admin@storebuilder.com',
    password: hashPassword('admin123'),
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    businessName: 'StoreBuilder Platform',
    businessCategory: 'services',
    phone: '+1-555-0101',
    address: '123 Admin Street, Tech City, TC 12345',
    website: 'https://storebuilder.com',
    avatar: 'https://via.placeholder.com/100x100/4F46E5/ffffff?text=AU',
    isActive: true,
    permissions: ['all'],
    createdAt: '2024-01-01T00:00:00Z',
    lastLogin: '2024-01-15T10:30:00Z',
  },
  {
    id: 'user_002',
    email: 'john.doe@hotel.com',
    password: hashPassword('hotel123'),
    firstName: 'John',
    lastName: 'Doe',
    role: 'business_owner',
    businessName: 'Grand Plaza Hotel',
    businessCategory: 'hotels',
    phone: '+1-555-0201',
    address: '456 Hotel Avenue, Resort City, RC 67890',
    website: 'https://grandplazahotel.com',
    avatar: 'https://via.placeholder.com/100x100/059669/ffffff?text=JD',
    isActive: true,
    permissions: ['manage_hotels', 'manage_bookings'],
    createdAt: '2024-01-02T09:15:00Z',
    lastLogin: '2024-01-15T08:45:00Z',
  },
  {
    id: 'user_003',
    email: 'sarah.smith@shop.com',
    password: hashPassword('shop123'),
    firstName: 'Sarah',
    lastName: 'Smith',
    role: 'business_owner',
    businessName: 'Fashion Forward Store',
    businessCategory: 'ecommerce',
    phone: '+1-555-0301',
    address: '789 Commerce Street, Shop Town, ST 34567',
    website: 'https://fashionforward.com',
    avatar: 'https://via.placeholder.com/100x100/DC2626/ffffff?text=SS',
    isActive: true,
    permissions: ['manage_products', 'manage_orders'],
    createdAt: '2024-01-03T14:20:00Z',
    lastLogin: '2024-01-14T16:30:00Z',
  },
  {
    id: 'user_004',
    email: 'mike.johnson@wedding.com',
    password: hashPassword('wedding123'),
    firstName: 'Mike',
    lastName: 'Johnson',
    role: 'business_owner',
    businessName: 'Dream Weddings',
    businessCategory: 'weddings',
    phone: '+1-555-0401',
    address: '321 Wedding Lane, Love City, LC 78901',
    website: 'https://dreamweddings.com',
    avatar: 'https://via.placeholder.com/100x100/7C3AED/ffffff?text=MJ',
    isActive: true,
    permissions: ['manage_events', 'manage_vendors'],
    createdAt: '2024-01-04T11:30:00Z',
    lastLogin: '2024-01-13T12:15:00Z',
  },
  {
    id: 'user_005',
    email: 'alex.brown@auto.com',
    password: hashPassword('auto123'),
    firstName: 'Alex',
    lastName: 'Brown',
    role: 'business_owner',
    businessName: 'Premium Auto Dealers',
    businessCategory: 'automobiles',
    phone: '+1-555-0501',
    address: '654 Auto Street, Car City, CC 45678',
    website: 'https://premiumauto.com',
    avatar: 'https://via.placeholder.com/100x100/F59E0B/ffffff?text=AB',
    isActive: true,
    permissions: ['manage_vehicles', 'manage_inventory'],
    createdAt: '2024-01-05T13:45:00Z',
    lastLogin: '2024-01-12T09:20:00Z',
  },
  {
    id: 'user_006',
    email: 'emily.davis@consulting.com',
    password: hashPassword('business123'),
    firstName: 'Emily',
    lastName: 'Davis',
    role: 'business_owner',
    businessName: 'Davis Consulting Group',
    businessCategory: 'services',
    phone: '+1-555-0601',
    address: '987 Business Blvd, Corporate City, CC 56789',
    website: 'https://davisconsulting.com',
    avatar: 'https://via.placeholder.com/100x100/EC4899/ffffff?text=ED',
    isActive: true,
    permissions: ['manage_services', 'manage_clients'],
    createdAt: '2024-01-06T10:00:00Z',
    lastLogin: '2024-01-11T14:50:00Z',
  },
  {
    id: 'user_007',
    email: 'customer1@email.com',
    password: hashPassword('customer123'),
    firstName: 'Lisa',
    lastName: 'Wilson',
    role: 'customer',
    businessName: '',
    businessCategory: '',
    phone: '+1-555-0701',
    address: '123 Customer Lane, User City, UC 98765',
    website: '',
    avatar: 'https://via.placeholder.com/100x100/10B981/ffffff?text=LW',
    isActive: true,
    permissions: ['browse', 'purchase'],
    createdAt: '2024-01-07T15:30:00Z',
    lastLogin: '2024-01-15T18:45:00Z',
  },
  {
    id: 'user_008',
    email: 'customer2@email.com',
    password: hashPassword('customer123'),
    firstName: 'David',
    lastName: 'Garcia',
    role: 'customer',
    businessName: '',
    businessCategory: '',
    phone: '+1-555-0801',
    address: '456 Buyer Street, Customer Town, CT 87654',
    website: '',
    avatar: 'https://via.placeholder.com/100x100/3B82F6/ffffff?text=DG',
    isActive: true,
    permissions: ['browse', 'purchase'],
    createdAt: '2024-01-08T12:15:00Z',
    lastLogin: '2024-01-14T20:30:00Z',
  },
  {
    id: 'user_009',
    email: 'demo@storebuilder.com',
    password: hashPassword('demo123'),
    firstName: 'Demo',
    lastName: 'Account',
    role: 'demo',
    businessName: 'Demo Business',
    businessCategory: 'other',
    phone: '+1-555-0901',
    address: '789 Demo Drive, Test City, TC 76543',
    website: 'https://demo.storebuilder.com',
    avatar: 'https://via.placeholder.com/100x100/8B5CF6/ffffff?text=DA',
    isActive: true,
    permissions: ['limited_access'],
    createdAt: '2024-01-09T16:00:00Z',
    lastLogin: '2024-01-15T11:20:00Z',
  },
  {
    id: 'user_010',
    email: 'jane.restaurant@food.com',
    password: hashPassword('food123'),
    firstName: 'Jane',
    lastName: 'Miller',
    role: 'business_owner',
    businessName: "Miller's Fine Dining",
    businessCategory: 'restaurants',
    phone: '+1-555-1001',
    address: '321 Food Street, Dining City, DC 65432',
    website: 'https://millersfinedining.com',
    avatar: 'https://via.placeholder.com/100x100/EF4444/ffffff?text=JM',
    isActive: true,
    permissions: ['manage_menu', 'manage_orders'],
    createdAt: '2024-01-10T09:45:00Z',
    lastLogin: '2024-01-13T17:15:00Z',
  },
];

// Helper functions
const getUserByEmail = email => {
  return users.find(user => user.email.toLowerCase() === email.toLowerCase());
};

const getUserById = id => {
  return users.find(user => user.id === id);
};

const getUsersByRole = role => {
  return users.filter(user => user.role === role);
};

const getActiveUsers = () => {
  return users.filter(user => user.isActive === true);
};

const getUsersByBusinessCategory = category => {
  return users.filter(user => user.businessCategory === category);
};

// Remove password from user object for safe response
const sanitizeUser = user => {
  const { password, ...sanitizedUser } = user;
  return sanitizedUser;
};

const sanitizeUsers = users => {
  return users.map(user => sanitizeUser(user));
};

module.exports = {
  users,
  getUserByEmail,
  getUserById,
  getUsersByRole,
  getActiveUsers,
  getUsersByBusinessCategory,
  sanitizeUser,
  sanitizeUsers,
};
