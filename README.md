# PrimeTrade - Scalable Web App

A modern, scalable web application with authentication and dashboard functionality.

## Features

- ✅ User Authentication (Register/Login)
- ✅ Protected Dashboard
- ✅ JWT Token-based Security
- ✅ RESTful API Backend
- ✅ React Frontend with Routing
- ✅ MongoDB Database Integration
- ✅ Responsive Design

## Project Structure

```
primetrade/
├── backend/          # Express.js API server
├── frontend/         # React application
└── package.json      # Root package with scripts
```

## Quick Start

1. **Install dependencies:**
   ```bash
   npm run install:all
   ```

2. **Set up environment variables:**
   - Copy `backend/.env.example` to `backend/.env`
   - Update with your MongoDB connection string and JWT secret

3. **Start development servers:**
   ```bash
   npm run dev
   ```

This will start:
- Backend API on http://localhost:5002
- Frontend app on http://localhost:3000

## 🌐 Live Demo

- **Frontend**: https://vaibhavsainii.github.io/prime-trade
- **Backend**: Deploy to Render, Vercel, or Railway (see DEPLOYMENT.md)

## 📚 Documentation

- [Development Guide](DEVELOPMENT.md) - Detailed setup and development instructions
- [Deployment Guide](DEPLOYMENT.md) - How to deploy to production

## Technologies Used

### Backend
- Node.js & Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing
- Input validation & security middleware

### Frontend
- React 18
- React Router for navigation
- Axios for API calls
- Context API for state management
- Responsive CSS

## API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (protected)
- `GET /api/dashboard` - Dashboard data (protected)

## Environment Variables

Create `backend/.env` with:
```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/primetrade
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=30d
```

## Development

- Backend uses nodemon for auto-restart
- Frontend uses Create React App with hot reload
- Both servers run concurrently with one command

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Request rate limiting
- CORS protection
- Input validation
- Helmet security headers