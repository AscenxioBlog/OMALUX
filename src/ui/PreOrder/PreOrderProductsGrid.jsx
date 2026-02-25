import React from 'react';
import { shopProductsS } from '../../../Resources/ShopProducts';

function PreOrderProductsGrid({ selectedProductIds, onToggleProduct }) {
  return (
    <section className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-gray-900">Choose a Product for Pre-Order</h2>
        <p className="text-gray-600">Select one or more products to continue with pre-order batch booking.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {shopProductsS.map((item) => (
          <article
            key={item.id}
            className={`border rounded-xl p-4 bg-white ${
              selectedProductIds.includes(item.id) ? 'border-[#FF496C]' : 'border-gray-200'
            }`}
          >
            <img src={item.image} alt={item.description} className="w-full h-40 object-contain" />
            <p className="mt-3 text-sm text-gray-700 line-clamp-2">{item.description}</p>
            <p className="mt-2 font-semibold text-gray-900">N {item.price}</p>

            <button
              type="button"
              onClick={() => onToggleProduct(item.id)}
              className={`inline-block mt-4 w-full text-center rounded-md py-2 font-medium transition ${
                selectedProductIds.includes(item.id)
                  ? 'bg-[#FF496C] text-white'
                  : 'border border-[#FF496C] text-[#FF496C] hover:bg-[#FF496C] hover:text-white'
              }`}
            >
              {selectedProductIds.includes(item.id) ? 'Selected' : 'Select For Pre-Order'}
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

export default PreOrderProductsGrid;
