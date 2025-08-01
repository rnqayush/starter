# StoreBuilder Backend API

A Node.js Express backend API for the StoreBuilder platform, providing authentication and user management services.

## Features

- 🔐 JWT-based authentication
- 👥 User management with role-based access control
- 🛡️ Security middleware (Helmet, CORS, Rate Limiting)
- ✅ Input validation with express-validator
- 📊 User statistics and analytics
- 🔄 Password hashing with bcryptjs

## Quick Start

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

1. **Install dependencies:**

   ```bash
   cd backend
   npm install
   ```

2. **Set up environment variables:**

   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Start the server:**

   ```bash
   # Development mode (with nodemon)
   npm run dev

   # Production mode
   npm start
   ```

The server will start on `http://localhost:3001`

## API Endpoints

### Authentication (`/api/auth`)

| Method | Endpoint    | Description       | Access  |
| ------ | ----------- | ----------------- | ------- |
| POST   | `/login`    | User login        | Public  |
| POST   | `/register` | User registration | Public  |
| GET    | `/me`       | Get current user  | Private |
| POST   | `/verify`   | Verify JWT token  | Private |
| POST   | `/logout`   | User logout       | Private |

### Users (`/api/users`)

| Method | Endpoint       | Description         | Access  |
| ------ | -------------- | ------------------- | ------- |
| GET    | `/`            | Get all users       | Admin   |
| GET    | `/:id`         | Get user by ID      | Private |
| PUT    | `/:id`         | Update user profile | Private |
| DELETE | `/:id`         | Delete user         | Admin   |
| GET    | `/admin/stats` | Get user statistics | Admin   |

## Sample API Responses

### Login Success

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "user_001",
      "email": "admin@storebuilder.com",
      "firstName": "Admin",
      "lastName": "User",
      "role": "admin",
      "isActive": true
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": "24h"
  }
}
```

### Error Response

```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

## User Roles

- **admin**: Full access to all features
- **business_owner**: Can manage their business data
- **customer**: Basic customer access
- **demo**: Limited demo account access

## Default Users

The system comes with pre-configured users for testing:

| Email                  | Password    | Role           |
| ---------------------- | ----------- | -------------- |
| admin@storebuilder.com | admin123    | admin          |
| john.doe@hotel.com     | hotel123    | business_owner |
| sarah.smith@shop.com   | shop123     | business_owner |
| customer1@email.com    | customer123 | customer       |

## Security Features

- 🔒 JWT token authentication
- 🛡️ Password hashing with bcryptjs
- 🚫 Rate limiting (100 requests per 15 minutes)
- 🔐 CORS protection
- ⚡ Security headers with Helmet
- ✅ Input validation and sanitization

## Environment Variables

```bash
# Server Configuration
PORT=3001
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=24h

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## Development

### Project Structure

```
backend/
├── data/           # User data and utilities
├── middleware/     # Express middleware
├── routes/         # API route definitions
├── utils/          # Utility functions
├── server.js       # Main server file
└── package.json    # Dependencies and scripts
```

### Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests (when implemented)

## Health Check

Check if the API is running:

```bash
curl http://localhost:3001/health
```

Response:

```json
{
  "success": true,
  "message": "StoreBuilder API is running!",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "version": "v1"
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details
