import React, { useState, useEffect } from 'react';
import { MdTrendingUp, MdTrendingDown } from 'react-icons/md';
import { supabase } from '../../supabase';
import { parsePrice, formatPrice } from '../../utils/priceUtils';

function Analytics() {
  const [analytics, setAnalytics] = useState({
    conversionRate: 0,
    avgOrderValue: 0,
    returnRate: 0,
    salesData: [],
    topProducts: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    setLoading(true);
    try {
      // Fetch orders data
      const { data: orders, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (ordersError) throw ordersError;

      // Fetch customers data for conversion rate
      const { data: customers, error: customersError } = await supabase
        .from('customers')
        .select('customer_email');

      if (customersError) throw customersError;

      // Calculate metrics
      const totalOrders = orders?.length || 0;
      const totalCustomers = customers?.length || 0;
      const conversionRate = totalCustomers > 0 ? ((totalOrders / totalCustomers) * 100) : 0;
      
      const totalRevenue = orders?.reduce((sum, order) => sum + parsePrice(order.total_amount), 0) || 0;
      const avgOrderValue = totalOrders > 0 ? (totalRevenue / totalOrders) : 0;
      
      // Return rate (assuming cancelled orders are returns)
      const cancelledOrders = orders?.filter(order => order.status === 'Cancelled').length || 0;
      const returnRate = totalOrders > 0 ? ((cancelledOrders / totalOrders) * 100) : 0;

      // Generate sales data for last 6 months
      const salesData = generateSalesData(orders || []);

      // Calculate top products
      const topProducts = calculateTopProducts(orders || []);

      setAnalytics({
        conversionRate: Math.round(conversionRate * 100) / 100,
        avgOrderValue,
        returnRate: Math.round(returnRate * 100) / 100,
        salesData,
        topProducts
      });
    } catch (error) {
      console.error('Error fetching analytics data:', error);
    }
    setLoading(false);
  };

  const generateSalesData = (orders) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const currentMonth = new Date().getMonth();
    
    return months.map((month, index) => {
      // Calculate which month this represents (going backwards from current month)
      const monthIndex = (currentMonth - (5 - index) + 12) % 12;
      const year = new Date().getFullYear();
      const startDate = new Date(year, monthIndex, 1);
      const endDate = new Date(year, monthIndex + 1, 0);
      
      const monthOrders = orders.filter(order => {
        const orderDate = new Date(order.created_at);
        return orderDate >= startDate && orderDate <= endDate;
      });
      
      const sales = monthOrders.reduce((sum, order) => sum + parsePrice(order.total_amount), 0);
      
      return { month, sales: Math.round(sales) };
    });
  };

  const calculateTopProducts = (orders) => {
    const productStats = {};
    
    orders.forEach(order => {
      try {
        const items = typeof order.items === 'string' ? JSON.parse(order.items) : order.items;
        items?.forEach(item => {
          const productName = item.name || item.description || 'Unknown Product';
          const quantity = item.quantity || 1;
          const price = parsePrice(item.price);
          const revenue = price * quantity;
          
          if (!productStats[productName]) {
            productStats[productName] = { sales: 0, revenue: 0 };
          }
          
          productStats[productName].sales += quantity;
          productStats[productName].revenue += revenue;
        });
      } catch (error) {
        console.error('Error parsing order items:', error);
      }
    });
    
    // Convert to array and sort by sales
    return Object.entries(productStats)
      .map(([name, stats]) => ({
        name: name.length > 30 ? name.substring(0, 30) + '...' : name,
        sales: stats.sales,
        revenue: formatPrice(stats.revenue)
      }))
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 4); // Top 4 products
  };

  const maxSales = Math.max(...analytics.salesData.map(d => d.sales), 1);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-4 border-[#FF496C] border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-3 text-gray-600">Loading analytics...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-medium">Conversion Rate</h3>
          <div className="flex items-end justify-between mt-4">
            <div>
              <p className="text-3xl font-bold text-gray-800">{analytics.conversionRate}%</p>
              <p className="text-green-500 text-sm mt-2 flex items-center gap-1">
                <MdTrendingUp /> +0.5%
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-medium">Avg Order Value</h3>
          <div className="flex items-end justify-between mt-4">
            <div>
              <p className="text-3xl font-bold text-gray-800">{formatPrice(analytics.avgOrderValue)}</p>
              <p className="text-green-500 text-sm mt-2 flex items-center gap-1">
                <MdTrendingUp /> +12%
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-medium">Return Rate</h3>
          <div className="flex items-end justify-between mt-4">
            <div>
              <p className="text-3xl font-bold text-gray-800">{analytics.returnRate}%</p>
              <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                <MdTrendingDown /> -0.3%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sales Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">Sales Overview</h2>
        {analytics.salesData.length > 0 ? (
          <div className="flex items-end justify-between h-64 gap-4">
            {analytics.salesData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-gray-100 rounded-t-lg relative" style={{ height: '100%' }}>
                  <div
                    className="absolute bottom-0 w-full bg-[#FF496C] rounded-t-lg transition-all duration-500 flex items-end justify-center pb-2"
                    style={{ height: `${Math.max((data.sales / maxSales) * 100, 5)}%` }}
                  >
                    {data.sales > 0 && (
                      <span className="text-xs text-white font-medium">
                        {formatPrice(data.sales)}
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-sm text-gray-600">{data.month}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <div className="text-4xl mb-4">📊</div>
            <p>No sales data available yet</p>
          </div>
        )}
      </div>

      {/* Top Products */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Top Selling Products</h2>
        </div>
        <div className="p-6">
          {analytics.topProducts.length > 0 ? (
            <div className="space-y-4">
              {analytics.topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl font-bold text-gray-300">#{index + 1}</span>
                    <div>
                      <p className="font-medium text-gray-800">{product.name}</p>
                      <p className="text-sm text-gray-500">{product.sales} sales</p>
                    </div>
                  </div>
                  <p className="font-semibold text-gray-800">{product.revenue}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <div className="text-4xl mb-4">📦</div>
              <p>No product sales data available yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Analytics;
