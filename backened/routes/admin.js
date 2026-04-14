const express = require('express');
const Product = require('../models/product');
const Order = require('../models/Order');   // keep this, file is Order.js
const User = require('../models/user');
const { adminMiddleware } = require('../middleware/auth');
const router = express.Router();


// Create product
router.post('/products', adminMiddleware, async (req, res) => {
  try {
    const { name, description, price, image, stock, category } = req.body;

    if (!name || !description || !price || !image || stock === undefined || !category) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const product = await Product.create({
      name,
      description,
      price,
      image,
      stock,
      category
    });

    res.status(201).json({
      message: 'Product created successfully',
      product
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update product
router.put('/products/:id', adminMiddleware, async (req, res) => {
  try {
    const { name, description, price, image, stock, category } = req.body;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, image, stock, category },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({
      message: 'Product updated successfully',
      product
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete product
router.delete('/products/:id', adminMiddleware, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all orders
router.get('/orders', adminMiddleware, async (req, res) => {
  try {
    const orders = await Order.find().populate('userId', 'username email').sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update order status
router.put('/orders/:id/status', adminMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: Date.now() },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({ message: 'Order status updated', order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get admin stats
router.get('/stats', adminMiddleware, async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalUsers = await User.countDocuments();
    
    const totalRevenue = await Order.aggregate([
      { $group: { _id: null, total: { $sum: '$totalPrice' } } }
    ]);

    res.json({
      totalProducts,
      totalOrders,
      totalUsers,
      totalRevenue: totalRevenue[0]?.total || 0
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
