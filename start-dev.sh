#!/bin/bash

# ClinicSense Development Server Starter
# This script helps you start both frontend and backend servers

echo "🚀 ClinicSense Development Server Starter"
echo "=========================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✅ Node.js found: $(node --version)"
echo ""

# Check if dependencies are installed
if [ ! -d "frontend/node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    cd frontend
    npm install
    cd ..
fi

if [ ! -d "backend/node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    cd backend
    npm install
    cd ..
fi

echo ""
echo "📝 Environment Files Check:"
echo ""

# Check for environment files
if [ ! -f "frontend/.env.local" ]; then
    echo "⚠️  frontend/.env.local not found"
    echo "   Creating minimal .env.local file..."
    cat > frontend/.env.local << EOF
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=test
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_SUPABASE_URL=test
NEXT_PUBLIC_SUPABASE_ANON_KEY=test
EOF
    echo "   ✅ Created frontend/.env.local with test values"
else
    echo "✅ frontend/.env.local exists"
fi

if [ ! -f "backend/.env" ]; then
    echo "⚠️  backend/.env not found"
    echo "   Creating minimal .env file..."
    cat > backend/.env << EOF
NODE_ENV=development
PORT=5000
CLERK_SECRET_KEY=test
ANTHROPIC_API_KEY=test
SUPABASE_URL=test
SUPABASE_SERVICE_KEY=test
EOF
    echo "   ✅ Created backend/.env with test values"
else
    echo "✅ backend/.env exists"
fi

echo ""
echo "🎯 Starting Servers..."
echo ""
echo "📌 IMPORTANT: You need TWO terminal windows!"
echo ""
echo "Terminal 1 - Backend:"
echo "  cd backend && npm run dev"
echo ""
echo "Terminal 2 - Frontend:"
echo "  cd frontend && npm run dev"
echo ""
echo "Then open:"
echo "  - Backend: http://localhost:5000/health"
echo "  - Frontend: http://localhost:3000"
echo ""
echo "💡 Tip: See QUICK_START.md for detailed instructions"
echo ""

# Ask if user wants to start servers now
read -p "Do you want to start the backend server now? (y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Starting backend server..."
    cd backend
    npm run dev
else
    echo "Run 'cd backend && npm run dev' in one terminal"
    echo "Run 'cd frontend && npm run dev' in another terminal"
fi



