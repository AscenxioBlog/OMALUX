import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCheckCircle, FiTruck } from 'react-icons/fi';
import { MdOutlineVerified } from 'react-icons/md';

function Intro() {
  return (
    <section className="pt-6 lg:pt-12 pb-10">
      <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-gradient-to-br from-rose-50 via-white to-gray-100 px-5 py-10 md:px-10 lg:px-14 lg:py-14">
        <div className="absolute -top-20 -right-12 h-64 w-64 rounded-full bg-[#FF496C]/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-[#1F2937]/10 blur-3xl" />

        <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold tracking-wide text-gray-700 shadow-sm">
              <MdOutlineVerified className="text-[#FF496C]" />
              Trusted Luxury Marketplace
            </p>

            <h1 className="mt-4 text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
              Elevate Your Style With Curated Luxury Essentials
            </h1>

            <p className="mt-4 max-w-xl text-lg text-gray-600">
              Discover premium watches, fragrances, hair, and accessories with reliable delivery and
              exclusive pre-order access.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 rounded-lg bg-[#FF496C] px-6 py-3 text-white font-semibold transition hover:bg-[#e33f5f]"
              >
                Shop Collection
                <FiArrowRight />
              </Link>

              <Link
                to="/pre-order/products"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 text-gray-800 font-semibold transition hover:border-[#FF496C] hover:text-[#FF496C]"
              >
                Start Pre-Order
              </Link>
            </div>

            <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-gray-200 bg-white p-4">
                <p className="text-2xl font-bold text-gray-900">2k+</p>
                <p className="text-sm text-gray-600">Verified Orders</p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-4">
                <p className="text-2xl font-bold text-gray-900">500+</p>
                <p className="text-sm text-gray-600">Premium Products</p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-4">
                <p className="text-2xl font-bold text-gray-900">99%</p>
                <p className="text-sm text-gray-600">Happy Clients</p>
              </div>
            </div>
          </div>

          <div>
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <img src="/oma.png" alt="OMA brand" className="h-16 w-auto object-contain" />
              <h2 className="mt-5 text-2xl font-bold text-gray-900">Luxury Delivered With Confidence</h2>

              <div className="mt-5 space-y-3 text-gray-700">
                <p className="flex items-start gap-2">
                  <FiCheckCircle className="mt-1 text-[#FF496C]" />
                  Authentic products selected from trusted suppliers.
                </p>
                <p className="flex items-start gap-2">
                  <FiTruck className="mt-1 text-[#FF496C]" />
                  Fast and secure shipping across regions.
                </p>
                <p className="flex items-start gap-2">
                  <MdOutlineVerified className="mt-1 text-[#FF496C]" />
                  Transparent pre-order batches and order updates.
                </p>
              </div>

              <Link
                to="/about"
                className="mt-6 inline-flex items-center gap-2 text-[#FF496C] font-semibold hover:underline"
              >
                Learn more about OMA
                <FiArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Intro;
