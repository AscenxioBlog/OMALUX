import React from 'react';
import { Link } from 'react-router-dom';

function PreOrderHero() {
  return (
    <section className="bg-gray-100 rounded-2xl px-6 py-12 text-center">
      <p className="text-sm font-semibold tracking-widest text-[#FF496C] uppercase">Limited Batch Access</p>
      <h1 className="mt-3 text-4xl md:text-5xl font-bold text-gray-900">Pre-Order Your Product</h1>
      <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-700">
        Reserve your item in an upcoming production batch. Your slot is locked once your request is submitted.
      </p>
      <Link
        to="/pre-order/products"
        className="inline-block mt-6 bg-[#FF496C] hover:bg-[#e33f5f] text-white font-semibold px-6 py-3 rounded-lg transition"
      >
        Pick Product For Pre-Order
      </Link>
    </section>
  );
}

export default PreOrderHero;
