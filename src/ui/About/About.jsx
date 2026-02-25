import React from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaUserFriends, FaShippingFast, FaShieldAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import LottiePlayer from './LottiePlayer'; 

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay },
  }),
};

const stats = [
  { icon: <FaUserFriends size={30} />, title: '5,000+ Happy Customers' },
  { icon: <FaStar size={30} />, title: '1,200+ 5-Star Reviews' },
  { icon: <FaShippingFast size={30} />, title: 'Fast Global Delivery' },
  { icon: <FaShieldAlt size={30} />, title: '100% Secure Checkout' },
];

const testimonials = [
  { name: 'Sarah O.', text: 'Absolutely love my wig from HerStyle! Great quality and fast shipping.' },
  { name: 'Amaka N.', text: 'The fragrance I ordered was divine. I get compliments daily!' },
  { name: 'Linda K.', text: 'Customer support was so kind. I felt valued as a shopper.' },
];

const faqs = [
  { question: 'Do you offer international shipping?', answer: 'Yes! We ship worldwide with tracking included on every order.' },
  { question: 'Are your wigs heat-friendly?', answer: 'Absolutely. Most of our wigs support heat styling up to 180°C (350°F).' },
  { question: 'What is your return policy?', answer: 'We offer 7-day returns on unworn items. Check our Returns page for full details.' },
];

const About = () => {
  return (
    <div className="bg-white text-gray-800">

      {/* Hero Section */}
      <section className="bg-gray-100 py-20 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">About</h1>
        <p className="text-lg max-w-2xl mx-auto">
          <Link to="/">Home</Link> / <span className='text-[#ff496c]'>About</span>
        </p>
      </section>

      {/* Our Story Section */}
      <section className="relative py-20 px-6 max-w-6xl mx-auto overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" fill="none" viewBox="0 0 1000 1000">
            <defs>
              <pattern id="pattern-bg" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1" fill="#ec4899" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#pattern-bg)" />
          </svg>
        </div>

        <motion.div
          className="grid md:grid-cols-2 gap-10 items-center relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <div>
            <h2 className="text-3xl font-bold mb-4 text-[#ff496c]">Our Story</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Oma'sStore was born from the vision of redefining elegance and self-expression. With every product we curate — from luxurious wigs to timeless fragrances and bespoke accessories — we aim to make our customers feel bold, beautiful, and unapologetically themselves.
            </p>
            <p className="text-gray-600 mb-4">
              Rooted in quality, trust, and inclusivity, our brand serves as a sanctuary where beauty is celebrated in all forms.
            </p>
            <div className="mt-6 p-6 border-l-4 border-[#ff496c] bg-pink-50 rounded-md shadow-sm">
              <h3 className="text-xl font-semibold text-[#ff496c] mb-2">Our Vision</h3>
              <p className="text-gray-700 text-sm">
                To become a global symbol of self-love and luxury — where every woman can find her unique style, and every product tells a story of confidence, identity, and grace.
              </p>
            </div>
          </div>

          <div className="w-full h-[300px] md:h-[400px] overflow-hidden place-items-center">
            <LottiePlayer />
          </div>
        </motion.div>
      </section>

      {/* Founder Section */}
      <section className="py-16 px-6 max-w-4xl mx-auto text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
          <img src="https://via.placeholder.com/100x100?text=Founder" alt="Founder" className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" />
          <h3 className="text-xl font-semibold text-[#ff496c]">Meet Our Founder</h3>
          <p className="text-gray-600 mt-2 text-sm leading-relaxed">
            “Oma'sStore was inspired by my own journey of self-love, beauty, and cultural pride. Every product is handpicked with passion to help you feel beautiful, seen, and unstoppable.”
          </p>
          <p className="mt-4 font-medium text-gray-700">– Jane Doe, Founder</p>
        </motion.div>
      </section>

      {/* Core Values Section */}
      <section className="bg-gray-50 py-16 px-6 max-w-6xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
          <h3 className="text-2xl font-bold text-center mb-10">Our Core Values</h3>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="p-6 bg-white rounded-lg shadow">
              <h4 className="font-semibold text-[#ff496c] mb-2">Authenticity</h4>
              <p className="text-sm text-gray-600">We offer only products we believe in, built to empower you.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
              <h4 className="font-semibold text-[#ff496c] mb-2">Excellence</h4>
              <p className="text-sm text-gray-600">Quality is our promise — in service, style, and substance.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
              <h4 className="font-semibold text-[#ff496c] mb-2">Inclusion</h4>
              <p className="text-sm text-gray-600">Beauty belongs to everyone, everywhere — without exception.</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 max-w-6xl py-12 mx-auto px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {stats.map((item, index) => (
            <motion.div
              key={index}
              custom={index * 0.2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="flex flex-col items-center space-y-2"
            >
              <div className="text-[#ff496c]">{item.icon}</div>
              <p className="font-semibold text-sm">{item.title}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-6 max-w-5xl mx-auto text-center">
        <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-2xl font-bold mb-8">
          What Our Customers Say
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((review, i) => (
            <motion.div
              key={i}
              className="bg-pink-50 p-6 rounded-xl shadow"
              custom={i * 0.2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <p className="text-gray-700 mb-3 italic">"{review.text}"</p>
              <p className="font-bold text-[#ff496c]">– {review.name}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-100 py-16 px-6 max-w-4xl mx-auto">
        <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-2xl font-bold mb-6 text-center">
          Frequently Asked Questions
        </motion.h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.details
              key={i}
              className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer"
              custom={i * 0.2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <summary className="font-medium">{faq.question}</summary>
              <p className="mt-2 text-sm text-gray-600">{faq.answer}</p>
            </motion.details>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#ff496c] text-white py-16 text-center px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
          <h2 className="text-2xl font-bold mb-3">Ready to Elevate Your Style?</h2>
          <p className="mb-6 text-sm">Explore our handpicked collections now and find your signature look.</p>
          <Link to="/shop" className="bg-white text-[#ff496c] font-semibold py-2 px-6 rounded hover:bg-gray-100">
            Shop Now
          </Link>
        </motion.div>
      </section>

    </div>
  );
};

export default About;
