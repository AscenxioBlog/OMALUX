import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MdLogin, MdPersonAdd } from 'react-icons/md';

const LoginPrompt = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = () => {
    navigate('/login', { state: { from: location } });
  };

  const handleSignup = () => {
    navigate('/register', { state: { from: location } });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="text-6xl mb-6">🔒</div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Login Required
        </h1>
        
        <p className="text-gray-600 mb-8">
          You need to be logged in to proceed with checkout. Please login or create an account to continue.
        </p>
        
        <div className="space-y-4">
          <button
            onClick={handleLogin}
            className="w-full flex items-center justify-center gap-3 bg-[#FF496C] text-white py-3 px-6 rounded-lg hover:bg-[#e63d5e] transition font-medium"
          >
            <MdLogin className="text-xl" />
            Login to Continue
          </button>
          
          <button
            onClick={handleSignup}
            className="w-full flex items-center justify-center gap-3 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-300 transition font-medium"
          >
            <MdPersonAdd className="text-xl" />
            Create New Account
          </button>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={() => navigate('/cart')}
            className="text-[#FF496C] hover:underline text-sm"
          >
            ← Back to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPrompt;