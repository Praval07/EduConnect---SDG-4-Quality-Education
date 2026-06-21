import { motion } from 'framer-motion';

/**
 * Reusable shimmer loading skeleton component.
 * Usage: <LoadingSkeleton rows={3} height="h-16" />
 */
const LoadingSkeleton = ({ rows = 4, height = 'h-20', className = '' }) => (
  <div className={`space-y-3 ${className}`}>
    {Array(rows).fill(0).map((_, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: i * 0.05 }}
        className={`shimmer ${height} rounded-2xl`}
      />
    ))}
  </div>
);

export default LoadingSkeleton;
