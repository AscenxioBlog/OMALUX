import React from 'react';
import { OmasStoree } from '../../../Resources/OmasStore';
import { Link } from 'react-router-dom';

function OmasStore() {
  return (
    <div className="w-full px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* ──────── Text Section ──────── */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-2xl font-bold mb-4">Oma'sStore –</h2>
          <p className="text-sm leading-relaxed text-gray-700">
            Welcome to Oma'sStore, your go-to destination in Nigeria for authentic fragrances, elegant watches,
            stylish bracelets, and premium women’s hair products.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-2">Explore Our Collections:</h3>

          <div className="space-y-4 text-sm text-gray-700">
            {/* Fragrances */}
            <div>
              <strong className="text-black">Fragrances for Men & Women</strong>
              <p>
                Discover long-lasting, original perfumes from top global brands. Whether you prefer bold, subtle, or
                classic scents, we have something just for you.
              </p>
            </div>

            {/* Watches */}
            <div>
              <strong className="text-black">Watches that Define Style</strong>
              <p>
                Shop sleek, fashionable watches for men and women—perfect for everyday wear or special occasions.
              </p>
            </div>

            {/* Bracelets */}
            <div>
              <strong className="text-black">Stylish Bracelets</strong>
              <p>
                Add flair to your outfit with our range of bracelets, from simple leather bands to elegant metallics.
              </p>
            </div>

            {/* Hair Products */}
            <div>
              <strong className="text-black">Luxury Women’s Hair</strong>
              <p>
                Get flawless hair with our selection of wigs, extensions, and human hair bundles—authentic, durable,
                and affordable.
              </p>
            </div>

            {/* Trust Factors */}
            <div>
              <strong className="text-black">Why Shop with Us?</strong>
              <p>
                At Oma'sStore, we prioritize quality and customer satisfaction. Our products are sourced from trusted
                suppliers, ensuring you receive only the best.
              </p>
            </div>

            {/* Security */}
            <div>
              <strong className="text-black">Secure Shopping Experience</strong>
              <p>
                Shop with confidence! Our website is secure, and we offer multiple payment options for your
                convenience.
              </p>
            </div>

            {/* Final Note */}
            <p className="font-semibold text-black mt-4">
              Enjoy fast delivery, affordable pricing, and 100% quality guarantee. Shop now at Oma'sStore—where style
              meets convenience.
            </p>

            {/* Signature */}
            <img
              src="https://htmlbeans.com/html/botanical/images/signature.png"
              alt="signature"
              className="h-14 w-30 mt-6"
              loading="lazy"
            />

            <p className="text-black mt-4 text-sm md:text-base">
              <strong>Yusuf Hassan – CEO</strong>
            </p>
          </div>
        </div>

        {/* ──────── Product Grid Section ──────── */}
        <div className="w-full lg:w-1/2">
          <h1 className="text-2xl font-bold text-center mb-4">Explore Our Collections:</h1>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6 place-items-center">
            {OmasStoree.map((item) => (
              <Link
                key={item.id}
                className="border border-gray-200 p-4 flex flex-col items-center rounded shadow-sm bg-white w-full"
              >
                <img
                  src={item.image}
                  alt={item.description}
                  className="w-full h-40 object-contain mb-4"
                />
                <p className="text-gray-600 text-center text-sm line-clamp-2">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OmasStore;
