# Multi-Business Platform Monorepo 🚀

A comprehensive monorepo containing both frontend and backend for a multi-business platform supporting hotels, ecommerce, weddings, automobiles, and business websites.

## 📁 Project Structure

```
├── frontend/               # React Frontend Application
│   ├── src/
│   │   ├── hotel/         # Hotel booking module
│   │   ├── ecommerce/     # E-commerce module
│   │   ├── weddings/      # Wedding services module
│   │   ├── automobiles/   # Automobile marketplace module
│   │   ├── business/      # Business websites module
│   │   ├── components/    # Shared components
│   │   ├── DummyData/     # Mock data for development
│   │   └── ...
│   ├── public/
│   └── package.json
├── backend/                # Node.js Backend API
│   ├── controllers/       # API controllers
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── config/           # Configuration files
│   ├── utils/            # Utility functions
│   └── package.json
└── package.json           # Root package.json for monorepo
```

## 🛠️ Tech Stack

### Frontend (Client)
- **React** 19.1.0 - UI library
- **Redux Toolkit** - State management
- **React Router** v7 - Client-side routing
- **Styled Components** - CSS-in-JS styling
- **Swiper** - Touch slider component
- **React Icons** - Icon library

### Backend (Server)
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** with Mongoose - Database
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Multer & Sharp** - File upload and image processing
- **Socket.io** - Real-time communication
- **Stripe** - Payment processing
- **Cloudinary** - Image hosting
- **Redis** - Caching
- **Swagger** - API documentation

## 🚀 Quick Start

### Prerequisites
- Node.js >= 16.0.0
- npm >= 8.0.0
- MongoDB (local or cloud)
- Redis (optional, for caching)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/rnqayush/starter.git
   cd starter
   ```

2. **Install all dependencies**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**
   ```bash
   # Copy backend environment file
   cp backend/.env.example backend/.env
   
   # Edit backend/.env with your configuration
   ```

4. **Start development servers**
   ```bash
   # Start both frontend and backend concurrently
   npm run dev
   
   # Or start them separately
   npm run dev:frontend    # Frontend on http://localhost:3000
   npm run dev:backend    # Backend on http://localhost:5000
   ```

## 📜 Available Scripts

### Root Level Scripts
- `npm run dev` - Start both frontend and backend in development mode
- `npm run build` - Build both frontend and backend for production
- `npm run start` - Start the production backend
- `npm run test` - Run tests for both frontend and backend
- `npm run lint` - Lint both frontend and backend code
- `npm run install:all` - Install dependencies for root, frontend, and backend
- `npm run clean` - Remove all node_modules folders

### Frontend Scripts
- `npm run dev:frontend` - Start React development server
- `npm run build:frontend` - Build React app for production
- `npm run test:frontend` - Run React tests
- `npm run lint:frontend` - Lint React code

### Backend Scripts
- `npm run dev:backend` - Start Node.js server with nodemon
- `npm run start:backend` - Start Node.js server in production
- `npm run test:backend` - Run server tests
- `npm run lint:backend` - Lint server code
- `npm run seed` - Seed database with sample data

## 🏨 Business Modules

### 1. Hotels Module
- **Features**: Room booking, hotel management, guest services
- **Components**: HotelDetail, RoomList, Booking, BookingConfirmation
- **API Endpoints**: `/api/hotels`, `/api/bookings`, `/api/rooms`

### 2. E-commerce Module
- **Features**: Product catalog, shopping cart, order management
- **Components**: ProductList, ProductDetail, SellerDashboard
- **API Endpoints**: `/api/products`, `/api/orders`, `/api/sellers`

### 3. Weddings Module
- **Features**: Vendor portfolios, service booking, event management
- **Components**: VendorPortfolio, VendorDashboard
- **API Endpoints**: `/api/vendors`, `/api/weddings`, `/api/services`

### 4. Automobiles Module
- **Features**: Vehicle listings, dealer management, wishlist
- **Components**: Vehicles, VehicleDetail, DealerDashboard
- **API Endpoints**: `/api/vehicles`, `/api/dealers`, `/api/wishlist`

### 5. Business Websites Module
- **Features**: Business profiles, service listings, contact management
- **API Endpoints**: `/api/businesses`, `/api/services`, `/api/contacts`

## 🔧 Development

### Adding New Features
1. Create feature branch: `git checkout -b feature/your-feature-name`
2. Make changes in appropriate frontend/backend directories
3. Test your changes: `npm run test`
4. Lint your code: `npm run lint`
5. Commit and push changes
6. Create pull request

### Database Setup
1. Install MongoDB locally or use MongoDB Atlas
2. Update `backend/.env` with your MongoDB connection string
3. Run database seeder: `npm run seed` (from backend directory)

### API Documentation
- Swagger documentation available at: `http://localhost:5000/api-docs`
- Generate docs: `npm run docs` (from backend directory)

## 🌐 Deployment

### Frontend Deployment
The React app can be deployed to:
- Vercel
- Netlify
- AWS S3 + CloudFront
- GitHub Pages

### Backend Deployment
The Node.js server can be deployed to:
- Heroku
- AWS EC2/ECS
- DigitalOcean
- Railway

### Environment Variables
Make sure to set up the following environment variables in production:
- `MONGODB_URI`
- `JWT_SECRET`
- `STRIPE_SECRET_KEY`
- `CLOUDINARY_*` variables
- `REDIS_URL` (if using Redis)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**rnqayush**
- GitHub: [@rnqayush](https://github.com/rnqayush)

## 🙏 Acknowledgments

- React team for the amazing framework
- Express.js community
- MongoDB team
- All open source contributors

---

**Happy Coding!** 🎉
