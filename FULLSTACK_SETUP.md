# StoreBuilder Full Stack Setup

## Overview

The StoreBuilder platform now consists of:
- **Frontend**: React app with Redux Toolkit (Port 3000)
- **Backend**: Node.js Express API with MongoDB (Port 3001)
- **Database**: MongoDB (localhost:27017) with fallback to in-memory storage

## Prerequisites

### MongoDB Setup (Recommended)

The backend uses MongoDB for data persistence. While it has a fallback mode, MongoDB is recommended for full functionality.

#### Install MongoDB

**macOS (using Homebrew):**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb/brew/mongodb-community
```

**Ubuntu/Debian:**
```bash
# Import public key and add repository
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Install and start MongoDB
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod
```

**Windows:**
1. Download from https://www.mongodb.com/try/download/community
2. Run installer and follow setup wizard
3. MongoDB starts automatically as a Windows service

#### Verify MongoDB Installation
```bash
# Test connection
mongosh
# Should connect to: mongodb://127.0.0.1:27017
```

## Quick Start

### 1. Start the Backend API

```bash
# Navigate to backend directory
cd backend

# Install dependencies (first time only)
npm install

# Start the backend server
npm start
# or for development with auto-reload
npm run dev
```

**Expected startup output:**
- ✅ **With MongoDB**: `MongoDB Connected` + `Successfully seeded X users`
- ⚠️ **Without MongoDB**: `MongoDB connection failed` + `Falling back to in-memory data store`

The backend will start on `http://localhost:3001` regardless of MongoDB availability.

### 2. Start the Frontend

```bash
# In a new terminal, navigate to project root
cd ..

# Start the React app (should already be running)
npm start
```

The frontend will start on `http://localhost:3000`

## API Integration

The frontend now uses real API calls instead of mock data:

### Authentication Endpoints
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration  
- `GET /api/auth/me` - Get current user
- `POST /api/auth/verify` - Verify JWT token
- `POST /api/auth/logout` - User logout

### User Management Endpoints
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user profile
- `DELETE /api/users/:id` - Delete user (admin only)
- `GET /api/users/admin/stats` - User statistics (admin only)

## Test Users

You can login with these pre-configured accounts:

| Email | Password | Role | Business Category |
|-------|----------|------|-------------------|
| admin@storebuilder.com | admin123 | admin | services |
| john.doe@hotel.com | hotel123 | business_owner | hotels |
| sarah.smith@shop.com | shop123 | business_owner | ecommerce |
| mike.johnson@wedding.com | wedding123 | business_owner | weddings |
| alex.brown@auto.com | auto123 | business_owner | automobiles |
| customer1@email.com | customer123 | customer | - |

## API Response Format

All API responses follow this structure:

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "user": { /* user object */ },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "errors": [/* validation errors if any */]
}
```

## Environment Variables

### Backend (.env in backend folder)
```bash
PORT=3001
NODE_ENV=development
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=24h
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env in project root)
```bash
REACT_APP_API_URL=http://localhost:3001/api
```

## Authentication Flow

1. **User clicks "Start Building Your Store"**
2. **Frontend checks Redux auth state**
3. **If not authenticated**: Redirects to `/login`
4. **User enters credentials**: Frontend sends `POST /api/auth/login`
5. **Backend validates**: Returns user data and JWT token
6. **Frontend stores token**: Saves in localStorage and Redux
7. **User redirected back**: To `/start-building` or intended page

## Security Features

- 🔐 **JWT Authentication**: Secure token-based auth
- 🛡️ **Password Hashing**: bcryptjs for secure passwords
- 🚫 **Rate Limiting**: 100 requests per 15 minutes
- 🔒 **CORS Protection**: Configured for localhost:3000
- ⚡ **Security Headers**: Helmet.js middleware
- ✅ **Input Validation**: express-validator for all inputs

## Development Workflow

1. **Backend Changes**: Restart `npm run dev` in backend folder
2. **Frontend Changes**: Hot reload automatically (React dev server)
3. **API Testing**: Use browser dev tools or Postman
4. **Database**: Currently using in-memory array (for demo)

## API Health Check

Test if the backend is running:

```bash
curl http://localhost:3001/health
```

Expected response:
```json
{
  "success": true,
  "message": "StoreBuilder API is running!",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "version": "v1"
}
```

## Troubleshooting

### Common Issues

1. **Backend not starting**: Check if port 3001 is available
2. **CORS errors**: Ensure CORS_ORIGIN matches frontend URL
3. **Authentication failing**: Check JWT_SECRET is set
4. **API calls failing**: Verify REACT_APP_API_URL is correct

### Logs

- **Backend logs**: Check terminal running backend server
- **Frontend logs**: Check browser developer console
- **Network requests**: Use browser dev tools Network tab

## Next Steps

1. **Database Integration**: Replace in-memory storage with MongoDB/PostgreSQL
2. **Real Authentication**: Add email verification, password reset
3. **File Uploads**: Implement avatar and document uploads
4. **Admin Panel**: Complete admin dashboard functionality
5. **API Documentation**: Add Swagger/OpenAPI documentation

## File Structure

```
project/
├── backend/                 # Node.js Express API
│   ├── data/               # User data and utilities
│   ├── middleware/         # Express middleware
│   ├── routes/            # API route definitions
│   ├── utils/             # Utility functions
│   └── server.js          # Main server file
├── src/                   # React frontend
│   ├── services/          # API service layer
│   ├── store/slices/      # Redux slices
│   └── components/        # React components
└── FULLSTACK_SETUP.md     # This file
```

## Support

For issues or questions:
1. Check the logs in both frontend and backend terminals
2. Verify environment variables are set correctly
3. Test API endpoints individually
4. Review the authentication flow in browser dev tools
