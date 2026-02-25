import React from 'react';
import { Link } from 'react-router-dom';
import { featuredproducts } from '../../../Resources/FeaturedProducts';
import { useCart } from '../Checkout/CartContext';


function FeaturedProducts() {
  const { addToCart } = useCart();

  return (
    <div className="mt-10">
      {/* Title Section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Featured Product</h1>
        <div className="h-[3px] w-24 bg-[#FF496C] rounded" />
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mt-6">
        {featuredproducts.map((item) => (
          <Link
            key={item.id}
            to={`/product/featured/${item.id}`}
            className="
              relative flex flex-col justify-between border border-gray-200
              rounded-lg bg-white shadow-sm p-4 h-full
              transition-transform hover:shadow-md
            "
          >
            {/* Product Image */}
            <img
              src={item.image}
              alt={item.description}
              className="w-full h-40 object-contain mb-4"
            />

            {/* Product Info */}
            <div className="flex-1 flex flex-col justify-between">
              <p className="text-gray-600 text-center text-sm line-clamp-2">
                {item.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default FeaturedProducts;
