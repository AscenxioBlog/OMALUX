import React, { useEffect } from 'react';
import Header from './PrimaryComponent/Header';
import { Route, Routes, useLocation } from 'react-router-dom';
import Index from './ui/Index/Index';
import Footer from './PrimaryComponent/Footer';
import Shop from './ui/Shop/Shop';
import About from './ui/About/About';
import Contact from './ui/Contact/Contact';
import { CartProvider } from './ui/Checkout/CartContext';
import { AuthProvider } from './ui/SignUpForm/AuthContext';
import CartPage from './ui/Checkout/CartPage';
import CheckoutPage from './ui/Checkout/CheckoutPage';
import { Toaster } from "react-hot-toast";
import SignupForm from './ui/SignUpForm/SignupForm';
import LoginForm from './ui/SignUpForm/LoginForm';
import ProductDetail from './ui/ProductDetail.jsx/ProductDetail.jsx';
import PreOrder from './ui/PreOrder/PreOrder';
import PreOrderProductsPage from './ui/PreOrder/PreOrderProductsPage';
import SeoManager from './PrimaryComponent/SeoManager';
import AdminDashboard from './ui/Admin/AdminDashboard';
import Profile from './ui/Profile/Profile';
import OrdersPage from './ui/Orders/OrdersPage';
import Wishlist from './ui/Wishlist/Wishlist';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}


function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <AuthProvider>
    <CartProvider>
      <div>
        <ScrollToTop />
        <SeoManager />
        {!isAdminRoute && <Header />}
        
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/pre-order" element={<PreOrder />} />
          <Route path="/pre-order/products" element={<PreOrderProductsPage />} />

          <Route path="/cart" element={<CartPage />} />
          <Route path='checkout' element={<CheckoutPage />}/>
          <Route path="/product/:source/:id" element={<ProductDetail />} />
          <Route path="/register" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/wishlist" element={<Wishlist />} />
        
        </Routes>


            <Toaster
              position="bottom-right"
              gutter={12}
              containerStyle={{ margin: '1rem' }}
              toastOptions={{
                className: '',
                style: {
                  border: 'none',
                  padding: '16px',
                  color: '#fff',
                  background: '#ff496c',
                  borderRadius: '12px',
                  width: 'fit-content',
                },
                duration: 3000,
                success: {
                  iconTheme: {
                    primary: '#fff',
                    secondary: '#0f1419',
                  },
                },
              }}
            />
        {!isAdminRoute && <Footer />}
      </div>
    </CartProvider>
    </AuthProvider>
  );
}

export default App;
