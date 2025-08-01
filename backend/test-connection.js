const { connectDB, closeDB } = require('./config/database');
const User = require('./models/User');

const testConnection = async () => {
  try {
    console.log('🧪 Testing MongoDB connection...');
    
    // Connect to database
    await connectDB();
    
    // Test user creation
    console.log('👤 Testing user operations...');
    
    // Check if test user already exists
    const existingUser = await User.findOne({ email: 'test@mongodb.com' });
    if (existingUser) {
      console.log('🗑️  Removing existing test user...');
      await User.deleteOne({ email: 'test@mongodb.com' });
    }
    
    // Create test user
    const testUser = await User.create({
      email: 'test@mongodb.com',
      password: 'test123',
      firstName: 'Test',
      lastName: 'User',
      role: 'customer'
    });
    console.log('✅ Test user created:', testUser.email);
    
    // Test login (password comparison)
    const foundUser = await User.findByEmail('test@mongodb.com');
    const passwordMatch = await foundUser.comparePassword('test123');
    console.log('🔐 Password validation:', passwordMatch ? 'PASS' : 'FAIL');
    
    // Test user update
    foundUser.firstName = 'Updated';
    await foundUser.save();
    console.log('📝 User update: PASS');
    
    // Test user stats
    const stats = await User.getStats();
    console.log('📊 User stats:', {
      total: stats.totalUsers,
      active: stats.activeUsers
    });
    
    // Clean up test user
    await User.deleteOne({ email: 'test@mongodb.com' });
    console.log('🧹 Test user cleaned up');
    
    // Close connection
    await closeDB();
    
    console.log('✅ All tests passed! MongoDB integration is working correctly.');
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    
    if (error.name === 'MongoNetworkError') {
      console.error('💡 Make sure MongoDB is running:');
      console.error('   macOS: brew services start mongodb/brew/mongodb-community');
      console.error('   Linux: sudo systemctl start mongod');
      console.error('   Windows: Start MongoDB service');
    }
    
    process.exit(1);
  }
};

// Run the test
testConnection();
