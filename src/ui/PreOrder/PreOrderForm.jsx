import React from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

function PreOrderForm({ selectedProducts = [], source }) {
  const selectedProductNames = selectedProducts.map((product) => product.description);
  const selectedProductIds = selectedProducts.map((product) => product.id);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const payload = {
      fullName: formData.get('fullName'),
      email: formData.get('email'),
      productName: formData.get('productName'),
      batch: formData.get('batch'),
      quantity: formData.get('quantity'),
      phone: formData.get('phone'),
      notes: formData.get('notes'),
      selectedProductIds,
      submissionSource: source || 'pre-order-page',
    };

    console.log('Pre-order submission:', payload);
    toast.success(`Pre-order submitted from ${payload.submissionSource}`);
    event.currentTarget.reset();
  };

  return (
    <section className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900">Pre-Order Request</h2>
      <p className="mt-2 text-gray-600">Complete the form to reserve your spot in a pre-order batch.</p>
      <p className="mt-2 text-sm text-[#FF496C] font-medium">Submission source: {source || 'pre-order-page'}</p>

      {!selectedProducts.length && (
        <p className="mt-3 text-sm text-gray-600">
          No product selected yet.{' '}
          <Link to="/pre-order/products" className="text-[#FF496C] font-semibold hover:underline">
            Pick a product first
          </Link>
          .
        </p>
      )}

      <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            name="fullName"
            type="text"
            placeholder="Jane Doe"
            required
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF496C]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email Address</label>
          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            required
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF496C]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Product Name</label>
          <input
            name="productName"
            type="text"
            placeholder="Pick from pre-order product page"
            defaultValue={selectedProductNames.join(', ')}
            readOnly={Boolean(selectedProducts.length)}
            required
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF496C]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Preferred Batch</label>
          <select name="batch" required className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF496C]">
            <option value="Batch 1 (2-3 weeks)">Batch 1 (2-3 weeks)</option>
            <option value="Batch 2 (4-5 weeks)">Batch 2 (4-5 weeks)</option>
            <option value="Batch 3 (6-8 weeks)">Batch 3 (6-8 weeks)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Quantity</label>
          <input
            name="quantity"
            type="number"
            min="1"
            defaultValue="1"
            required
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF496C]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            name="phone"
            type="tel"
            placeholder="+1 234 567 8900"
            required
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF496C]"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Additional Notes</label>
          <textarea
            name="notes"
            rows="4"
            placeholder="Color preference, special requests, or order details..."
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF496C]"
          />
        </div>

        <input type="hidden" name="submissionSource" value={source || 'pre-order-page'} />
        <input type="hidden" name="selectedProductIds" value={selectedProductIds.join(',')} />

        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-[#FF496C] hover:bg-[#e33f5f] text-white font-semibold py-3 rounded-lg transition"
          >
            Reserve My Pre-Order Slot
          </button>
        </div>
      </form>
    </section>
  );
}

export default PreOrderForm;
