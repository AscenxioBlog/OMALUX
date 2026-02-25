import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import PreOrderProductsGrid from './PreOrderProductsGrid';

function PreOrderProductsPage() {
  const [selectedProductIds, setSelectedProductIds] = useState([]);

  const handleToggleProduct = (productId) => {
    setSelectedProductIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const preOrderLink = useMemo(() => {
    const query = selectedProductIds.join(',');
    return `/pre-order?productIds=${query}&source=pre-order-products`;
  }, [selectedProductIds]);

  return (
    <div className="px-4 lg:px-18 py-8 space-y-6">
      <section className="bg-gray-100 rounded-2xl px-6 py-10">
        <h1 className="text-4xl font-bold text-gray-900">Pre-Order Product Page</h1>
        <p className="mt-3 text-gray-700 max-w-2xl">
          Pick the exact product you want to reserve, then submit your pre-order request with your preferred batch.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-4">
          <Link to="/pre-order" className="text-[#FF496C] font-semibold hover:underline">
          Back to Pre-Order Form
          </Link>
          <Link
            to={preOrderLink}
            className={`px-5 py-2 rounded-md font-semibold transition ${
              selectedProductIds.length > 0
                ? 'bg-[#FF496C] text-white hover:bg-[#e33f5f]'
                : 'bg-gray-300 text-gray-500 pointer-events-none'
            }`}
          >
            Continue ({selectedProductIds.length}) selected
          </Link>
        </div>
      </section>

      <PreOrderProductsGrid selectedProductIds={selectedProductIds} onToggleProduct={handleToggleProduct} />
    </div>
  );
}

export default PreOrderProductsPage;
