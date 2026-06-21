import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiHome } from 'react-icons/fi';

const NotFound = () => (
  <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center"
    >
      <motion.div
        animate={{ rotate: [0, -5, 5, -5, 0] }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-8xl mb-6"
      >
        🎓
      </motion.div>
      <h1 className="text-6xl font-bold font-poppins gradient-text mb-4">404</h1>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Page Not Found</h2>
      <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-8">
        Looks like this lesson doesn't exist! Let's head back to class.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <Link to="/">
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 text-white font-semibold rounded-2xl shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-all"
          >
            <FiHome size={16} /> Go Home
          </motion.span>
        </Link>
        <button onClick={() => window.history.back()}>
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 px-5 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 transition-all"
          >
            <FiArrowLeft size={16} /> Go Back
          </motion.span>
        </button>
      </div>
    </motion.div>
  </div>
);

export default NotFound;
