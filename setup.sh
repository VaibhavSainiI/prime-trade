#!/bin/bash

# PrimeTrade Setup Script
echo "🚀 Setting up PrimeTrade application..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install
cd ..

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
cd ..

# Copy environment file
if [ ! -f backend/.env ]; then
    echo "📝 Creating environment file..."
    cp backend/.env.example backend/.env
    echo "⚠️  Please update backend/.env with your MongoDB connection string"
else
    echo "✅ Environment file already exists"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Make sure MongoDB is running on your system"
echo "2. Update backend/.env with your MongoDB connection string if needed"
echo "3. Run 'npm run dev' to start both frontend and backend"
echo ""
echo "🌐 The application will be available at:"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:5000"
echo ""