const Order = require('../models/order');
const Product = require('../models/product');
const mongoose = require('mongoose');

exports.createOrder = async (req, res) => {
  const { cartItems, totalPrice, shippingDetails, paymentDetails } = req.body;
  const session = await mongoose.startSession();

  try {
    if (!Array.isArray(cartItems)) {
      return res.status(400).json({ message: 'cartItems must be an array' });
    }

    session.startTransaction();

    const populatedItems = [];

    for (let item of cartItems) {
      const product = await Product.findById(item.productId).session(session);
      if (!product) {
        await session.abortTransaction();
        return res.status(404).json({ message: `Product not found: ${item.productId}` });
      }

      if (product.stock < item.quantity) {
        await session.abortTransaction();
        return res.status(400).json({ message: `Not enough stock for ${product.name}` });
      }

      product.stock -= item.quantity;
      await product.save({ session });

      populatedItems.push({
        productId: product._id,
        quantity: item.quantity,
      });
    }

    if (!shippingDetails || !paymentDetails) {
      return res.status(400).json({ message: 'Missing shipping or payment details' });
    }    

    const order = new Order({
      userId: req.user.id,
      items: populatedItems,
      totalPrice,
      shippingDetails,
      paymentDetails,
      status: 'pending',
    });    
    await order.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json(order);
  } catch (err) {
    console.error('Order creation error:', err);
res.status(500).json({ message: err.message || 'Server error during order creation' });
  }
};

// Get all Orders of a User
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).populate('items.productId');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Order Status
exports.updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete Order
exports.deleteOrder = async (req, res) => {
  try {
    const deleted = await Order.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Order not found" });
    res.json({ message: "Order deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get Single Order
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.productId');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
