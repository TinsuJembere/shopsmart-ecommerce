import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import axios from "axios";

// CartItem Component to display individual cart items
const CartItem = ({ imageUrl, name, quantity, price, productId, updateQuantity, removeItem }) => (
  <div className="flex items-center space-x-4 py-2 border-b border-gray-200">
    <img
      src={imageUrl}
      alt={name}
      className="w-20 h-20 object-cover rounded-md"
    />
    <div className="flex-1">
      <p className="text-sm font-medium text-gray-900">{name}</p>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => updateQuantity(productId, -1)}
          className="bg-gray-200 text-gray-600 rounded-full w-8 h-8 flex items-center justify-center text-xs cursor-pointer"
        >
          -
        </button>
        <span>{quantity}</span>
        <button
          onClick={() => updateQuantity(productId, 1)}
          className="bg-gray-200 text-gray-600 rounded-full w-8 h-8 flex items-center justify-center text-xs cursor-pointer"
        >
          +
        </button>
        <button
          onClick={() => removeItem(productId)}
          className="ml-2 text-red-500 text-xs font-bold cursor-pointer"
        >
          Remove
        </button>
      </div>
    </div>
    <p className="text-sm text-gray-700">${price.toFixed(2)}</p>
  </div>
);

// ShoppingCartSummary Component
const ShoppingCartSummary = ({ cartItems, updateQuantity, removeItem }) => {
  const total = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.productId.price,
    0
  );

  return (
    <div className="bg-white p-6 rounded-md shadow-md mb-8">
      <h2 className="text-lg font-semibold mb-4">Shopping Cart Summary</h2>
      {cartItems.map((item) => (
        <CartItem
          key={item._id}
          productId={item.productId._id}
          imageUrl={`https://shopsmart-ecommerce.onrender.com/${item.productId.imageUrl}`}
          name={item.productId.name}
          quantity={item.quantity}
          price={item.productId.price}
          updateQuantity={updateQuantity}
          removeItem={removeItem}
        />
      ))}
      <div className="mt-4 text-right font-semibold">
        Total: ${total.toFixed(2)}
      </div>
      <Link to="/checkout">
        <button className="bg-indigo-500 cursor-pointer text-white rounded-md py-2 px-4 ml-2 font-semibold text-sm">
          Check Out
        </button>
      </Link>
    </div>
  );
};

// DiscountAndPromotions Component (No change)
const DiscountAndPromotions = () => (
  <div className="p-6 mb-8">
    <h3 className="text-md font-semibold mb-2">Discount and Promotions</h3>
    <div className="flex items-center">
      <input
        type="text"
        placeholder="Enter discount code"
        className="border border-gray-300 rounded-md py-2 px-3 w-full sm:w-auto"
      />
      <button className="bg-indigo-500 text-white rounded-md py-2 px-4 ml-2 font-semibold text-sm">
        Apply
      </button>
    </div>
  </div>
);

// ProceedToCheckout Component (No change)
const ProceedToCheckout = () => (
  <div className="bg-white px-4 py-10 flex justify-center">
    <div className="flex flex-col md:flex-row items-center bg-indigo-600 rounded-2xl overflow-hidden max-w-5xl w-full shadow-md">
      {/* Left Text Section */}
      <div className="flex-1 p-6 md:p-10">
        <h2 className="text-xl font-bold mb-2">Proceed to Checkout</h2>
        <p className="text-sm text-indigo-200 mb-4">
          Complete your purchase now to enjoy fast shipping and transparent tax
          details. Secure your items before they're gone!
        </p>
        <button className="bg-white text-indigo-600 rounded-md py-3 px-6 font-semibold text-sm">
          Join for free
        </button>
      </div>

      {/* Right Image Section */}
      <div className="flex-1">
        <img
          src="/girls.jpg"
          alt="Sale"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  </div>
);

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("https://shopsmart-ecommerce.onrender.com/api/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCartItems(res.data.items); 
      } catch (err) {
        console.error("Failed to fetch cart", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const updateQuantity = async (productId, delta) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        "https://shopsmart-ecommerce.onrender.com/api/cart/update",
        {
          productId,
          quantity: delta,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCartItems(res.data.items); 
    } catch (err) {
      console.error("Error updating quantity", err);
    }
  };

  const removeItem = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(
        `https://shopsmart-ecommerce.onrender.com/api/cart/remove/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCartItems(res.data.items);
    } catch (err) {
      console.error("Error removing item", err);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <ShoppingCartSummary
          cartItems={cartItems}
          updateQuantity={updateQuantity}
          removeItem={removeItem}
        />
        <DiscountAndPromotions />
        <ProceedToCheckout />
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
