import React, { useEffect, useState } from 'react';
import { useAuth } from '../SignUpForm/AuthContext';
import { supabase } from '../../supabase';
import { useNavigate } from 'react-router-dom';
import { MdPerson, MdEmail, MdPhone, MdEdit, MdSave, MdClose } from 'react-icons/md';
import toast from 'react-hot-toast';

function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [orderStats, setOrderStats] = useState({ totalOrders: 0, totalSpent: 0 });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ customer_name: '', customer_phone: '' });

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    fetchProfile();
  }, [user]);

  const fetchProfile = async () => {
    // Fetch customer profile
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .eq('customer_email', user.email)
      .single();

    if (!error && data) {
      setProfile(data);
      setFormData({ customer_name: data.customer_name || '', customer_phone: data.customer_phone || '' });
    }

    // Fetch order statistics
    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select('total_amount')
      .eq('customer_email', user.email);

    if (!ordersError && orders) {
      const totalOrders = orders.length;
      const totalSpent = orders.reduce((sum, order) => sum + (parseFloat(order.total_amount) || 0), 0);
      setOrderStats({ totalOrders, totalSpent });
    }

    setLoading(false);
  };

  const handleUpdate = async () => {
    const { error } = await supabase
      .from('customers')
      .update({ customer_name: formData.customer_name, customer_phone: formData.customer_phone })
      .eq('customer_email', user.email);

    if (error) {
      toast.error('Failed to update profile');
    } else {
      toast.success('Profile updated!');
      setProfile({ ...profile, ...formData });
      setEditing(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-[#FF496C] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow p-8">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-20 h-20 bg-[#FF496C] rounded-full flex items-center justify-center text-white text-3xl font-bold">
              {profile?.customer_name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{profile?.customer_name || 'User'}</h1>
              <p className="text-gray-500 text-sm">
                Member since {profile?.joined ? new Date(profile.joined).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : 'N/A'}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-[#FF496C]">{orderStats.totalOrders}</p>
              <p className="text-sm text-gray-500 mt-1">Total Orders</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-[#FF496C]">₦{orderStats.totalSpent.toLocaleString()}</p>
              <p className="text-sm text-gray-500 mt-1">Total Spent</p>
            </div>
          </div>

          {/* Info / Edit */}
          {editing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={formData.customer_name}
                  onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF496C]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={formData.customer_phone}
                  onChange={(e) => setFormData({ ...formData, customer_phone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF496C]"
                />
              </div>
              <div className="flex gap-3">
                <button onClick={handleUpdate} className="flex items-center gap-2 bg-[#FF496C] text-white px-5 py-2 rounded-lg hover:bg-[#e63d5e] transition">
                  <MdSave /> Save
                </button>
                <button onClick={() => setEditing(false)} className="flex items-center gap-2 bg-gray-200 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-300 transition">
                  <MdClose /> Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-700">
                <MdPerson className="text-[#FF496C] text-xl" />
                <span>{profile?.customer_name || 'Not set'}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <MdEmail className="text-[#FF496C] text-xl" />
                <span>{user?.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <MdPhone className="text-[#FF496C] text-xl" />
                <span>{profile?.customer_phone || 'Not set'}</span>
              </div>
              <button onClick={() => setEditing(true)} className="flex items-center gap-2 bg-[#FF496C] text-white px-5 py-2 rounded-lg hover:bg-[#e63d5e] transition mt-2">
                <MdEdit /> Edit Profile
              </button>
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-2xl shadow p-6 space-y-3">
          <button onClick={() => navigate('/orders')} className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-700 border border-gray-200 transition">
            📦 My Orders
          </button>
          <button onClick={() => navigate('/wishlist')} className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-700 border border-gray-200 transition">
            ❤️ My Wishlist
          </button>
          <button onClick={handleLogout} className="w-full text-left px-4 py-3 rounded-lg hover:bg-red-50 text-red-600 border border-red-200 transition">
            🚪 Logout
          </button>
        </div>

      </div>
    </div>
  );
}

export default Profile;
