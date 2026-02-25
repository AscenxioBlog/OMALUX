import React, { useState } from 'react';
import { MdSearch } from "react-icons/md";
import { Link } from 'react-router-dom';
import { shopProductsS } from '../../../Resources/ShopProducts';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useCart } from '../Checkout/CartContext';

function Shopproducts() {
  const { addToCart } = useCart();
  const [sortOption, setSortOption] = useState('date');
  const [currentPage, setCurrentPage] = useState(1);
  const [value, setValue] = useState(50);
  const itemsPerPage = 8;

  const totalPages = Math.ceil(shopProductsS.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = shopProductsS.slice(indexOfFirstItem, indexOfLastItem);

  const handleChange = (e) => {
    setSortOption(e.target.value);
    console.log('Sorting by:', e.target.value);
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-4 mt-28">
      {/* ──────── Top Controls ──────── */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <div className="flex items-center justify-center">
          {/* <img
            src="https://tunatheme.com/tf/html/fiama-preview/fiama/img/logo.png"
            alt="logo"
            className="object-contain"
          /> */}
        </div>

        {/* Search Input */}
        <div className="relative w-full max-w-md">
          <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <MdSearch className="h-5 w-5 text-gray-500" />
          </span>
          <input
            type="text"
            placeholder="Search Product, brands and categories"
            className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#FF496C]"
          />
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center space-x-4 mb-2">
          <label htmlFor="sort" className="text-lg font-medium text-gray-700">
            Sort by:
          </label>
          <select
            id="sort"
            value={sortOption}
            onChange={handleChange}
            className="border border-gray-300 px-9 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#FF496C]"
          >
            <option value="date">Date</option>
            <option value="profit">Profit</option>
            <option value="loss">Loss</option>
            <option value="ticker">Ticker</option>
          </select>
        </div>
      </div>

      {/* ──────── Main Content ──────── */}
      <div className="mt-10 flex flex-col lg:flex-row gap-8">
        {/* ──────── Categories Sidebar ──────── */}
        <div className="w-full lg:w-1/4">
          <h1 className="font-extrabold text-[18px] text-black">PRODUCT CATEGORIES</h1>
          <div className="flex flex-col gap-2 lg:gap-4 text-sm text-gray-500 font-semibold mt-4">
            <Link>Watches</Link>
            <Link>Fragrances for Men & Women</Link>
            <Link>Stylish Bracelets</Link>
            <Link>Luxury Women’s Hair</Link>
            <Link>Fragrances for Men & Women</Link>
          </div>

          {/* Price Filter */}
          <div className="mt-10">
            <h1 className="font-extrabold text-[20px] text-black">Price</h1>
            <div className="flex flex-col bg-white mt-5">
              <h2 className="text-lg font-medium text-gray-800">FILTER BY PRICE</h2>
              <input
                type="range"
                min="0"
                max="200"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-64 h-2 rounded-lg appearance-none cursor-pointer bg-gray-300 accent-[#FF496C] mt-3"
              />
              <span className="mt-3 text-gray-700">Price: ₦ 0 - ₦ {value}</span>
            </div>
          </div>
        </div>

        {/* ──────── Products and Pagination ──────── */}
        <div className="w-full flex flex-col">
          {/* Products Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {currentItems.map((item) => (
              <Link
                key={item.id}
                to={`/product/shop/${item.id}`}
                className="border border-gray-200 p-4 flex flex-col rounded shadow-sm bg-white"
              >
                <img
                  src={item.image}
                  alt={item.description}
                  className="w-full object-contain mb-4 h-[150px]"
                />
                <p className="text-gray-600 text-sm line-clamp-2 mt-3">
                  {item.description}
                </p>
                <p className="text-[17px] font-bold text-gray-600 mt-3">₦ {item.price}</p>

                    {/* Add to Cart Button */}

                   <button 
              onClick={(e) => {
                e.preventDefault(); // Prevent navigation
                addToCart(item);
              }}
              className=" 
                w-full mt-4 border border-[#FF496C] text-[#FF496C] text-sm font-semibold
                px-4 py-2 rounded-md transition duration-300 ease-in-out
                hover:bg-[#FF496C] hover:text-white hover:scale-[1.02]
              "
            >
              Add to Cart
            </button> 
              </Link>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center gap-3 mt-8">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded border text-sm text-gray-600 disabled:opacity-40"
            >
              <FaAngleLeft />
            </button>

            {Array.from({ length: totalPages }, (_, idx) => (
              <button
                key={idx + 1}
                onClick={() => goToPage(idx + 1)}
                className={`px-3 py-1 rounded border text-sm ${
                  currentPage === idx + 1
                    ? 'bg-[#FF496C] text-white'
                    : 'text-gray-600'
                }`}
              >
                {idx + 1}
              </button>
            ))}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded border text-sm text-gray-600 disabled:opacity-40"
            >
              <FaAngleRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shopproducts;
