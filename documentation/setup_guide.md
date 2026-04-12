# E-Commerce App - Complete Setup Guide

## Prerequisites

Before starting, ensure you have the following installed:

- **Node.js** (v14.0.0 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **MongoDB** - Either:
  - Local installation: [Download MongoDB Community](https://www.mongodb.com/try/download/community)
  - Cloud: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (Free tier available)
- **Git** (optional, for cloning the repository)

## Quick Start (5 minutes)

### Option 1: Using MongoDB Atlas (Recommended for Beginners)

1. Create a free MongoDB Atlas account: https://www.mongodb.com/cloud/atlas
2. Create a cluster (Free M0 tier is sufficient)
3. Get your connection string from Atlas

### Option 2: Local MongoDB

```bash
# macOS (using Homebrew)
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community

# Windows
# Download and run installer from https://www.mongodb.com/try/download/community

# Linux (Ubuntu/Debian)
sudo apt-get install -y mongodb
sudo systemctl start mongod
```

## Installation Steps

### 1. Clone/Download the Project

```bash
# If you have git
git clone <repository-url>
cd ecommerce-app

# Or manually extract the project folder
```

### 2. Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_super_secret_jwt_key_12345
NODE_ENV=development
EOF

# For MongoDB Atlas, replace MONGODB_URI with:
# MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/ecommerce?retryWrites=true&w=majority
```

### 3. Frontend Setup

```bash
# In a new terminal, navigate to client directory
cd client

# Install dependencies
npm install

# Create .env file (optional, API defaults to localhost:5000)
cat > .env << EOF
VITE_API_URL=http://localhost:5000/api
EOF
```

### 4. Start the Application

#### Terminal 1 - Backend Server
```bash
cd server
npm run dev
# Server will run on http://localhost:5000
```

#### Terminal 2 - Frontend Development Server
```bash
cd client
npm run dev
# Frontend will run on http://localhost:5173
```

### 5. Access the Application

Open your browser and go to: **http://localhost:5173**

## Demo Credentials

### Regular User Account
- **Email:** user@example.com
- **Password:** password123

### Admin Account
- **Email:** admin@example.com
- **Password:** admin123

## Folder Structure

```
ecommerce-app/
├── client/                          # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   └── *.css
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── Orders.jsx
│   │   │   ├── Admin.jsx
│   │   │   └── *.css
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── .env.example
│
├── server/                          # Express Backend
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Cart.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── cart.js
│   │   ├── orders.js
│   │   └── admin.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
└── README.md
```

## Features Overview

### ✅ User Features
- **Authentication**: Register and login with JWT tokens
- **Product Browsing**: Search, filter by category and price
- **Shopping Cart**: Add/remove items, adjust quantities
- **Checkout**: Enter shipping details and payment method
- **Order History**: View past orders and their status
- **Profile**: View account information

### ✅ Admin Features
- **Product Management**: Add, edit, delete products
- **Order Management**: View all orders and update status
- **Dashboard**: View key statistics (total products, orders, revenue)
- **Inventory Control**: Manage product stock

## API Endpoints

### Authentication
```
POST   /api/auth/signup              # Create new account
POST   /api/auth/login               # Login user
GET    /api/auth/profile             # Get current user (protected)
```

### Products
```
GET    /api/products                 # Get all products with filters
GET    /api/products/:id             # Get single product
POST   /api/admin/products           # Create product (admin)
PUT    /api/admin/products/:id       # Update product (admin)
DELETE /api/admin/products/:id       # Delete product (admin)
```

### Shopping Cart
```
GET    /api/cart                     # Get user's cart (protected)
POST   /api/cart/add                 # Add item to cart
PUT    /api/cart/update/:productId   # Update quantity
DELETE /api/cart/remove/:productId   # Remove item
DELETE /api/cart/clear               # Clear entire cart
```

### Orders
```
POST   /api/orders/checkout          # Create order (protected)
GET    /api/orders                   # Get user's orders (protected)
GET    /api/orders/:id               # Get order details (protected)
```

### Admin Routes
```
GET    /api/admin/orders             # Get all orders (admin)
PUT    /api/admin/orders/:id/status  # Update order status (admin)
GET    /api/admin/stats              # Get dashboard stats (admin)
```

## Troubleshooting

### Issue: Cannot connect to MongoDB

**Solution:**
1. Ensure MongoDB is running:
   ```bash
   # Check if MongoDB is running
   ps aux | grep mongod
   
   # Start MongoDB (if not running)
   mongod
   ```
2. Verify connection string in `.env`
3. If using MongoDB Atlas, ensure your IP is whitelisted

### Issue: CORS Error

**Solution:**
- Ensure backend server is running on port 5000
- Check that frontend can reach `http://localhost:5000`
- Verify CORS is enabled in `server.js`

### Issue: Port Already in Use

**Solution:**
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Kill process on port 5173
lsof -ti:5173 | xargs kill -9

# For Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Issue: Dependencies not installing

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Issue: Login not working

**Solution:**
1. Check that server is running (http://localhost:5000/api/health)
2. Verify MongoDB connection
3. Check browser console for error messages
4. Use demo credentials: user@example.com / password123

## Environment Variables

### Server (.env)
```
PORT=5000                                    # Server port
MONGODB_URI=mongodb://localhost:27017/ecommerce  # MongoDB connection
JWT_SECRET=your_secret_key_here             # JWT secret key
NODE_ENV=development                        # Development/Production
```

### Client (.env)
```
VITE_API_URL=http://localhost:5000/api     # Backend API URL
```

## Running Tests

### Backend Tests
```bash
cd server
npm test
```

### Frontend Tests
```bash
cd client
npm test
```

## Building for Production

### Backend

```bash
# The backend is already production-ready
# Just ensure NODE_ENV=production in .env
# Deploy to Heroku, Railway, or any Node.js hosting
```

### Frontend

```bash
cd client
npm run build

# This creates a 'dist' folder with optimized production build
# Deploy to Vercel, Netlify, GitHub Pages, or any static hosting
```

## Deployment

### Deploy Backend (Heroku)

```bash
# Install Heroku CLI
brew tap heroku/brew && brew install heroku

# Login to Heroku
heroku login

# Create Heroku app
heroku create your-app-name

# Set environment variables
heroku config:set JWT_SECRET=your_secret_key
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set NODE_ENV=production

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

### Deploy Frontend (Vercel)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd client
vercel

# Set environment variables in Vercel dashboard
# VITE_API_URL=https://your-backend.herokuapp.com/api
```

### Deploy Frontend (Netlify)

```bash
# Build the project
cd client
npm run build

# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist

# Or drag and drop 'dist' folder to Netlify dashboard
```

## Database Backup

### MongoDB Atlas Backup
- Automatic backups are enabled for free tier
- Access through Atlas dashboard → Backups

### Local MongoDB Backup
```bash
# Create backup
mongodump --out ./backup

# Restore backup
mongorestore ./backup
```

## Performance Optimization

### Frontend
```bash
# Analyze bundle size
npm install -D vite-plugin-visualizer
```

### Backend
```bash
# Enable compression
npm install compression

# Use caching
npm install redis
```

## Security Best Practices

1. **Environment Variables**: Never commit `.env` files
2. **HTTPS**: Always use HTTPS in production
3. **JWT Secret**: Use a strong, random secret key
4. **Database**: Use MongoDB Atlas with IP whitelist
5. **CORS**: Restrict CORS to your frontend domain only
6. **Rate Limiting**: Implement rate limiting on API routes
7. **Input Validation**: Always validate user input
8. **Password Hashing**: Passwords are hashed with bcryptjs

## Useful Commands

```bash
# Install all dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Clear all node_modules
rm -rf node_modules

# Clear npm cache
npm cache clean --force

# Check npm packages for security vulnerabilities
npm audit

# Update packages
npm update
```

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review browser console for errors
3. Check server logs
4. Verify all prerequisites are installed
5. Ensure environment variables are correct

## Additional Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Guide](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [JWT Authentication](https://jwt.io/)
- [REST API Best Practices](https://restfulapi.net/)

---

**Happy Coding! 🚀**
