const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    stock: Number,
    category: String,
    imageUrl: String,
    isFeatured: {
      type: Boolean,
      default: false,
    },
    createdAt: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('Product', productSchema);
  