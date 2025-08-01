const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const compression = require('compression');
require('dotenv').config();

const { connectDB } = require('./config/database');
const { seedUsers } = require('./seeders/userSeeder');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

const app = express();
const PORT = process.env.PORT || 3001;

// Global flag to track database connection
global.isMongoConnected = false;

// Security Middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.'
  }
});

app.use('/api/', limiter);

// CORS configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Logging
app.use(morgan('combined'));

// Compression
app.use(compression());

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'StoreBuilder API is running!',
    timestamp: new Date().toISOString(),
    version: process.env.API_VERSION || 'v1',
    database: global.isMongoConnected ? 'MongoDB' : 'Fallback (In-Memory)',
    status: global.isMongoConnected ? 'connected' : 'using_fallback'
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to StoreBuilder API',
    version: process.env.API_VERSION || 'v1',
    database: global.isMongoConnected ? 'MongoDB' : 'Fallback (In-Memory)',
    endpoints: {
      health: '/health',
      auth: '/api/auth',
      users: '/api/users'
    }
  });
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Connect to MongoDB and start server
const startServer = async () => {
  try {
    console.log('🚀 Starting StoreBuilder API server...');
    
    // Try to connect to MongoDB
    try {
      await connectDB();
      global.isMongoConnected = true;
      console.log('💾 MongoDB connection successful');
      
      // Seed initial users (only if database is empty)
      await seedUsers();
    } catch (mongoError) {
      console.warn('⚠️  MongoDB connection failed:', mongoError.message);
      console.warn('🔄 Falling back to in-memory data store for demo purposes');
      console.warn('💡 To use MongoDB:');
      console.warn('   1. Install MongoDB: https://docs.mongodb.com/manual/installation/');
      console.warn('   2. Start MongoDB service');
      console.warn('   3. Restart this server');
      global.isMongoConnected = false;
    }
    
    // Start server regardless of database connection
    app.listen(PORT, () => {
      console.log(`🚀 StoreBuilder API server running on port ${PORT}`);
      console.log(`📊 Environment: ${process.env.NODE_ENV}`);
      console.log(`🔗 CORS enabled for: ${process.env.CORS_ORIGIN}`);
      console.log(`📡 Health check: http://localhost:${PORT}/health`);
      console.log(`💾 Database: ${global.isMongoConnected ? 'MongoDB' : 'Fallback (In-Memory)'}`);
      
      if (global.isMongoConnected) {
        console.log('✅ Ready to accept requests with MongoDB!');
      } else {
        console.log('⚠️  Ready to accept requests with fallback data store!');
        console.log('🔑 Demo accounts available:');
        console.log('   📧 admin@storebuilder.com / admin123 (Admin)');
        console.log('   📧 john.doe@hotel.com / hotel123 (Hotel Owner)');
        console.log('   📧 sarah.smith@shop.com / shop123 (Ecommerce Owner)');
        console.log('   📧 customer1@email.com / customer123 (Customer)');
      }
      
      console.log(`🎯 API is ready!`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();

module.exports = app;
