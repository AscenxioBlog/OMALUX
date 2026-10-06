import { useAuth } from '../ui/SignUpForm/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#FF496C] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // If user is not logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If admin access is required, check if user is admin
  if (requireAdmin) {
    // You can implement admin check logic here
    // For now, let's assume admin emails are stored in an array or check user metadata
    const adminEmails = ['myona1648@gmail.com', 'admin@omashop.com']; // Add your admin emails
    
    if (!adminEmails.includes(user.email)) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="text-6xl mb-4">🚫</div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h1>
            <p className="text-gray-600 mb-4">You don't have permission to access this page.</p>
            <button 
              onClick={() => window.history.back()}
              className="bg-[#FF496C] text-white px-4 py-2 rounded-lg hover:bg-[#e63d5e] transition"
            >
              Go Back
            </button>
          </div>
        </div>
      );
    }
  }

  return children;
};

export default ProtectedRoute;