const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/User');
const Product = require('./models/Product');

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    console.log('Cleared existing data');

    // Create demo users
    const users = await User.create([
      {
        username: 'user',
        email: 'user@example.com',
        password: 'password123',
        isAdmin: false
      },
      {
        username: 'admin',
        email: 'admin@example.com',
        password: 'admin123',
        isAdmin: true
      }
    ]);

    console.log('✓ Created 2 demo users');

    // Create demo products
    const products = await Product.create([
      {
        name: 'Wireless Headphones',
        description: 'Premium noise-cancelling wireless headphones with 30-hour battery life',
        price: 4999,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
        stock: 15,
        category: 'Electronics'
      },
      {
        name: 'Smart Watch',
        description: 'Advanced fitness tracking smartwatch with heart rate monitor',
        price: 12999,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
        stock: 8,
        category: 'Electronics'
      },
      {
        name: 'USB-C Cable',
        description: 'High-speed USB-C charging and data cable, 2-meter length',
        price: 499,
        image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&h=500&fit=crop',
        stock: 50,
        category: 'Electronics'
      },
      {
        name: 'Premium T-Shirt',
        description: 'Comfortable 100% cotton t-shirt available in multiple colors',
        price: 799,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
        stock: 30,
        category: 'Clothing'
      },
      {
        name: 'Designer Jeans',
        description: 'Stylish blue denim jeans with perfect fit and durability',
        price: 1999,
        image: 'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500&h=500&fit=crop',
        stock: 20,
        category: 'Clothing'
      },
      {
        name: 'Running Shoes',
        description: 'Lightweight and comfortable running shoes with cushioned sole',
        price: 3499,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
        stock: 25,
        category: 'Clothing'
      },
      {
        name: 'JavaScript: The Good Parts',
        description: 'A comprehensive guide to JavaScript programming language',
        price: 599,
        image: 'https://images.unsplash.com/photo-1507842217343-583f20270319?w=500&h=500&fit=crop',
        stock: 40,
        category: 'Books'
      },
      {
        name: 'Web Development with React',
        description: 'Learn React.js from basics to advanced concepts',
        price: 799,
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=500&fit=crop',
        stock: 35,
        category: 'Books'
      },
      {
        name: 'Modern CSS Mastery',
        description: 'Master CSS3, Flexbox, Grid, and modern web design',
        price: 699,
        image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500&h=500&fit=crop',
        stock: 28,
        category: 'Books'
      },
      {
        name: 'Desk Lamp',
        description: 'LED desk lamp with adjustable brightness and color temperature',
        price: 1299,
        image: 'https://images.unsplash.com/photo-1565636192335-14c46fa1120d?w=500&h=500&fit=crop',
        stock: 12,
        category: 'Home'
      },
      {
        name: 'Coffee Maker',
        description: 'Automatic coffee maker with programmable timer',
        price: 2499,
        image: 'https://images.unsplash.com/photo-1517668808822-9ebb02ae2a0e?w=500&h=500&fit=crop',
        stock: 10,
        category: 'Home'
      },
      {
        name: 'Bedside Organizer',
        description: 'Multi-pocket bedside organizer for phones, remotes, and books',
        price: 399,
        image: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1e?w=500&h=500&fit=crop',
        stock: 45,
        category: 'Home'
      },
      {
        name: 'Portable Speaker',
        description: 'Waterproof Bluetooth speaker with 360-degree sound',
        price: 2999,
        image: 'https://images.unsplash.com/photo-1589003077984-894fdbb6b583?w=500&h=500&fit=crop',
        stock: 18,
        category: 'Electronics'
      },
      {
        name: 'Webcam Full HD',
        description: '1080p Full HD webcam with built-in microphone for video calls',
        price: 1899,
        image: 'https://images.unsplash.com/photo-1606986628025-35d57e735ae00?w=500&h=500&fit=crop',
        stock: 22,
        category: 'Electronics'
      },
      {
        name: 'Yoga Mat',
        description: 'Non-slip TPE yoga mat with carrying strap',
        price: 899,
        image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&h=500&fit=crop',
        stock: 33,
        category: 'Other'
      }
    ]);

    console.log(`✓ Created ${products.length} demo products`);

    console.log('\n=== Database Seeding Complete ===\n');
    console.log('Demo Credentials:');
    console.log('User Account:');
    console.log('  Email: user@example.com');
    console.log('  Password: password123');
    console.log('\nAdmin Account:');
    console.log('  Email: admin@example.com');
    console.log('  Password: admin123');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();
