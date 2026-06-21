/**
 * Utility helper functions for Rapid Revision Hub
 */

/**
 * Format a number with K/M suffix
 * formatNumber(1500) → "1.5K"
 */
export const formatNumber = (num) => {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return String(num);
};

/**
 * Truncate text to a given length with ellipsis
 * truncate("Hello World", 5) → "Hello..."
 */
export const truncate = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
};

/**
 * Get initials from a full name
 * getInitials("Praval Kumar") → "PK"
 */
export const getInitials = (name = '') =>
  name
    .split(' ')
    .map((n) => n.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('');

/**
 * Convert seconds to HH:MM:SS or MM:SS
 * formatDuration(3661) → "1:01:01"
 */
export const formatDuration = (seconds) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${m}:${String(s).padStart(2, '0')}`;
};

/**
 * Greet user based on local time
 * getGreeting() → "Good morning" | "Good afternoon" | "Good evening"
 */
export const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};

/**
 * Debounce a function call
 */
export const debounce = (fn, delay = 400) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
};

/**
 * Category color map for resource/video chips
 */
export const CATEGORY_COLORS = {
  Programming:       'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  'Web Development': 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
  React:             'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400',
  'Node.js':         'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  MongoDB:           'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  Python:            'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  DSA:               'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  DBMS:              'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
  OS:                'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  CN:                'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  Default:           'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400',
};

export const getCategoryColor = (category) =>
  CATEGORY_COLORS[category] || CATEGORY_COLORS.Default;
