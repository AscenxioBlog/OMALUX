import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export function useWishlist() {
  const [wishlist, setWishlist] = useState(() => JSON.parse(localStorage.getItem('wishlist')) || []);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.find(i => i.id === product.id);
      if (exists) {
        toast.success('Removed from wishlist');
        return prev.filter(i => i.id !== product.id);
      } else {
        toast.success('Added to wishlist ❤️');
        return [...prev, product];
      }
    });
  };

  const isWishlisted = (id) => wishlist.some(i => i.id === id);

  return { wishlist, toggleWishlist, isWishlisted };
}
