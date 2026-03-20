import React, { useState, useEffect } from 'react';
import { MdTrendingUp, MdShoppingCart, MdPeople, MdAttachMoney } from 'react-icons/md';
import { supabase } from '../../supabase';
import { parsePrice, formatPrice } from '../../utils/priceUtils';

function Overview() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalCustomers: 0,
    productsSold: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch orders data
      const { data: orders, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (ordersError) throw ordersError;

      // Fetch customers data
      const { data: customers, error: customersError } = await supabase
        .from('customers')
        .select('customer_email');

      if (customersError) throw customersError;

      // Calculate stats
      const totalRevenue = orders?.reduce((sum, order) => sum + parsePrice(order.total_amount), 0) || 0;
      const totalOrders = orders?.length || 0;
      const totalCustomers = customers?.length || 0;
      
      // Calculate products sold (sum of all item quantities)
      const productsSold = orders?.reduce((sum, order) => {
        try {
          const items = typeof order.items === 'string' ? JSON.parse(order.items) : order.items;
          return sum + (items?.reduce((itemSum, item) => itemSum + (item.quantity || 1), 0) || 0);
        } catch {
          return sum;
        }
      }, 0) || 0;

      setStats({
        totalRevenue,
        totalOrders,
        totalCustomers,
        productsSold
      });

      // Set recent orders (last 5)
      const recentOrdersData = orders?.slice(0, 5).map(order => {
        try {
          const items = typeof order.items === 'string' ? JSON.parse(order.items) : order.items;
          const firstItem = items?.[0];
          return {
            id: `#${order.id}`,
            customer: order.customer_name,
            product: firstItem?.name || firstItem?.description || 'Product',
            amount: formatPrice(order.total_amount),
            status: order.status || 'Processing'
          };
        } catch {
          return {
            id: `#${order.id}`,
            customer: order.customer_name,
            product: 'Product',
            amount: formatPrice(order.total_amount),
            status: order.status || 'Processing'
          };
        }
      }) || [];

      setRecentOrders(recentOrdersData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
    setLoading(false);
  };

  const statsData = [
    { 
      label: 'Total Revenue', 
      value: loading ? '...' : formatPrice(stats.totalRevenue), 
      change: '+12.5%', 
      icon: <MdAttachMoney />, 
      color: 'bg-green-500' 
    },
    { 
      label: 'Total Orders', 
      value: loading ? '...' : stats.totalOrders.toLocaleString(), 
      change: '+8.2%', 
      icon: <MdShoppingCart />, 
      color: 'bg-[#FF496C]' 
    },
    { 
      label: 'Total Customers', 
      value: loading ? '...' : stats.totalCustomers.toLocaleString(), 
      change: '+15.3%', 
      icon: <MdPeople />, 
      color: 'bg-blue-500' 
    },
    { 
      label: 'Products Sold', 
      value: loading ? '...' : stats.productsSold.toLocaleString(), 
      change: '+23.1%', 
      icon: <MdTrendingUp />, 
      color: 'bg-purple-500' 
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{stat.label}</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-2">{stat.value}</h3>
                <p className="text-green-500 text-sm mt-2 flex items-center gap-1">
                  <MdTrendingUp /> {stat.change}
                </p>
              </div>
              <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center text-white text-2xl`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-8 text-center text-gray-500">
              <div className="w-8 h-8 border-4 border-[#FF496C] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              Loading recent orders...
            </div>
          ) : recentOrders.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <div className="text-4xl mb-4">📦</div>
              <p>No orders yet</p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.customer}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      <div className="truncate max-w-xs">{order.product}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Overview;
