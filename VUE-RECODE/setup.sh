#!/bin/bash

# OPEN-MATHS Vue 3 Setup Script
# This script sets up the Vue development environment

echo "================================================"
echo "OPEN-MATHS Vue 3 Setup"
echo "================================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed."
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "✓ Node.js is installed: $(node --version)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed."
    echo "Please install npm or upgrade Node.js"
    exit 1
fi

echo "✓ npm is installed: $(npm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
echo ""

npm install

if [ $? -eq 0 ]; then
    echo ""
    echo "✓ Dependencies installed successfully!"
    echo ""
    echo "================================================"
    echo "🚀 Setup Complete!"
    echo "================================================"
    echo ""
    echo "To start the development server, run:"
    echo ""
    echo "  npm run dev"
    echo ""
    echo "Then open your browser to: http://localhost:5173"
    echo ""
    echo "Other available commands:"
    echo "  npm run build        - Build for production"
    echo "  npm run preview      - Preview production build"
    echo "  npm run type-check   - Check TypeScript types"
    echo ""
    echo "Happy coding! 🎉"
else
    echo ""
    echo "❌ Installation failed. Please check the errors above."
    exit 1
fi