import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductCard = ({ product }) => (
  <div className="rounded-lg p-4 shadow-lg transition">
    <img
      src={`https://shopsmart-ecommerce.onrender.com/${product.imageUrl}`}
      alt={product.name}
      className="w-full h-40 object-cover rounded-md mb-3"
    />
    <h3 className="font-semibold text-sm mb-1">{product.name}</h3>
    <p className="text-gray-500 text-sm mb-1">{product.description}</p>
    <p className="text-gray-700 font-medium text-sm mb-1">${product.price}</p>
    <button className="mt-3 px-4 py-1 border border-indigo-500 text-indigo-500 text-sm w-full rounded hover:bg-indigo-50">
      Buy Now
    </button>
  </div>
);

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const res = await axios.get("https://shopsmart-ecommerce.onrender.com/api/products/new/featured");
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch featured products", err);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <div className="bg-white p-6 md:p-10 min-h-screen">
      <h2 className="text-2xl font-bold text-center mb-8">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
