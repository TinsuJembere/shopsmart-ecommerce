import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

const FavoriteItem = ({ product, onAddToCart, onRemove }) => (
  <div className="rounded-md shadow-sm bg-white">
    <img
      src={`https://shopsmart-ecommerce.onrender.com/${product.imageUrl}`}
      alt={product.name}
      className="w-full h-32 object-cover rounded-md"
    />
    <div className="p-2">
      <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
      <p className="text-xs text-gray-500">{product.description}</p>
      <button
        onClick={() => onAddToCart(product)}
        className="bg-indigo-100 text-indigo-600 rounded-md py-1 px-2 text-xs mt-2 mr-5 cursor-pointer"
      >
        Add to cart
      </button>
      <button
        onClick={() => onRemove(product)} 
        className="bg-red-100 text-red-600 rounded-md py-1 px-2 text-xs mt-2 cursor-pointer"
      >
        Remove from favorites
      </button>
    </div>
  </div>
);

const FavoriteItemsSection = ({ favorites, onAddToCart, onRemove }) => (
  <div className="bg-white p-6 rounded-md shadow-md mb-8">
    <h2 className="text-lg font-semibold mb-4">Your Favorite Items</h2>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {favorites.length === 0 ? (
        <p className="text-gray-500 col-span-full">No favorites yet.</p>
      ) : (
        favorites.map((product) => (
          <FavoriteItem key={product._id} product={product} onAddToCart={onAddToCart} onRemove={onRemove} />
        ))
      )}
    </div>
  </div>
);

const QuickActionsSection = () => (
  <div className="bg-white px-4 py-10 flex justify-center">
    <div className="flex flex-col md:flex-row items-center bg-indigo-600 rounded-2xl overflow-hidden max-w-5xl w-full shadow-md">
      <div className="flex-1 p-6 md:p-10">
        <h2 className="text-xl font-bold mb-2 text-white">Quick Actions</h2>
        <p className="text-sm text-indigo-200 mb-4">
          Easily manage your selections and finalize your purchases with just a few clicks!
        </p>
        <button className="bg-white text-indigo-600 rounded-md py-2 px-4 font-semibold text-sm">
          View Your Cart
        </button>
      </div>
      <div className="flex-1">
        <img
          src="/shopping.jpg"
          alt="Sale"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  </div>
);

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("https://shopsmart-ecommerce.onrender.com/api/favorites", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFavorites(res.data);
      } catch (err) {
        console.error("Failed to fetch favorites:", err);
      }
    };

    fetchFavorites();
  }, []);

  const addToCart = async (product) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "https://shopsmart-ecommerce.onrender.com/api/cart/addToCart",
        { productId: product._id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(`${product.name} has been added to your cart.`);
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("Failed to add item to cart.");
    }
  };

  const remove = async (product) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://shopsmart-ecommerce.onrender.com/api/favorites/remove/${product._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setFavorites(favorites.filter((favProduct) => favProduct._id !== product._id));
    } catch (err) {
      console.error("Error removing from favorites:", err);
      alert("Failed to remove item from favorites.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        {/* Pass remove function here */}
        <FavoriteItemsSection favorites={favorites} onAddToCart={addToCart} onRemove={remove} />
        <QuickActionsSection />
      </div>
      <Footer />
    </div>
  );
};

export default Favorites;
