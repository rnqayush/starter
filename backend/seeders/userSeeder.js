const { User } = require('../models');

const seedUsers = async () => {
  try {
    // Check if users already exist
    const existingUsers = await User.countDocuments();
    if (existingUsers > 0) {
      console.log('✅ Users already exist in database. Skipping seed.');
      return false;
    }

    console.log('🌱 Seeding users to database...');

    const users = [
      {
        email: 'admin@storebuilder.com',
        password: 'admin123',
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin',
        businessName: 'StoreBuilder Platform',
        businessCategory: 'services',
        phone: '+1-555-0101',
        address: '123 Admin Street, Tech City, TC 12345',
        website: 'https://storebuilder.com',
        isActive: true,
        permissions: ['all'],
        emailVerified: true,
      },
      {
        email: 'john.doe@hotel.com',
        password: 'hotel123',
        firstName: 'John',
        lastName: 'Doe',
        role: 'business_owner',
        businessName: 'Grand Plaza Hotel',
        businessCategory: 'hotels',
        phone: '+1-555-0201',
        address: '456 Hotel Avenue, Resort City, RC 67890',
        website: 'https://grandplazahotel.com',
        isActive: true,
        permissions: ['manage_hotels', 'manage_bookings'],
        emailVerified: true,
      },
      {
        email: 'sarah.smith@shop.com',
        password: 'shop123',
        firstName: 'Sarah',
        lastName: 'Smith',
        role: 'business_owner',
        businessName: 'Fashion Forward Store',
        businessCategory: 'ecommerce',
        phone: '+1-555-0301',
        address: '789 Commerce Street, Shop Town, ST 34567',
        website: 'https://fashionforward.com',
        isActive: true,
        permissions: ['manage_products', 'manage_orders'],
        emailVerified: true,
      },
      {
        email: 'mike.johnson@wedding.com',
        password: 'wedding123',
        firstName: 'Mike',
        lastName: 'Johnson',
        role: 'business_owner',
        businessName: 'Dream Weddings',
        businessCategory: 'weddings',
        phone: '+1-555-0401',
        address: '321 Wedding Lane, Love City, LC 78901',
        website: 'https://dreamweddings.com',
        isActive: true,
        permissions: ['manage_events', 'manage_vendors'],
        emailVerified: true,
      },
      {
        email: 'alex.brown@auto.com',
        password: 'auto123',
        firstName: 'Alex',
        lastName: 'Brown',
        role: 'business_owner',
        businessName: 'Premium Auto Dealers',
        businessCategory: 'automobiles',
        phone: '+1-555-0501',
        address: '654 Auto Street, Car City, CC 45678',
        website: 'https://premiumauto.com',
        isActive: true,
        permissions: ['manage_vehicles', 'manage_inventory'],
        emailVerified: true,
      },
      {
        email: 'emily.davis@consulting.com',
        password: 'business123',
        firstName: 'Emily',
        lastName: 'Davis',
        role: 'business_owner',
        businessName: 'Davis Consulting Group',
        businessCategory: 'services',
        phone: '+1-555-0601',
        address: '987 Business Blvd, Corporate City, CC 56789',
        website: 'https://davisconsulting.com',
        isActive: true,
        permissions: ['manage_services', 'manage_clients'],
        emailVerified: true,
      },
      {
        email: 'customer1@email.com',
        password: 'customer123',
        firstName: 'Lisa',
        lastName: 'Wilson',
        role: 'customer',
        businessName: '',
        businessCategory: '',
        phone: '+1-555-0701',
        address: '123 Customer Lane, User City, UC 98765',
        website: '',
        isActive: true,
        permissions: ['browse', 'purchase'],
        emailVerified: true,
      },
      {
        email: 'customer2@email.com',
        password: 'customer123',
        firstName: 'David',
        lastName: 'Garcia',
        role: 'customer',
        businessName: '',
        businessCategory: '',
        phone: '+1-555-0801',
        address: '456 Buyer Street, Customer Town, CT 87654',
        website: '',
        isActive: true,
        permissions: ['browse', 'purchase'],
        emailVerified: true,
      },
      {
        email: 'demo@storebuilder.com',
        password: 'demo123',
        firstName: 'Demo',
        lastName: 'Account',
        role: 'demo',
        businessName: 'Demo Business',
        businessCategory: 'other',
        phone: '+1-555-0901',
        address: '789 Demo Drive, Test City, TC 76543',
        website: 'https://demo.storebuilder.com',
        isActive: true,
        permissions: ['limited_access'],
        emailVerified: true,
      },
      {
        email: 'jane.restaurant@food.com',
        password: 'food123',
        firstName: 'Jane',
        lastName: 'Miller',
        role: 'business_owner',
        businessName: "Miller's Fine Dining",
        businessCategory: 'restaurants',
        phone: '+1-555-1001',
        address: '321 Food Street, Dining City, DC 65432',
        website: 'https://millersfinedining.com',
        isActive: true,
        permissions: ['manage_menu', 'manage_orders'],
        emailVerified: true,
      },
    ];

    // Create users with automatic password hashing
    const createdUsers = await User.create(users);

    console.log(
      `✅ Successfully seeded ${createdUsers.length} users to database`
    );
    console.log('👤 Test accounts available:');
    console.log('   📧 admin@storebuilder.com / admin123 (Admin)');
    console.log('   📧 john.doe@hotel.com / hotel123 (Hotel Owner)');
    console.log('   📧 sarah.smith@shop.com / shop123 (Ecommerce Owner)');
    console.log('   📧 customer1@email.com / customer123 (Customer)');

    return true;
  } catch (error) {
    console.error('❌ Error seeding users:', error);
    throw error;
  }
};

const clearUsers = async () => {
  try {
    const result = await User.deleteMany({});
    console.log(`🗑️  Cleared ${result.deletedCount} users from database`);
    return result.deletedCount;
  } catch (error) {
    console.error('❌ Error clearing users:', error);
    throw error;
  }
};

module.exports = {
  seedUsers,
  clearUsers,
};
