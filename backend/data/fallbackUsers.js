// Fallback in-memory user store for demo when MongoDB is not available
const bcrypt = require('bcryptjs');

// Helper function to hash passwords
const hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

let users = [
  {
    _id: "64f1a2b3c4d5e6f7a8b9c0d1",
    email: "admin@storebuilder.com",
    password: hashPassword("admin123"),
    firstName: "Admin",
    lastName: "User",
    role: "admin",
    businessName: "StoreBuilder Platform",
    businessCategory: "services",
    phone: "+1-555-0101",
    address: "123 Admin Street, Tech City, TC 12345",
    website: "https://storebuilder.com",
    avatar: "https://via.placeholder.com/100x100/4F46E5/ffffff?text=AU",
    isActive: true,
    permissions: ["all"],
    createdAt: new Date("2024-01-01T00:00:00Z"),
    updatedAt: new Date("2024-01-01T00:00:00Z"),
    lastLogin: new Date("2024-01-15T10:30:00Z"),
    loginAttempts: 0,
    emailVerified: true
  },
  {
    _id: "64f1a2b3c4d5e6f7a8b9c0d2",
    email: "john.doe@hotel.com",
    password: hashPassword("hotel123"),
    firstName: "John",
    lastName: "Doe",
    role: "business_owner",
    businessName: "Grand Plaza Hotel",
    businessCategory: "hotels",
    phone: "+1-555-0201",
    address: "456 Hotel Avenue, Resort City, RC 67890",
    website: "https://grandplazahotel.com",
    avatar: "https://via.placeholder.com/100x100/059669/ffffff?text=JD",
    isActive: true,
    permissions: ["manage_hotels", "manage_bookings"],
    createdAt: new Date("2024-01-02T09:15:00Z"),
    updatedAt: new Date("2024-01-02T09:15:00Z"),
    lastLogin: new Date("2024-01-15T08:45:00Z"),
    loginAttempts: 0,
    emailVerified: true
  },
  {
    _id: "64f1a2b3c4d5e6f7a8b9c0d3",
    email: "sarah.smith@shop.com",
    password: hashPassword("shop123"),
    firstName: "Sarah",
    lastName: "Smith",
    role: "business_owner",
    businessName: "Fashion Forward Store",
    businessCategory: "ecommerce",
    phone: "+1-555-0301",
    address: "789 Commerce Street, Shop Town, ST 34567",
    website: "https://fashionforward.com",
    avatar: "https://via.placeholder.com/100x100/DC2626/ffffff?text=SS",
    isActive: true,
    permissions: ["manage_products", "manage_orders"],
    createdAt: new Date("2024-01-03T14:20:00Z"),
    updatedAt: new Date("2024-01-03T14:20:00Z"),
    lastLogin: new Date("2024-01-14T16:30:00Z"),
    loginAttempts: 0,
    emailVerified: true
  },
  {
    _id: "64f1a2b3c4d5e6f7a8b9c0d4",
    email: "customer1@email.com",
    password: hashPassword("customer123"),
    firstName: "Lisa",
    lastName: "Wilson",
    role: "customer",
    businessName: "",
    businessCategory: "",
    phone: "+1-555-0701",
    address: "123 Customer Lane, User City, UC 98765",
    website: "",
    avatar: "https://via.placeholder.com/100x100/10B981/ffffff?text=LW",
    isActive: true,
    permissions: ["browse", "purchase"],
    createdAt: new Date("2024-01-07T15:30:00Z"),
    updatedAt: new Date("2024-01-07T15:30:00Z"),
    lastLogin: new Date("2024-01-15T18:45:00Z"),
    loginAttempts: 0,
    emailVerified: true
  }
];

// Mock user operations
const findByEmail = async (email) => {
  return users.find(user => user.email.toLowerCase() === email.toLowerCase());
};

const findById = async (id) => {
  return users.find(user => user._id === id);
};

const create = async (userData) => {
  const newUser = {
    _id: generateObjectId(),
    ...userData,
    password: bcrypt.hashSync(userData.password, 10),
    createdAt: new Date(),
    updatedAt: new Date(),
    lastLogin: new Date(),
    loginAttempts: 0,
    emailVerified: false,
    avatar: `https://via.placeholder.com/100x100/4F46E5/ffffff?text=${userData.firstName.charAt(0)}${userData.lastName.charAt(0)}`
  };
  
  users.push(newUser);
  return sanitizeUser(newUser);
};

const findByIdAndUpdate = async (id, updates) => {
  const userIndex = users.findIndex(user => user._id === id);
  if (userIndex === -1) return null;
  
  users[userIndex] = {
    ...users[userIndex],
    ...updates.$set,
    updatedAt: new Date()
  };
  
  return sanitizeUser(users[userIndex]);
};

const find = async (filter = {}) => {
  let filteredUsers = [...users];
  
  if (filter.role) {
    filteredUsers = filteredUsers.filter(user => user.role === filter.role);
  }
  if (filter.businessCategory) {
    filteredUsers = filteredUsers.filter(user => user.businessCategory === filter.businessCategory);
  }
  if (filter.isActive !== undefined) {
    filteredUsers = filteredUsers.filter(user => user.isActive === filter.isActive);
  }
  
  return filteredUsers.map(sanitizeUser);
};

const countDocuments = async (filter = {}) => {
  const filtered = await find(filter);
  return filtered.length;
};

const comparePassword = async (candidatePassword, hashedPassword) => {
  return bcrypt.compare(candidatePassword, hashedPassword);
};

// Helper functions
const generateObjectId = () => {
  return Date.now().toString(16) + Math.random().toString(16).substring(2);
};

const sanitizeUser = (user) => {
  if (!user) return null;
  
  const { password, ...sanitizedUser } = user;
  return {
    ...sanitizedUser,
    toJSON: () => sanitizedUser,
    comparePassword: (candidatePassword) => comparePassword(candidatePassword, user.password),
    isLocked: false
  };
};

// Mock User model
const FallbackUser = {
  findByEmail,
  findById,
  create,
  findByIdAndUpdate,
  find: (filter) => ({
    sort: () => ({
      limit: () => ({
        skip: () => find(filter)
      })
    }),
    lean: () => find(filter)
  }),
  findOne: findByEmail,
  countDocuments,
  getStats: async () => ({
    totalUsers: users.length,
    activeUsers: users.filter(u => u.isActive).length,
    usersByRole: users.reduce((acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    }, {}),
    usersByCategory: users.reduce((acc, user) => {
      if (user.businessCategory) {
        acc[user.businessCategory] = (acc[user.businessCategory] || 0) + 1;
      }
      return acc;
    }, {}),
    recentUsers: users.slice(-5).map(sanitizeUser)
  })
};

module.exports = FallbackUser;
