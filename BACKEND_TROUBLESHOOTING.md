# Backend Troubleshooting Guide

This guide helps you diagnose and fix common backend issues, especially the "publish my store" 404 error.

## Quick Fix for 404 Error

If you're getting a 404 error when clicking "publish my store", follow these steps:

### 1. Check Backend Server Status

```bash
# Navigate to backend directory
cd backend

# Check if server is running
curl http://localhost:5000/api/health

# Expected response:
# {"status":"success","message":"Server is running","timestamp":"..."}
```

### 2. Start Backend Server

If the server is not running:

```bash
# Option 1: Use the startup script (recommended)
node start-server.js

# Option 2: Start directly
npm start

# Option 3: Start with nodemon for development
npm run dev
```

### 3. Verify Environment Configuration

Check your `.env` file in the backend directory:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/website_builder
FRONTEND_URL=http://localhost:3000
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-this-in-production
```

### 4. Test API Endpoints

```bash
# Test health endpoint
curl http://localhost:5000/api/health

# Test start-building endpoint (requires authentication)
curl -X POST http://localhost:5000/api/websites/start-building \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"websiteName":"test","websiteType":"business","businessName":"Test"}'
```

## Common Issues and Solutions

### Issue 1: Double `/api` in URL

**Symptom:** Error shows `/api/api/websites/start-building`

**Cause:** Frontend configuration issue with base URL

**Solution:**
1. Check `src/api/config/config.js` - baseURL should be `http://localhost:5000/api`
2. Check `src/api/config/endpoints.js` - BASE_PATH should be empty string
3. Restart frontend server

### Issue 2: Backend Server Not Starting

**Symptoms:**
- Connection refused errors
- No response from health endpoint

**Solutions:**
1. Install dependencies: `cd backend && npm install`
2. Check port availability: `lsof -i :5000`
3. Use the startup script: `node start-server.js`
4. Check for syntax errors in server files

### Issue 3: Database Connection Issues

**Symptoms:**
- MongoDB connection errors
- Server starts but API calls fail

**Solutions:**
1. Start MongoDB: `mongod` or `brew services start mongodb-community`
2. Check MongoDB URI in `.env` file
3. Verify database permissions

### Issue 4: Authentication Errors

**Symptoms:**
- 401 Unauthorized errors
- Token-related errors

**Solutions:**
1. Check if user is logged in
2. Verify JWT secrets in `.env`
3. Clear localStorage and re-login

## Frontend Debugging

### Using the API Debugger

Open browser console and run:

```javascript
// Check backend connection
await APIDebugger.checkBackendConnection()

// Test start-building endpoint
await APIDebugger.testStartBuildingEndpoint()

// Run full diagnostic
await APIDebugger.runFullDiagnostic()
```

### Check Network Tab

1. Open browser DevTools (F12)
2. Go to Network tab
3. Click "publish my store"
4. Look for the API request
5. Check request URL, headers, and response

## Server Logs

The backend server now includes detailed logging:

```
🚀 Server running on port 5000
📍 API Base URL: http://localhost:5000/api
🔗 Available endpoints:
   - POST /api/websites/start-building
   - GET  /api/health
   - GET  /api/websites/:websiteName

🔍 POST /api/websites/start-building - 2025-01-06T09:44:47.000Z
📦 Request body: {"websiteName":"test","websiteType":"business",...}
```

## File Structure Check

Ensure these files exist:

```
backend/
├── server.js
├── start-server.js
├── package.json
├── .env
├── routes/
│   └── websites.js
├── controllers/
│   └── websiteController.js
└── models/
    └── Website.js

src/
├── api/
│   ├── config/
│   │   ├── config.js
│   │   └── endpoints.js
│   └── services/
│       └── websiteService.js
├── components/
│   └── StartBuilding.js
└── utils/
    └── apiDebugger.js
```

## Still Having Issues?

1. **Check the browser console** for detailed error messages
2. **Check the backend terminal** for server logs
3. **Verify all services are running:**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000
   - MongoDB: mongodb://localhost:27017

4. **Try the diagnostic tools:**
   ```javascript
   // In browser console
   await APIDebugger.runFullDiagnostic()
   ```

5. **Restart everything:**
   ```bash
   # Stop all services
   # Then restart in order:
   
   # 1. Start MongoDB
   mongod
   
   # 2. Start Backend
   cd backend && node start-server.js
   
   # 3. Start Frontend
   cd .. && npm start
   ```

## Contact Support

If you're still experiencing issues, please provide:
1. Error messages from browser console
2. Backend server logs
3. Results from `APIDebugger.runFullDiagnostic()`
4. Your environment details (OS, Node version, etc.)
