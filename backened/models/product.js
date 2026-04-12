const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide product name'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide product description']
  },
  price: {
    type: Number,
    required: [true, 'Please provide product price'],
    min: 0
  },
  image: {
    type: String,
    required: [true, 'Please provide product image URL']
  },
  stock: {
    type: Number,
    required: [true, 'Please provide stock quantity'],
    default: 0
  },
  category: {
    type: String,
    required: [true, 'Please provide category'],
    enum: ['Electronics', 'Clothing', 'Books', 'Home', 'Other'],
    default: 'Other'
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviews: [{
    user: String,
    comment: String,
    rating: Number,
    date: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', productSchema);
