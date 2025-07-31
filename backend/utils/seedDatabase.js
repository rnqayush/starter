const mongoose = require('mongoose');
const dotenv = require('dotenv');
const hotelSeeder = require('../seeds/hotelSeeder');
const enhancedHotelSeeder = require('../seeds/enhancedHotelSeeder');

// Load environment variables
dotenv.config();

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/multi-business-backend', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('🔗 MongoDB Connected for seeding');

    // Check command line arguments for seeder type
    const args = process.argv.slice(2);
    const useEnhanced = args.includes('--enhanced') || args.includes('-e');

    if (useEnhanced) {
      console.log('🚀 Running enhanced hotel seeder...');
      await enhancedHotelSeeder();
    } else {
      console.log('🏨 Running basic hotel seeder...');
      await hotelSeeder();
    }

    console.log('✅ Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run seeder if called directly
if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;
