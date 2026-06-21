import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] dark:bg-[#0F172A] px-4">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <div className="text-9xl font-black font-poppins gradient-text mb-4 leading-none">404</div>
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-yellow-400 flex items-center justify-center mx-auto mb-6 shadow-xl">
          <span className="text-white text-xl font-bold">RR</span>
        </div>
        <h1 className="text-2xl font-bold font-poppins text-gray-900 dark:text-white mb-3">
          Page Not Found
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm leading-relaxed">
          Oops! The page you're looking for doesn't exist or was moved. Let's get you back on track.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all text-sm"
          >
            ← Go Back
          </motion.button>
          <Link to="/" id="notfound-home-btn">
            <motion.span whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-2xl shadow-xl shadow-blue-500/30 hover:bg-blue-700 transition-all text-sm"
            >
              Go to Home 🏠
            </motion.span>
          </Link>
        </div>
        <p className="text-xs text-gray-400 mt-8">Rapid Revision Hub — SDG 4</p>
      </motion.div>
    </div>
  );
};

export default NotFound;
