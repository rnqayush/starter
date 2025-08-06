#!/usr/bin/env node

/**
 * Backend Server Startup Script
 * This script ensures the backend server starts correctly with proper error handling
 */

const path = require('path');
const fs = require('fs');

// Check if required files exist
const requiredFiles = [
  'server.js',
  'package.json',
  '.env'
];

console.log('🔍 Checking required files...');
for (const file of requiredFiles) {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Missing required file: ${file}`);
    if (file === '.env') {
      console.log('💡 Creating default .env file...');
      const defaultEnv = `# Backend Environment Variables
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/website_builder
FRONTEND_URL=http://localhost:3000
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-this-in-production
`;
      fs.writeFileSync(filePath, defaultEnv);
      console.log('✅ Created default .env file');
    } else {
      process.exit(1);
    }
  }
}

// Check if node_modules exists
const nodeModulesPath = path.join(__dirname, 'node_modules');
if (!fs.existsSync(nodeModulesPath)) {
  console.log('📦 Installing dependencies...');
  const { execSync } = require('child_process');
  try {
    execSync('npm install', { stdio: 'inherit', cwd: __dirname });
    console.log('✅ Dependencies installed');
  } catch (error) {
    console.error('❌ Failed to install dependencies:', error.message);
    process.exit(1);
  }
}

// Start the server
console.log('🚀 Starting backend server...');
try {
  require('./server.js');
} catch (error) {
  console.error('❌ Failed to start server:', error.message);
  console.error('Stack trace:', error.stack);
  process.exit(1);
}
