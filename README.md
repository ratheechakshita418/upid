# E-Commerce Shopping Cart Web App

A full-stack e-commerce application with user authentication, product management, shopping cart functionality, and admin panel.

## Features

### User Features
- ✅ User registration and login with JWT authentication
- ✅ Browse product catalog with search and filter
- ✅ Add/remove items from shopping cart
- ✅ Checkout system with order summary
- ✅ User dashboard to view order history
- ✅ Persistent cart with localStorage

### Admin Features
- ✅ Admin dashboard (separate route)
- ✅ Add new products to catalog
- ✅ Delete/edit existing products
- ✅ View all orders
- ✅ Manage inventory

## Tech Stack

### Frontend
- **React** - UI framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **CSS3** - Styling

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - JSON Web Tokens for authentication
- **Bcryptjs** - Password hashing

## Project Structure

```
ecommerce-app/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── Cart.jsx
│   │   │   └── Checkout.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Admin.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── server/                 # Express backend
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Order.js
│   │   └── Cart.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── cart.js
│   │   ├── orders.js
│   │   └── admin.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   └── package.json
│
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v14+)
- MongoDB (local or cloud - MongoDB Atlas)
- npm or yarn

### Backend Setup

```bash
cd server
npm install

# Create .env file
cat > .env << EOF
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
EOF

npm start
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

Frontend will run on `http://localhost:5173`
Backend API on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get current user (requires token)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/admin/products` - Create product (admin only)
- `PUT /api/admin/products/:id` - Update product (admin only)
- `DELETE /api/admin/products/:id` - Delete product (admin only)

### Cart
- `GET /api/cart` - Get user's cart (requires token)
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update/:itemId` - Update cart item quantity
- `DELETE /api/cart/remove/:itemId` - Remove item from cart
- `DELETE /api/cart/clear` - Clear entire cart

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user's orders (requires token)
- `GET /api/admin/orders` - Get all orders (admin only)

## Key Features Explained

### JWT Authentication
- Tokens stored in localStorage on client
- Tokens included in Authorization header for protected routes
- Tokens verified on backend using middleware

### Admin Panel
- Special admin role in User model
- Protected routes check for admin status
- Only admins can add/edit/delete products

### Shopping Cart
- Cart stored in MongoDB per user
- Also synced with localStorage for offline support
- Real-time updates when items are added/removed

### Order Management
- Orders capture cart state at purchase time
- Order history accessible to users
- Admin can view all orders

## Usage

### As a Regular User
1. Sign up for account
2. Browse products on home page
3. Click "Add to Cart" on products
4. View cart and adjust quantities
5. Proceed to checkout
6. View order history in dashboard

### As an Admin
1. Login with admin account
2. Navigate to Admin Dashboard
3. Add new products with name, price, description, image
4. View/edit/delete existing products
5. View all customer orders

## Database Schema

### User
```javascript
{
  _id: ObjectId,
  username: String,
  email: String (unique),
  password: String (hashed),
  isAdmin: Boolean (default: false),
  createdAt: Date
}
```

### Product
```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  price: Number,
  image: String (URL),
  stock: Number,
  category: String,
  createdAt: Date
}
```

### Cart
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  items: [{
    productId: ObjectId,
    quantity: Number,
    price: Number
  }],
  createdAt: Date
}
```

### Order
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  items: [{
    productId: ObjectId,
    quantity: Number,
    price: Number
  }],
  totalPrice: Number,
  status: String (pending/confirmed/shipped/delivered),
  createdAt: Date
}
```

## Course Objectives Covered

- **CO3**: Database design and management (MongoDB collections, schemas)
- **CO4**: Full-stack development with frontend and backend integration
- **CO5**: RESTful API design and implementation

## Deployment

### Backend (Heroku/Railway)
```bash
# Add Procfile
echo "web: node server/server.js" > Procfile
```

### Frontend (Vercel/Netlify)
```bash
npm run build
```

## Future Enhancements

- Payment gateway integration (Stripe)
- Email notifications
- Product reviews and ratings
- Wishlist feature
- Advanced filtering and search
- Real-time inventory updates
- User profile management
- Password reset functionality

## License

MIT

## Author

Developed for full-stack web development course
