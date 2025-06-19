import React from "react";
import Navbar from "../components/Navbar";
import { Link as ScrollLink } from "react-scroll";
import FeaturedProducts from "../components/FeaturedProducts";
import PromoBanner from "../components/PromoBanner";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <Navbar />
      <div className="bg-[url('/homeBg.jpg')] flex flex-col bg-cover bg-center h-100 w-full items-center justify-center">
        <h1 className="text-white text-7xl font-semibold font-sans pb-5">
          Discover The Best Deals
        </h1>
        <h1 className="text-white text-2xl font-sans pb-7">
          Unbeatable offers on top-rated products. Don't miss out!
        </h1>
        <Link
          to="/products"
          smooth={true}
          offset={-70}
          duration={500}
          className="cursor-pointer"
        >
          <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-md px-4 py-2 flex items-center">
            Shop Now
          </button>
        </Link>
      </div>
      <FeaturedProducts />
      <PromoBanner />
      <Footer />
    </div>
  );
}

export default Home;
