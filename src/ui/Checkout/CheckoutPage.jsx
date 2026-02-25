import { useCart } from "./CartContext";
import { Link } from "react-router-dom";

const CheckoutPage = () => {
  const { cart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const inputClasses =
    "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff496c] focus:border-transparent transition";

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Billing Details */}
        <div className="lg:col-span-2 bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-6">Billing Information</h2>

          <form className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="First Name" className={inputClasses} required />
              <input type="text" placeholder="Last Name" className={inputClasses} required />
            </div>

            <input type="email" placeholder="Email Address" className={inputClasses} required />
            <input type="text" placeholder="Phone Number" className={inputClasses} required />
            <input type="text" placeholder="Street Address" className={inputClasses} required />

            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="City" className={inputClasses} required />
              <input type="text" placeholder="Zip Code" className={inputClasses} required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="Country" className={inputClasses} required />
              <input type="text" placeholder="State/Province" className={inputClasses} required />
            </div>

            <button
              type="submit"
              className="w-full bg-[#ff496c] text-white py-3 rounded-lg font-semibold hover:bg-[#e23e60] transition"
            >
              Place Order
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-xl shadow-md h-fit">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
          <div className="divide-y divide-gray-200">
            {cart.map((item) => (
              <div key={item.id} className="py-3 flex justify-between">
                <div>
                  <p className="font-medium">{item.description.slice(0, 40)}...</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <p className="font-medium text-gray-700">
                  ₦{(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t pt-4 text-lg font-bold text-right">
            Total: ₦{total.toFixed(2)}
          </div>

          <Link
            to="/cart"
            className="block mt-4 text-[#ff496c] underline text-sm hover:text-[#e23e60] text-center"
          >
            ← Back to Cart
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
