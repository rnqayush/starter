/**
 * Simple script to create a test wedding website directly in the database
 * This bypasses authentication for testing purposes
 */

const mongoose = require('mongoose');
require('dotenv').config({ path: './.env' });

// Import models
const Website = require('./models/Website');
const { WeddingVendor } = require('./models/Wedding');

async function createTestWeddingWebsite() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/website_builder');
    console.log('✅ Connected to MongoDB');

    // Create a test wedding website
    const testWebsiteData = {
      websiteName: 'test-wedding-simple',
      websiteType: 'weddings',
      basicInfo: {
        tagline: 'Beautiful Wedding Services',
        businessName: 'Simple Wedding Test',
        description: 'Test wedding website'
      },
      themeColor: '#ff6b9d',
      status: 'published',
      isPublished: true,
      publishedAt: new Date(),
      userId: new mongoose.Types.ObjectId(), // Dummy user ID
    };

    // Check if website already exists
    const existingWebsite = await Website.findOne({ websiteName: testWebsiteData.websiteName });
    if (existingWebsite) {
      console.log('✅ Test wedding website already exists:', testWebsiteData.websiteName);
      console.log('🔗 Test URL: http://localhost:3000/' + testWebsiteData.websiteName);
      return;
    }

    // Create the website
    const website = new Website(testWebsiteData);
    await website.save();
    console.log('✅ Created test wedding website:', testWebsiteData.websiteName);

    // Create corresponding wedding vendor data
    const weddingVendorData = {
      websiteId: website._id,
      vendor: {
        id: testWebsiteData.websiteName,
        slug: testWebsiteData.websiteName,
        name: testWebsiteData.basicInfo.businessName,
        category: 'weddings',
        description: testWebsiteData.basicInfo.description,
        tagline: testWebsiteData.basicInfo.tagline,
        location: 'Test City, Test State',
        phone: '(555) 123-4567',
        email: 'test@example.com',
        website: 'https://example.com',
        rating: 4.8,
        reviewCount: 25,
        priceRange: '$$',
        images: {
          hero: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
          gallery: [
            'https://images.unsplash.com/photo-1519741497674-611481863552?w=400',
            'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=400'
          ]
        },
        services: [
          {
            name: 'Wedding Planning',
            description: 'Complete wedding planning services',
            price: 2500
          },
          {
            name: 'Day-of Coordination',
            description: 'Wedding day coordination',
            price: 800
          }
        ],
        packages: [
          {
            name: 'Basic Package',
            description: 'Essential wedding services',
            price: 3000,
            features: ['Planning consultation', 'Vendor coordination', 'Timeline creation']
          }
        ]
      }
    };

    const weddingVendor = new WeddingVendor(weddingVendorData);
    await weddingVendor.save();
    console.log('✅ Created wedding vendor data');

    // Update website with published data reference
    website.publishedDataId = weddingVendor._id;
    await website.save();
    console.log('✅ Linked website to wedding vendor data');

    console.log('\n🎉 Test wedding website created successfully!');
    console.log('🔗 Test URL: http://localhost:3000/' + testWebsiteData.websiteName);
    console.log('\nNow test the SmartRouter by visiting the URL above.');

  } catch (error) {
    console.error('❌ Error creating test wedding website:', error);
  } finally {
    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
    process.exit(0);
  }
}

// Run the script
createTestWeddingWebsite();
