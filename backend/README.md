# Website Builder Backend

This is the backend server for the multi-industry website builder project.

## Features

- **Authentication**: JWT-based authentication with refresh tokens
- **Multiple Industries**: Support for business, hotels, ecommerce, automobiles, and weddings
- **Start Building**: API endpoint to create websites from the start-building form
- **Data Models**: MongoDB models matching the dummy data structure exactly
- **CORS Enabled**: Configured for frontend integration
- **Security**: Helmet, rate limiting, and input validation

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. Start MongoDB (if running locally):

   ```bash
   mongod
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

The server will start on http://localhost:5000

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/refresh` - Refresh access token
- `GET /api/auth/profile` - Get user profile (requires auth)

### Websites

- `POST /api/websites/start-building` - Create website from start-building form
- `GET /api/websites/:websiteName` - Get website by name
- `GET /api/websites/user/websites` - Get user's websites (requires auth)

### Business

- `GET /api/business` - Get all business templates
- `GET /api/business/:slug` - Get business by slug
- `POST /api/business/start-building` - Create business from start-building

### Hotels

- `GET /api/hotels` - Get all hotels
- `GET /api/hotels/:identifier` - Get hotel by ID or slug
- `POST /api/hotels/start-building` - Create hotel from start-building

### Ecommerce

- `GET /api/ecommerce` - Get all stores
- `GET /api/ecommerce/:slug` - Get store by slug
- `POST /api/ecommerce/start-building` - Create store from start-building

### Automobiles

- `GET /api/automobiles` - Get all dealerships
- `GET /api/automobiles/:slug` - Get dealership by slug
- `POST /api/automobiles/start-building` - Create dealership from start-building

### Weddings

- `GET /api/weddings/vendors` - Get all wedding vendors
- `GET /api/weddings/vendors/:identifier` - Get vendor by ID or slug
- `POST /api/weddings/start-building` - Create vendor from start-building

### Health Check

- `GET /api/health` - Server health status

## Environment Variables

Key environment variables in `.env`:

```bash
# Database
MONGODB_URI=mongodb://localhost:27017/website_builder

# Server
PORT=5000
NODE_ENV=development

# Frontend
FRONTEND_URL=http://localhost:3000

# JWT
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
JWT_EXPIRE=24h
JWT_REFRESH_EXPIRE=7d
```

## Data Structure

The backend uses MongoDB models that exactly match the dummy data JSON structure:

- **User**: Authentication and user management
- **Website**: Main website entries created from start-building
- **Business**: Business/professional websites
- **Hotel**: Hotel booking websites
- **Ecommerce**: Online store websites
- **Automobile**: Car dealership websites
- **WeddingVendor**: Wedding service provider websites

## Development

### Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests (when implemented)

### Project Structure

```
backend/
├── controllers/     # Route handlers
├── middleware/      # Custom middleware
├── models/         # MongoDB schemas
├── routes/         # API routes
├── utils/          # Utility functions
├── server.js       # Main server file
└── package.json    # Dependencies
```

## Integration with Frontend

The backend is designed to work seamlessly with the React frontend:

1. **CORS**: Configured to allow requests from http://localhost:3000
2. **Response Format**: Matches the expected frontend format with `{ status: 'success', data: {...} }`
3. **Authentication**: JWT tokens work with the existing auth system
4. **Start Building**: When user clicks "Publish My Website", it creates entries in the appropriate module

## Deployment

For production deployment:

1. Set `NODE_ENV=production`
2. Use a proper MongoDB database (MongoDB Atlas recommended)
3. Set secure JWT secrets
4. Configure proper CORS origins
5. Use PM2 or similar process manager

## Notes

- The backend maintains backward compatibility with existing dummy data
- If no data exists in the database, it returns the original dummy data
- All models are designed to match the exact structure of the JSON files
- Authentication is required for creating/updating content, but reading is public
