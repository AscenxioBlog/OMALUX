import React from 'react';
import { FaFacebookF, FaInstagram, FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold text-white">Oma'sStore</h2>
          <p className="mt-4 text-sm text-gray-400">
            Curated elegance in every detail. Discover premium wigs, timeless fragrances, and signature accessories.
          </p>
          <div className="flex mt-4 space-x-4">
            <a href="#" className="text-gray-400 hover:text-white">
              <FaFacebookF />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <FaInstagram />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <FaXTwitter />
            </a>
          </div>
        </div>

        {/* Shop Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Shop</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">Female Wigs</a></li>
            <li><a href="#" className="hover:text-white">Unisex Fragrances</a></li>
            <li><a href="#" className="hover:text-white">Watches</a></li>
            <li><a href="#" className="hover:text-white">Bracelets</a></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/about" className="hover:text-white">About Us</a></li>        
            <li><a href="#" className="hover:text-white">FAQs</a></li>
            <li><a href="#" className="hover:text-white">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-white">Track Your Order</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Stay Updated</h3>
          <p className="text-sm text-gray-400 mb-3">
            Get exclusive deals and style tips directly in your inbox.
          </p>
          <form className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-2">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-3 py-2 rounded bg-gray-800 text-gray-100 focus:outline-none focus:ring focus:ring-pink-500"
            />
            <button className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700">
              Subscribe
            </button>
          </form>
          <div className="mt-5 text-sm text-gray-400">
            <p><strong>Email:</strong> support@Oma'sStore.com</p>
            <p><strong>Phone:</strong> +1 (234) 567-8901</p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 py-6 px-6 text-sm flex flex-col sm:flex-row justify-between items-center max-w-7xl mx-auto">
        <p className="text-gray-500">&copy; 2025 Oma'sStore. All rights reserved.</p>
        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Service</a>
          <img
            src="https://www.svgrepo.com/show/303264/payment-method.svg"
            alt="Payment methods"
            className="h-6 ml-3"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
