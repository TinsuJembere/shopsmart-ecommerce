import React from 'react';
import { ShoppingCart } from 'lucide-react'; // or use a regular emoji/icon if not using Lucide

const PromoBanner = () => {
  return (
    <div className="bg-white px-4 py-10 flex justify-center">
      <div className="flex flex-col md:flex-row items-center bg-indigo-50 rounded-2xl overflow-hidden max-w-5xl w-full shadow-md">
        {/* Left Text Section */}
        <div className="flex-1 p-6 md:p-10">
          <p className="text-gray-700 text-sm mb-2">Mega Savings Week</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Up to 50% Off!</h2>
          <button className="inline-flex items-center bg-indigo-600 text-white text-sm px-5 py-2 rounded hover:bg-indigo-700 transition">
            <ShoppingCart size={16} className="mr-2" />
            Shop now!
          </button>
        </div>

        {/* Right Image Section */}
        <div className="flex-1">
          <img
            src="src/assets/images/sale-banner.jpg" // Replace with your actual image path
            alt="Sale"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;
