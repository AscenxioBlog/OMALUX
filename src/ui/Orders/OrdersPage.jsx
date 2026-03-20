import React, { useEffect, useState } from 'react';
import { useAuth } from '../SignUpForm/AuthContext';
import { supabase } from '../../supabase';
import { useNavigate } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';
import { parsePrice, formatPrice } from '../../utils/priceUtils';

function OrdersPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('customer_email', user.email)
      .order('created_at', { ascending: false });

    if (!error) setOrders(data || []);
    setLoading(false);
  };

  const statusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Processing': return 'bg-blue-100 text-blue-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-[#FF496C] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/profile')} className="text-gray-500 hover:text-[#FF496C] transition">
            <MdArrowBack className="text-2xl" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-12 text-center">
            <p className="text-5xl mb-4">📦</p>
            <p className="text-gray-500 text-lg">You haven't placed any orders yet.</p>
            <button onClick={() => navigate('/shop')} className="mt-6 bg-[#FF496C] text-white px-6 py-2 rounded-lg hover:bg-[#e63d5e] transition">
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const items = (() => { try { return JSON.parse(order.items); } catch { return []; } })();
              return (
                <div key={order.id} className="bg-white rounded-2xl shadow p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="font-semibold text-gray-900">Order #{order.id}</p>
                      <p className="text-sm text-gray-500">{new Date(order.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor(order.status)}`}>
                      {order.status || 'Pending'}
                    </span>
                  </div>

                  {/* Items */}
                  <div className="space-y-3 border-t border-gray-100 pt-4">
                    {items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-4">
                        {item.image && <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-lg" />}
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-800">{item.name || item.description?.slice(0, 40)}</p>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <p className="text-sm font-semibold text-gray-800">{formatPrice(parsePrice(item.price) * item.quantity)}</p>
                      </div>
                    ))}
                  </div>

                  {/* Total */}
                  <div className="border-t border-gray-100 mt-4 pt-4 flex justify-between items-center">
                    <p className="text-sm text-gray-500">{items.length} item{items.length !== 1 ? 's' : ''}</p>
                    <p className="font-bold text-gray-900">Total: <span className="text-[#FF496C]">₦{Number(order.total_amount).toLocaleString()}</span></p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}

export default OrdersPage;
