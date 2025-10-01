@echo off
REM PrimeTrade Setup Script for Windows

echo 🚀 Setting up PrimeTrade application...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 16+ first.
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm first.
    exit /b 1
)

echo ✅ Node.js and npm are installed

REM Install root dependencies
echo 📦 Installing root dependencies...
npm install

REM Install backend dependencies
echo 📦 Installing backend dependencies...
cd backend
npm install
cd ..

REM Install frontend dependencies
echo 📦 Installing frontend dependencies...
cd frontend
npm install
cd ..

REM Copy environment file
if not exist backend\.env (
    echo 📝 Creating environment file...
    copy backend\.env.example backend\.env
    echo ⚠️  Please update backend\.env with your MongoDB connection string
) else (
    echo ✅ Environment file already exists
)

echo.
echo 🎉 Setup complete!
echo.
echo 📋 Next steps:
echo 1. Make sure MongoDB is running on your system
echo 2. Update backend\.env with your MongoDB connection string if needed
echo 3. Run 'npm run dev' to start both frontend and backend
echo.
echo 🌐 The application will be available at:
echo    Frontend: http://localhost:3000
echo    Backend:  http://localhost:5000
echo.