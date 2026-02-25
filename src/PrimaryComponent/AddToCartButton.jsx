import React from "react";
import { useCart } from "../ui/Checkout/CartContext";


const AddToCartButton = ({ product, className = "", buttonText = "Add to Cart", showQuantity = false }) => {
  const { addToCart } = useCart();


  const { cart } = useCart();
  const itemInCart = showQuantity ? cart.find(item => item.id === product.id) : null;

  const handleAdd = () => {
    addToCart(product);
  };

  
  return (
    <button
      onClick={handleAdd}
      className={`w-full mt-4 border border-[#FF496C] text-[#FF496C] text-sm font-semibold
            px-4 py-2 rounded-md transition duration-300 ease-in-out
            hover:bg-[#FF496C] hover:text-white hover:scale-[1.02] ${className}`}
    >
      {buttonText}
      {showQuantity && itemInCart && (
        <span className="ml-2 bg-white text-[#FF496C] px-2 py-0.5 rounded-full text-xs">
            {itemInCart.quantity}
        </span>
      )}
    </button>
  );
};

export default AddToCartButton;
