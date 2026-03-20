import { useState, useEffect } from "react";
import { useCart } from "./CartContext";
import { useAuth } from "../SignUpForm/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { parsePrice, calculateCartTotal, formatPrice } from "../../utils/priceUtils";

const VERIFY_URL = "https://ikjhhxurjdsucpyncqgl.supabase.co/functions/v1/verify-payment";
const PAYSTACK_PUBLIC_KEY = "pk_test_cfd8fb2a57eefcc2ec6f89807437c147f627510f";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlramhoeHVyamRzdWNweW5jcWdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMxMzg3NzksImV4cCI6MjA4ODcxNDc3OX0.hnAU0Ct0oi_m6PxtqeVjbRrpsOvFwy801m-sPOMN18Q";

const CheckoutPage = () => {
  const { cart, removeFromCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const total = calculateCartTotal(cart);
  const [loading, setLoading] = useState(false);
  const [paystackReady, setPaystackReady] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "",
  });

  useEffect(() => {
    if (window.PaystackPop) { setPaystackReady(true); return; }

    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.onload = () => { setPaystackReady(true); console.log("Paystack ready ✅"); };
    script.onerror = () => console.error("Paystack script failed to load ❌");
    document.body.appendChild(script);
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const verifyAndSaveOrder = async (reference) => {
    setLoading(true);
    try {
      const res = await fetch(VERIFY_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${SUPABASE_ANON_KEY}` },
        body: JSON.stringify({
          reference,
          orderData: {
            customer_name: `${form.firstName} ${form.lastName}`,
            customer_email: form.email,
            customer_phone: form.phone,
            shipping_address: `${form.address}, ${form.city}, ${form.state}, ${form.country}`,
            items: cart.map(i => ({ ...i, name: i.name || i.description || "Product" })),
            total_amount: total,
          },
        }),
      });

      const data = await res.json();
      console.log("VERIFY RESPONSE:", data);

      if (data.success) {
        toast.success("Order placed successfully! 🎉");
        cart.forEach((item) => removeFromCart(item.id));
        navigate("/orders");
      } else {
        toast.error("Payment verification failed.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    }
    setLoading(false);
  };

  const handlePayment = (e) => {
    e.preventDefault();

    if (!paystackReady) { toast.error("Payment system not ready."); return; }
    if (!form.firstName || !form.email || !form.phone || !form.address) {
      toast.error("Please fill all required fields");
      return;
    }
    if (cart.length === 0) { toast.error("Cart is empty"); return; }

    const handler = window.PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email: form.email,
      amount: Math.round(total) * 100,
      currency: "NGN",
      ref: `OMA${Date.now()}`,
      metadata: {
        custom_fields: [
          { display_name: "Phone", variable_name: "phone", value: form.phone },
          { display_name: "Name", variable_name: "name", value: `${form.firstName} ${form.lastName}` },
        ],
      },
      callback: (response) => {
        console.log("PAYSTACK RESPONSE:", response);
        verifyAndSaveOrder(response.reference);
      },
      onClose: () => toast.error("Payment cancelled."),
    });

    handler.openIframe();
  };

  const inputClasses =
    "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff496c]";

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

        <div className="lg:col-span-2 bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-6">Billing Information</h2>

          <form onSubmit={handlePayment} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <input name="firstName" onChange={handleChange} placeholder="First Name" className={inputClasses} required />
              <input name="lastName" onChange={handleChange} placeholder="Last Name" className={inputClasses} required />
            </div>
            <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className={inputClasses} required />
            <input name="phone" onChange={handleChange} placeholder="Phone" className={inputClasses} required />
            <input name="address" onChange={handleChange} placeholder="Address" className={inputClasses} required />
            <div className="grid grid-cols-2 gap-4">
              <input name="city" onChange={handleChange} placeholder="City" className={inputClasses} />
              <input name="state" onChange={handleChange} placeholder="State" className={inputClasses} />
            </div>

            <button
              type="submit"
              disabled={loading || !paystackReady}
              className="w-full bg-[#ff496c] text-white py-3 rounded-lg font-semibold disabled:opacity-50"
            >
              {loading ? "Processing..." : paystackReady ? `Pay ₦${total.toLocaleString()}` : "Loading payment..."}
            </button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between py-2 text-sm">
              <span>{item.name || item.description || "Product"} × {item.quantity}</span>
              <span>{formatPrice(parsePrice(item.price) * item.quantity)}</span>
            </div>
          ))}
          <div className="border-t mt-4 pt-2 font-bold flex justify-between">
            <span>Total</span>
            <span>₦{total.toLocaleString()}</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CheckoutPage;
