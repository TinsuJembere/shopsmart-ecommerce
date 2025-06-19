const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, required: true },
      },
    ],
    totalPrice: { type: Number, required: true },
    shippingDetails: {
      fullName: { type: String, required: true },
      address1: { type: String, required: true },
      address2: { type: String },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      contactNumber: { type: String, required: true },
    },
    paymentDetails: {
      cardNumber: { type: String, required: true },
      expirationDate: { type: String, required: true },
      cvv: { type: String, required: true },
      nameOnCard: { type: String, required: true },
      billingAddress: { type: String, required: true },
      billingZipCode: { type: String, required: true },
      country: { type: String, required: true },
      stateProvince: { type: String, required: true },
      city: { type: String, required: true },
      phoneNumber: { type: String, required: true },
    },
    status: { type: String, default: 'pending' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
