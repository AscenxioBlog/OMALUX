import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, CheckCircle } from 'lucide-react';

function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);


  const handleDummySubmit = (e) => {
    e.preventDefault();
    if (agreedToTerms) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Slide-in Success Alert */}
      <div
        className={`fixed top-5 right-4 bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded-md shadow-lg flex items-center gap-2 z-50 transform transition-all duration-500 ease-in-out ${
          showAlert ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
      >
        <CheckCircle size={18} /> Account created successfully!
      </div>

      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow space-y-6">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Create Your Account</h2>
          <p className="mt-1 text-sm text-gray-600">Join us and start shopping smart.</p>
        </div>

        {/* OAuth Buttons */}
        <div className="space-y-2">
          <button className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-md hover:bg-gray-100 text-sm font-medium text-gray-700">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
            Continue with Google
          </button>
          <button className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-md hover:bg-gray-100 text-sm font-medium text-gray-700">
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
                alt="Facebook"
                className="w-5 h-5 object-contain"
            />
            Continue with Facebook
            </button>

        </div>

        {/* Divider */}
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <hr className="flex-grow border-gray-300" />
          or
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Signup Form */}
        <form onSubmit={handleDummySubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              id="fullname"
              name="fullname"
              type="text"
              placeholder="Enter your full name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#B6B09F] focus:border-[#B6B09F] sm:text-sm"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#B6B09F] focus:border-[#B6B09F] sm:text-sm"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Create a password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#B6B09F] focus:border-[#B6B09F] sm:text-sm"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="terms"
              checked={agreedToTerms}
              onChange={() => setAgreedToTerms(!agreedToTerms)}
              className="h-4 w-4 text-[#B6B09F] border-gray-300 rounded"
            />
            <label htmlFor="terms" className="text-sm text-gray-700">
              I agree to the{' '}
              <Link to="/terms" className="text-[#aa996a] hover:underline">
                terms & conditions
              </Link>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#B6B09F] hover:bg-[#aa9d7a] text-white font-semibold rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#c7aa5c]"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-[#aa996a] hover:text-[#c7aa5c] font-medium">
             Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignupForm;
