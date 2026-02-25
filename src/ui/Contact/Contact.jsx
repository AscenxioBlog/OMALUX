import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';

function Contact() {
  return (
    <div className="bg-gray-100">
      <section className="max-w-6xl mx-auto p-8 space-y-16">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Get in Touch</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We’d love to hear from you! Whether you have questions about your order, need assistance, or want to provide feedback, our team is here for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <form className="space-y-6 bg-white p-8 rounded-3xl shadow-xl">
            <h2 className="text-2xl font-semibold text-gray-800">Message Us Directly</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff496c]"
                placeholder="John Doe"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff496c]"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                rows="5"
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff496c]"
                placeholder="How can we assist you today?"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-[#FF496C] hover:bg-[#FF496C] text-white font-semibold py-3 rounded-lg transition"
            >
              Submit Message
            </button>
          </form>

          {/* Contact Info */}
          <div className="space-y-8 text-gray-800">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Customer Support</h2>
              <p>Email: <a href="mailto:support@yourstore.com" className="text-[#FF496C] hover:underline">support@yourstore.com</a></p>
              <p>Phone: <a href="tel:+1234567890" className="text-[#FF496C] hover:underline">+1 (234) 567-890</a></p>
              <p>Live Chat: Mon – Fri, 9 AM – 6 PM WAT</p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Head Office</h2>
              <address>
                45 E-Commerce Road<br />Victoria Island<br />Lagos, Nigeria
              </address>
              <iframe
                className="w-full h-60 rounded-xl border border-gray-300"
                src="https://maps.google.com/maps?q=lagos+nigeria&t=&z=13&ie=UTF8&iwloc=&output=embed"
                allowFullScreen
                title="Company Location"
              ></iframe>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Follow Us</h2>
              <div className="flex gap-4 text-[#FF496C] text-xl">
                <a href="#" aria-label="Facebook" className="hover:text-blue-800"><FaFacebookF /></a>
                <a href="#" aria-label="Instagram" className="hover:text-pink-600"><FaInstagram /></a>
                <a href="#" aria-label="Twitter" className="hover:text-blue-400"><FaTwitter /></a>
                <a href="#" aria-label="LinkedIn" className="hover:text-blue-700"><FaLinkedin /></a>
              </div>
            </div>

            <div className="text-sm text-gray-500 pt-4">
              <p><strong>Privacy Note:</strong> We value your privacy. All inquiries are kept confidential. See our <a href="/privacy-policy" className="underline text-blue-500">Privacy Policy</a>.</p>
            </div>
          </div>
        </div>

        {/* <div className="bg-white p-8 rounded-2xl shadow-inner mt-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
          <ul className="space-y-6">
            <li>
              <strong>📦 When will I receive my order?</strong>
              <p className="text-gray-600">Standard delivery is within 3–7 business days. Expedited options available at checkout.</p>
            </li>
            <li>
              <strong>💳 Can I modify or cancel my order?</strong>
              <p className="text-gray-600">Yes, within 12 hours of purchase. Contact support for urgent changes.</p>
            </li>
            <li>
              <strong>🔁 What’s your return policy?</strong>
              <p className="text-gray-600">Returns accepted within 30 days of delivery. Items must be unused and in original packaging.</p>
            </li>
          </ul>
        </div> */}
      </section>
    </div>
  );
}

export default Contact;
