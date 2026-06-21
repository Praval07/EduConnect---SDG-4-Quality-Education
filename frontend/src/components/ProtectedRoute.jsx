import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

/**
 * ProtectedRoute
 * - allowGuest={true}  → accessible to guests AND logged-in users
 * - allowGuest={false} → requires logged-in user (default)
 */
const ProtectedRoute = ({ children, allowGuest = false }) => {
  const { user, loading, isGuest } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] dark:bg-[#0F172A]">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-yellow-400 flex items-center justify-center shadow-xl">
            <span className="text-white text-xl font-bold font-poppins">RR</span>
          </div>
          <div className="flex gap-2">
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-blue-600 rounded-full"
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
              />
            ))}
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Loading Rapid Revision Hub...</p>
        </motion.div>
      </div>
    );
  }

  // Allow guests on allowGuest routes (Study Materials, Videos, AI Assistant)
  if (allowGuest && (user || isGuest)) return children;

  // Strictly protected routes require real login
  if (!allowGuest && !user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
