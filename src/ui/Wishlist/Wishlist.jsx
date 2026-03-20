import React, { useEffect, useState } from 'react';
import { useAuth } from '../SignUpForm/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { MdArrowBack, MdDelete } from 'react-icons/md';
import { useCart } from '../Checkout/CartContext';
import toast from 'react-hot-toast';

function Wishlist() {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    const stored = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(stored);
  }, [user]);

  const removeFromWishlist = (id) => {
    const updated = wishlist.filter((item) => item.id !== id);
    setWishlist(updated);
    localStorage.setItem('wishlist', JSON.stringify(updated));
    toast.success('Removed from wishlist');
  };

  const moveToCart = (item) => {
    addToCart(item);
    removeFromWishlist(item.id);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/profile')} className="text-gray-500 hover:text-[#FF496C] transition">
            <MdArrowBack className="text-2xl" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
          <span className="ml-auto text-sm text-gray-500">{wishlist.length} item{wishlist.length !== 1 ? 's' : ''}</span>
        </div>

        {wishlist.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-12 text-center">
            <p className="text-5xl mb-4">❤️</p>
            <p className="text-gray-500 text-lg">Your wishlist is empty.</p>
            <button onClick={() => navigate('/shop')} className="mt-6 bg-[#FF496C] text-white px-6 py-2 rounded-lg hover:bg-[#e63d5e] transition">
              Browse Products
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {wishlist.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl shadow p-5 flex items-center gap-5">
                <Link to={`/product/${item.source || 'shop'}/${item.id}`}>
                  <img
                    src={item.image}
                    alt={item.name || item.description}
                    className="w-20 h-20 object-cover rounded-xl"
                  />
                </Link>
                <div className="flex-1">
                  <Link to={`/product/${item.source || 'shop'}/${item.id}`}>
                    <p className="font-semibold text-gray-900 hover:text-[#FF496C] transition">
                      {item.name || item.description?.slice(0, 50)}
                    </p>
                  </Link>
                  <p className="text-[#FF496C] font-bold mt-1">₦{Number(item.price).toLocaleString()}</p>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <button
                    onClick={() => moveToCart(item)}
                    className="bg-[#FF496C] text-white text-sm px-4 py-2 rounded-lg hover:bg-[#e63d5e] transition"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="text-gray-400 hover:text-red-500 transition"
                  >
                    <MdDelete className="text-xl" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default Wishlist;
