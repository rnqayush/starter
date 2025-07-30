# Development Guide 🛠️

This guide will help you set up and work with the Multi-Business Platform monorepo.

## 🏗️ Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐
│   React Client  │    │  Node.js Server │
│   (Port 3000)   │◄──►│   (Port 5000)   │
└─────────────────┘    └─────────────────┘
         │                       │
         │                       │
         ▼                       ▼
┌─────────────────┐    ┌─────────────────┐
│   Static Files  │    │    MongoDB      │
│   (Build)       │    │   Database      │
└─────────────────┘    └─────────────────┘
```

## 🚀 Getting Started

### 1. Initial Setup
```bash
# Clone and navigate to the project
git clone https://github.com/rnqayush/starter.git
cd starter

# Install all dependencies (root, client, server)
npm run install:all
```

### 2. Environment Configuration
```bash
# Copy server environment template
cp server/.env.example server/.env

# Edit server/.env with your settings:
# - MongoDB connection string
# - JWT secret
# - Stripe keys (for payments)
# - Cloudinary credentials (for image uploads)
# - Email service credentials
```

### 3. Database Setup
```bash
# Make sure MongoDB is running locally or use MongoDB Atlas
# Then seed the database with sample data
cd server
npm run seed
cd ..
```

### 4. Start Development
```bash
# Start both frontend and backend
npm run dev

# This will start:
# - React app on http://localhost:3000
# - Node.js API on http://localhost:5000
# - API docs on http://localhost:5000/api-docs
```

## 📂 Working with the Codebase

### Frontend Development (Client)
```bash
# Navigate to client directory
cd client

# Start only frontend (if backend is already running)
npm start

# Run tests
npm test

# Build for production
npm run build

# Lint code
npm run lint
```

### Backend Development (Server)
```bash
# Navigate to server directory
cd server

# Start only backend with auto-reload
npm run dev

# Run tests
npm test

# Seed database
npm run seed

# Generate API documentation
npm run docs
```

## 🏨 Module Development

### Adding a New Business Module

1. **Frontend Structure**
   ```
   client/src/
   ├── your-module/
   │   ├── components/
   │   │   ├── ModuleNavbar.js
   │   │   ├── ModuleFooter.js
   │   │   └── ModuleCard.js
   │   ├── pages/
   │   │   ├── ModuleList.js
   │   │   ├── ModuleDetail.js
   │   │   └── ModuleDashboard.js
   │   └── index.js
   ```

2. **Backend Structure**
   ```
   server/
   ├── models/
   │   └── YourModule.js
   ├── controllers/
   │   └── yourModuleController.js
   ├── routes/
   │   └── yourModuleRoutes.js
   └── middleware/
       └── yourModuleAuth.js
   ```

3. **Add Routes to App.js**
   ```javascript
   // In client/src/App.js
   import ModuleList from './your-module/pages/ModuleList';
   import ModuleDetail from './your-module/pages/ModuleDetail';
   
   // Add routes
   <Route path="your-module" element={<ModuleList />} />
   <Route path="your-module/:id" element={<ModuleDetail />} />
   ```

### Working with Existing Modules

#### Hotels Module
- **Frontend**: `client/src/hotel/`
- **Backend**: `server/controllers/hotelController.js`
- **Routes**: `/api/hotels`, `/api/bookings`, `/api/rooms`
- **Features**: Room booking, hotel management, guest services

#### E-commerce Module
- **Frontend**: `client/src/ecommerce/`
- **Backend**: `server/controllers/ecommerceController.js`
- **Routes**: `/api/products`, `/api/orders`, `/api/sellers`
- **Features**: Product catalog, shopping cart, order management

## 🔧 Development Workflow

### 1. Feature Development
```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes in client/ or server/ directories
# Test your changes
npm run test

# Lint your code
npm run lint

# Commit changes
git add .
git commit -m "feat: add your feature description"

# Push and create PR
git push origin feature/your-feature-name
```

### 2. API Development
```bash
# 1. Create model in server/models/
# 2. Create controller in server/controllers/
# 3. Create routes in server/routes/
# 4. Add routes to server/server.js
# 5. Test with Postman or API client
# 6. Update API documentation
```

### 3. Frontend Integration
```bash
# 1. Create components in client/src/your-module/
# 2. Add API calls using fetch or axios
# 3. Integrate with Redux store if needed
# 4. Add routes to client/src/App.js
# 5. Test user flows
```

## 🧪 Testing

### Frontend Testing
```bash
cd client
npm test                    # Run all tests
npm test -- --watch        # Run tests in watch mode
npm test -- --coverage     # Run tests with coverage
```

### Backend Testing
```bash
cd server
npm test                    # Run all tests
npm run test:watch         # Run tests in watch mode
```

### Integration Testing
```bash
# From root directory
npm run test               # Run both frontend and backend tests
```

## 🚀 Deployment

### Development Deployment
```bash
# Build both client and server
npm run build

# Start production server
npm start
```

### Production Deployment
1. **Frontend**: Deploy `client/build/` to static hosting (Vercel, Netlify)
2. **Backend**: Deploy server to cloud platform (Heroku, AWS, DigitalOcean)
3. **Database**: Use MongoDB Atlas for production database
4. **Environment**: Set production environment variables

## 🔍 Debugging

### Frontend Debugging
- Use React Developer Tools
- Check browser console for errors
- Use Redux DevTools for state debugging

### Backend Debugging
- Check server logs in terminal
- Use Postman for API testing
- Check MongoDB logs for database issues
- Use `console.log()` or debugger for code debugging

### Common Issues
1. **CORS errors**: Check server CORS configuration
2. **Database connection**: Verify MongoDB connection string
3. **Port conflicts**: Make sure ports 3000 and 5000 are available
4. **Environment variables**: Check .env file configuration

## 📚 Resources

- [React Documentation](https://reactjs.org/docs)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Guide](https://mongoosejs.com/docs/guide.html)
- [Redux Toolkit](https://redux-toolkit.js.org/)

## 🤝 Contributing

1. Follow the existing code style
2. Write tests for new features
3. Update documentation
4. Create meaningful commit messages
5. Submit pull requests for review

---

Happy coding! 🎉

