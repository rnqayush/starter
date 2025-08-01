# MongoDB Setup for StoreBuilder Backend

## Prerequisites

You need to have MongoDB installed on your local machine.

### Install MongoDB

#### macOS (using Homebrew)

```bash
# Install MongoDB Community Edition
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB service
brew services start mongodb/brew/mongodb-community
```

#### Ubuntu/Debian

```bash
# Import the public key
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -

# Create list file
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Update package database
sudo apt-get update

# Install MongoDB
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod
```

#### Windows

1. Download MongoDB Community Server from https://www.mongodb.com/try/download/community
2. Run the installer and follow the setup wizard
3. MongoDB should start automatically as a Windows service

## Quick Start

### 1. Start MongoDB (if not running)

**macOS:**

```bash
brew services start mongodb/brew/mongodb-community
```

**Linux:**

```bash
sudo systemctl start mongod
```

**Windows:**
MongoDB should start automatically. If not, start the "MongoDB" service from Services.

### 2. Verify MongoDB is Running

```bash
# Connect to MongoDB shell
mongosh

# You should see something like:
# Current Mongosh Log ID: 64f...
# Connecting to: mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.x.x
# Using MongoDB: 6.x.x
```

### 3. Create Database (Optional)

MongoDB will create the database automatically when first used, but you can create it manually:

```bash
# In mongosh
use storebuilder

# Verify database creation
show dbs
```

### 4. Start the Backend Server

```bash
# Navigate to backend directory
cd backend

# Start server (will connect to MongoDB and seed users)
npm start
# or for development
npm run dev
```

## Expected Startup Logs

When you start the backend server, you should see:

```
🍃 MongoDB Connected: 127.0.0.1
📊 Database: storebuilder
✅ Mongoose connected to MongoDB
🌱 Seeding users to database...
✅ Successfully seeded 10 users to database
👤 Test accounts available:
   📧 admin@storebuilder.com / admin123 (Admin)
   📧 john.doe@hotel.com / hotel123 (Hotel Owner)
   📧 sarah.smith@shop.com / shop123 (Ecommerce Owner)
   📧 customer1@email.com / customer123 (Customer)
🚀 StoreBuilder API server running on port 3001
📊 Environment: development
🔗 CORS enabled for: http://localhost:3000
📡 Health check: http://localhost:3001/health
💾 Database: MongoDB connected
🎯 Ready to accept requests!
```

## Database Structure

The backend will create these collections:

- **users**: User accounts with authentication data
  - Indexes on: email, role, businessCategory, isActive, createdAt

## Test the Setup

### 1. Health Check

```bash
curl http://localhost:3001/health
```

### 2. Test Registration

```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123",
    "firstName": "Test",
    "lastName": "User",
    "businessName": "Test Business",
    "businessCategory": "ecommerce"
  }'
```

### 3. Test Login

```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@storebuilder.com",
    "password": "admin123"
  }'
```

## MongoDB GUI Tools (Optional)

For easier database management, you can use:

### MongoDB Compass (Official GUI)

```bash
# Download from: https://www.mongodb.com/products/compass
```

### Studio 3T (Third-party)

```bash
# Download from: https://studio3t.com/
```

## Environment Variables

Make sure your `.env` file has:

```bash
MONGODB_URI=mongodb://localhost:27017/storebuilder
DB_NAME=storebuilder
```

## Troubleshooting

### Connection Refused Error

```
❌ MongoDB connection failed: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution:** Start MongoDB service

- macOS: `brew services start mongodb/brew/mongodb-community`
- Linux: `sudo systemctl start mongod`
- Windows: Start "MongoDB" service

### Authentication Failed

```
❌ MongoDB connection failed: Authentication failed
```

**Solution:** Check if MongoDB requires authentication. For local development, authentication is usually disabled by default.

### Database Not Created

The database will be created automatically when the first document is inserted. No manual creation needed.

### Users Not Seeding

If users aren't being seeded:

1. Check if users already exist in the database
2. Clear the users collection: `db.users.deleteMany({})`
3. Restart the server

## MongoDB Commands

### View Collections

```bash
mongosh
use storebuilder
show collections
```

### View Users

```bash
db.users.find().pretty()
```

### Count Users

```bash
db.users.count()
```

### Clear Users (for testing)

```bash
db.users.deleteMany({})
```

### Find User by Email

```bash
db.users.findOne({email: "admin@storebuilder.com"})
```

## Production Considerations

For production deployment:

1. **Use MongoDB Atlas** (cloud) or set up MongoDB on a server
2. **Enable authentication** with username/password
3. **Use environment variables** for sensitive data
4. **Set up proper indexes** for performance
5. **Configure backup strategies**
6. **Monitor database performance**

## Data Persistence

Your data will persist between server restarts. The database files are stored in:

- **macOS**: `/usr/local/var/mongodb`
- **Linux**: `/var/lib/mongodb`
- **Windows**: `C:\Program Files\MongoDB\Server\6.0\data`
