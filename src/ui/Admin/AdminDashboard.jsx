import React, { useState } from 'react';
import { MdDashboard, MdShoppingCart, MdPeople, MdInventory, MdSettings, MdLogout, MdMenu, MdClose } from 'react-icons/md';
import { FaBox, FaChartLine } from 'react-icons/fa';
import Overview from './Overview';
import Products from './Products';
import Orders from './Orders';
import Customers from './Customers';
import Analytics from './Analytics';
import Settings from './Settings';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: <MdDashboard /> },
    { id: 'products', label: 'Products', icon: <MdInventory /> },
    { id: 'orders', label: 'Orders', icon: <MdShoppingCart /> },
    { id: 'customers', label: 'Customers', icon: <MdPeople /> },
    { id: 'analytics', label: 'Analytics', icon: <FaChartLine /> },
    { id: 'settings', label: 'Settings', icon: <MdSettings /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <Overview />;
      case 'products': return <Products />;
      case 'orders': return <Orders />;
      case 'customers': return <Customers />;
      case 'analytics': return <Analytics />;
      case 'settings': return <Settings />;
      default: return <Overview />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <img src="/oma.png" alt="OMA Logo" className="h-8 object-contain" />
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-2xl text-gray-600 hover:text-[#FF496C]">
            <MdClose />
          </button>
        </div>

        <nav className="px-4 py-6 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                activeTab === item.id
                  ? 'bg-[#FF496C] text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full px-4 py-4 border-t border-gray-200">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition">
            <MdLogout className="text-xl" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black/35 z-40 lg:hidden" />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-2xl text-gray-700 hover:text-[#FF496C]">
            <MdMenu />
          </button>
          <h1 className="text-2xl font-semibold text-gray-800 capitalize">{activeTab}</h1>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#FF496C] rounded-full flex items-center justify-center text-white font-semibold">
              A
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
