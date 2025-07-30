const mongoose = require('mongoose');
const dotenv = require('dotenv');
const hotelSeeder = require('../seeds/hotelSeeder');

// Load environment variables
dotenv.config();

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/multi-business-platform', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('🔗 MongoDB Connected for seeding');

    // Run hotel seeder
    await hotelSeeder();

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

