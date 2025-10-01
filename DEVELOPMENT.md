# PrimeTrade Development Guide

## Quick Start

### Prerequisites
- Node.js 16+ installed
- MongoDB running locally or connection string for remote MongoDB
- npm or yarn package manager

### Setup (Windows)
```powershell
# Run the setup script
.\setup.bat

# Or install manually
npm run install:all
```

### Setup (Linux/Mac)
```bash
# Make setup script executable and run
chmod +x setup.sh
./setup.sh

# Or install manually
npm run install:all
```

### Start Development
```bash
# Start both frontend and backend concurrently
npm run dev

# Or start individually
npm run backend:dev  # Starts backend on port 5000
npm run frontend:dev # Starts frontend on port 3000
```

## Project Structure

```
primetrade/
├── backend/                 # Express.js API server
│   ├── config/             # Database and other configs
│   ├── middleware/         # Custom middleware (auth, etc.)
│   ├── models/            # Mongoose models
│   ├── routes/            # API route handlers
│   ├── utils/             # Utility functions
│   ├── .env               # Environment variables
│   ├── .env.example       # Environment template
│   └── server.js          # Main server file
├── frontend/               # React application
│   ├── public/            # Static assets
│   ├── src/               # Source code
│   │   ├── components/    # React components
│   │   ├── context/       # Context providers
│   │   ├── utils/         # Frontend utilities
│   │   ├── App.js         # Main App component
│   │   └── index.js       # Entry point
│   └── package.json       # Frontend dependencies
├── package.json           # Root package with scripts
├── README.md              # Project documentation
└── setup.bat/sh           # Setup scripts
```

## Environment Configuration

### Backend (.env)
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/primetrade
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=30d
JWT_COOKIE_EXPIRE=30
FRONTEND_URL=http://localhost:3000
```

### Frontend
- Uses proxy in package.json for API calls
- No additional environment variables needed for development

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (protected)
- `POST /api/auth/logout` - Logout user (protected)
- `PUT /api/auth/profile` - Update profile (protected)

### Dashboard
- `GET /api/dashboard` - Get dashboard data (protected)
- `GET /api/dashboard/stats` - Get detailed statistics (protected)

### Health Check
- `GET /api/health` - API health status

## Features Implemented

### Backend
✅ Express.js server with security middleware
✅ MongoDB integration with Mongoose
✅ JWT-based authentication
✅ Password hashing with bcrypt
✅ Input validation with express-validator
✅ Rate limiting
✅ CORS configuration
✅ Error handling middleware
✅ User model with authentication methods
✅ Protected routes with auth middleware

### Frontend
✅ React 18 with functional components
✅ React Router for navigation
✅ Context API for state management
✅ Axios for API communication
✅ Responsive design with CSS
✅ Form validation
✅ Loading states and error handling
✅ Protected and public routes
✅ User authentication flow
✅ Dashboard with mock trading data
✅ Profile management

### Security Features
✅ JWT token authentication
✅ Password hashing (bcrypt)
✅ Request rate limiting
✅ CORS protection
✅ Security headers (Helmet)
✅ Input validation and sanitization
✅ Protected API endpoints
✅ Token-based authorization

## Development Commands

```bash
# Root level commands
npm run dev                 # Start both frontend and backend
npm run install:all         # Install all dependencies
npm run backend:dev         # Start backend only
npm run frontend:dev        # Start frontend only

# Backend commands (from backend/)
npm start                   # Start production server
npm run dev                 # Start development server
npm test                    # Run tests (when implemented)

# Frontend commands (from frontend/)
npm start                   # Start development server
npm run build              # Build for production
npm test                   # Run tests
npm run eject              # Eject from Create React App
```

## Database Schema

### User Model
```javascript
{
  name: String (required, 2-50 chars)
  email: String (required, unique, valid email)
  password: String (required, hashed, min 6 chars)
  role: String (enum: 'user', 'admin', default: 'user')
  isActive: Boolean (default: true)
  lastLogin: Date
  createdAt: Date (default: now)
}
```

## Extending the Application

### Adding New API Endpoints
1. Create route handler in `backend/routes/`
2. Add route to `server.js`
3. Create frontend service function
4. Update UI components

### Adding New Components
1. Create component in `frontend/src/components/`
2. Add route in `App.js` if needed
3. Update navigation in `Navbar.js`

### Adding Database Models
1. Create model in `backend/models/`
2. Import and use in route handlers
3. Update API documentation

## Testing (Future Enhancement)
- Backend: Jest + Supertest
- Frontend: React Testing Library + Jest
- Integration tests for API endpoints
- Unit tests for components and utilities

## Deployment Considerations
- Use environment variables for all secrets
- Set up MongoDB Atlas for production database
- Configure CORS for production domain
- Enable HTTPS in production
- Set up process manager (PM2) for backend
- Build and serve frontend static files
- Set up monitoring and logging

## Troubleshooting

### Common Issues
1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in .env
   - Verify network connectivity

2. **CORS Errors**
   - Check frontend URL in backend CORS config
   - Verify API endpoints are correct

3. **Authentication Issues**
   - Check JWT secret configuration
   - Verify token storage in localStorage
   - Check token expiration

4. **Port Conflicts**
   - Change PORT in backend .env
   - Update proxy in frontend package.json

### Development Tips
- Use browser dev tools for debugging
- Check backend console for API errors
- Use MongoDB Compass for database inspection
- Enable React Developer Tools for component debugging