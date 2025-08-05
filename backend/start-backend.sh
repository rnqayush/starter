#!/bin/bash

# Backend startup script for the website builder project

echo "🚀 Starting Website Builder Backend..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if we're in the backend directory
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found. Make sure you're running this script from the backend directory."
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install dependencies."
        exit 1
    fi
    echo "✅ Dependencies installed successfully!"
    echo ""
fi

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file from .env.example..."
    cp .env.example .env
    echo "✅ .env file created! Please update it with your configuration."
    echo ""
fi

# Check if MongoDB is running (optional check)
echo "🔍 Checking MongoDB connection..."
if ! nc -z localhost 27017 2>/dev/null; then
    echo "⚠️  MongoDB is not running on localhost:27017"
    echo "   Please start MongoDB or update MONGODB_URI in .env file"
    echo ""
fi

echo "🎯 Starting the backend server..."
echo "   Frontend URL: http://localhost:3000"
echo "   Backend URL: http://localhost:5000"
echo "   API Base: http://localhost:5000/api"
echo ""
echo "📋 Available endpoints:"
echo "   GET  /api/health - Server health check"
echo "   POST /api/auth/register - User registration"
echo "   POST /api/auth/login - User login"
echo "   POST /api/websites/start-building - Create website from start-building"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Start the server
npm run dev
