import { useCart } from "./CartContext";
import { Link, useNavigate } from "react-router-dom";
import LottiePlayer from "../About/LottiePlayer";
import { parsePrice, formatPrice, calculateCartTotal } from "../../utils/priceUtils";
import { useAuth } from "../SignUpForm/AuthContext";
import toast from "react-hot-toast";


const CartPage = () => {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const totalPrice = calculateCartTotal(cart);

  const handleCheckout = () => {
    if (!user) {
      toast.error('Please login to proceed with checkout');
      navigate('/login', { state: { from: { pathname: '/checkout' } } });
      return;
    }
    navigate('/checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {cart.length === 0 ? (
        <div className="text-center py-20">
          <div className="flex flex-col items-center justify-center space-y-4">
            <LottiePlayer />
            <p className="text-gray-600 text-lg">Your cart is currently empty.</p>
             <Link to="/" className="px-4 py-2 bg-[#ff496c] text-white rounded hover:bg-pink-700">
                  Start Shopping
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items Section */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 bg-white shadow rounded-lg p-4"
              >
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <img
                    src={item.image}
                    alt={item.description}
                    className="w-24 h-24 object-cover rounded-md border border-gray-200"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{item.description}</h3>
                    <p className="text-gray-500 text-sm mt-1">
                      Price: {formatPrice(item.price)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300"
                    onClick={() => decreaseQuantity(item.id)}
                  >
                    −
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300"
                    onClick={() => increaseQuantity(item.id)}
                  >
                    +
                  </button>
                </div>

                <div className="text-right sm:text-left">
                  <p className="font-bold text-lg">
                    {formatPrice(parsePrice(item.price) * item.quantity)}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-sm text-red-500 hover:underline mt-2"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Section */}
          <div className="bg-white shadow rounded-lg p-6 sticky top-20 h-fit">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span>₦{totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Shipping</span>
                <span className="text-sm text-gray-400">Calculated at checkout</span>
              </div>
              <div className="border-t pt-4 mt-4 flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>₦{totalPrice.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="block w-full text-center mt-6 bg-[#ff496c] text-white py-3 rounded hover:bg-green-700 transition"
            >
              {user ? 'Proceed to Checkout' : 'Login to Checkout'}
            </button>

            <Link
              to="/"
              className="block w-full text-center mt-3 text-[#ff496c] hover:underline"
            >
              ← Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
