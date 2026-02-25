// CartContext.js
import { createContext, useContext, useReducer, useEffect } from "react";
import toast from "react-hot-toast";

// 1. Create the context
const CartContext = createContext();

// 2. Reducer function to manage cart state
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const product = action.payload;
      const existingItem = state.find(item => item.id === product.id);
      const quantityToAdd = product.quantity || 1;

      if (existingItem) {
        // If item already in cart, increase quantity by the specified amount
        return state.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantityToAdd }
            : item
        );
      } else {
        // Otherwise, add new item with the specified quantity
        return [...state, { ...product, quantity: quantityToAdd }];
      }
    }

    case "REMOVE_FROM_CART":
      return state.filter(item => item.id !== action.payload);

    case "INCREASE_QUANTITY":
      return state.map(item =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

    case "DECREASE_QUANTITY":
      return state.map(item =>
        item.id === action.payload && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );

    default:
      return state;
  }
};


export const CartProvider = ({ children }) => {
  const initialCart = JSON.parse(localStorage.getItem("cart")) || [];
  const [cart, dispatch] = useReducer(cartReducer, initialCart);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Cart operation functions
  const addToCart = (product, quantity = 1) => {
    const productToAdd = { ...product, quantity: quantity };
    dispatch({ type: "ADD_TO_CART", payload: productToAdd });
    toast.success(`${product.description?.slice(0, 30) || 'Product'} added to cart`);
  };

  const removeFromCart = (productId) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: productId });
    toast.success("Item removed from cart");
  };

  const increaseQuantity = (id) => {
    dispatch({ type: "INCREASE_QUANTITY", payload: id });
  };

  const decreaseQuantity = (id) => {
    dispatch({ type: "DECREASE_QUANTITY", payload: id });
  };

  // Provide value to consuming components
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

//seCart custom hook with safety check
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
