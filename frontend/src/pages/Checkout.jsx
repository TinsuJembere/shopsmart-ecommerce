import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const calculateTotal = (cartItems) => {
  let subtotal = 0;

  cartItems.forEach((item) => {
    const price = item.productId?.price || 0;
    subtotal += price * item.quantity;
  });

  const tax = subtotal * 0.1;
  const discount = 2.3;
  const total = subtotal + tax - discount;

  return { subtotal, tax, discount, total };
};

const OrderInfo = () => {
  const [shipping, setShipping] = useState({
    fullName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipCode: "",
    contactNumber: "",
  });

  const [payment, setPayment] = useState({
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    nameOnCard: "",
    billingAddress: "",
    billingZipCode: "",
    country: "",
    stateProvince: "",
    city: "",
    phoneNumber: "",
  });

  const [cartItems, setCartItems] = useState([]);
  const [orderSummary, setOrderSummary] = useState({
    subtotal: 0,
    tax: 0,
    discount: 0,
    total: 0,
  });

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("https://shopsmart-ecommerce.onrender.com/api/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCartItems(res.data.items || []);
        console.log("Cart data:", res.data.items);
        setOrderSummary(calculateTotal(res.data.items || []));
      } catch (error) {
        console.error("Cart fetch error:", error.message);
      }
    };

    fetchCartItems();
  }, []);

  const handleShippingChange = (e) => {
    const { id, value } = e.target;
    setShipping((prev) => ({ ...prev, [id]: value }));
  };

  const handlePaymentChange = (e) => {
    const { id, value } = e.target;
    setPayment((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
  
      const payload = {
        items: cartItems.map(item => ({
          productId: item.productId._id,
          quantity: item.quantity,
        })),
      };
  
      const res = await axios.post("https://shopsmart-ecommerce.onrender.com/api/checkout", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log("Checkout success:", res.data);
    } catch (err) {
      console.error("Checkout error:", err);
    }
  };
  

  return (
    <div className="bg-[url('src/assets/images/registerbg.jpg')] bg-no-repeat bg-cover min-h-screen flex flex-col justify-center items-center py-5">
      <div className="bg-white p-8 rounded-md w-full max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-6 text-center">
          Order Summary
        </h2>
        <div className="mb-4">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex justify-between text-gray-700 mb-2"
            >
              <span>
                {item.productId?.name} x {item.quantity}
              </span>
              <span>${(item.productId?.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 pt-4 mb-4">
          <div className="flex justify-between text-gray-700 mb-2">
            <span>Subtotal</span>
            <span>${orderSummary.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-700 mb-2">
            <span>Tax</span>
            <span>${orderSummary.tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-700 mb-2">
            <span>Discount</span>
            <span>${orderSummary.discount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold text-gray-800">
            <span>Total</span>
            <span>${orderSummary.total.toFixed(2)}</span>
          </div>
        </div>

        <button
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={handleSubmit}
        >
          Confirm Purchase
        </button>
      </div>

      <div className="bg-white p-5 rounded w-full max-w-md flex flex-col items-center justify-center">
        <h2 className="text-2xl font-semibold text-black mb-4">Checkout</h2>
        <p className="text-sm text-gray-600 mb-10 text-center">
          Please Ensure Only Signup Using eshopfashion.com Discount Link
        </p>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-black mb-3">
            Shipping Details
          </h3>
          {[
            "fullName",
            "address1",
            "address2",
            "city",
            "state",
            "zipCode",
            "contactNumber",
          ].map((field) => (
            <div key={field} className="mb-2">
              <input
                type="text"
                id={field}
                value={shipping[field]}
                onChange={handleShippingChange}
                className="appearance-none border rounded border-gray-200 w-full py-2 px-3 text-gray-700"
                placeholder={field.replace(/([A-Z])/g, " $1")}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-5 rounded w-full max-w-md flex flex-col items-center justify-center mb-8">
        <h3 className="text-lg font-semibold text-black mb-3">
          Payment Information
        </h3>
        {[
          "cardNumber",
          "expirationDate",
          "cvv",
          "nameOnCard",
          "billingAddress",
          "billingZipCode",
          "country",
          "stateProvince",
          "city",
          "phoneNumber",
        ].map((field) => (
          <div key={field} className="mb-2">
            <input
              type="text"
              id={field}
              value={payment[field]}
              onChange={handlePaymentChange}
              className="appearance-none border rounded border-gray-200 w-full py-2 px-3 text-gray-700"
              placeholder={field.replace(/([A-Z])/g, " $1")}
            />
          </div>
        ))}

        <button
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          type="button"
          onClick={handleSubmit}
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

const CheckoutPage = () => {
  return (
    <div>
      <Navbar />
      <OrderInfo />
      <Footer />
    </div>
  );
};

export default CheckoutPage;
