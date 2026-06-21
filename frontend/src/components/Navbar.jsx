import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import {
  FiHome, FiGrid, FiBook, FiVideo, FiMessageSquare,
  FiMail, FiLogOut, FiMenu, FiX, FiSun, FiMoon,
  FiInfo, FiPhone
} from 'react-icons/fi';

const navLinks = [
  { to: '/', label: 'Home', icon: FiHome },
  { to: '/dashboard', label: 'Dashboard', icon: FiGrid, protected: true },
  { to: '/study-materials', label: 'Materials', icon: FiBook },
  { to: '/videos', label: 'Videos', icon: FiVideo },
  { to: '/ai-assistant', label: 'AI Assistant', icon: FiMessageSquare },
  { to: '/about', label: 'About', icon: FiInfo },
  { to: '/contact', label: 'Contact', icon: FiMail },
];

const Navbar = () => {
  const { user, isGuest, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => { logout(); navigate('/'); setMobileOpen(false); };

  const visibleLinks = navLinks.filter(link => !link.protected || user);
  const displayName = user?.name?.split(' ')[0] || (isGuest ? 'Guest' : null);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass-white dark:glass-dark shadow-lg shadow-black/5' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <motion.div
                whileHover={{ rotate: 5, scale: 1.05 }}
                className="w-9 h-9 rounded-xl overflow-hidden flex items-center justify-center shadow-md border border-gray-100 dark:border-gray-800"
              >
                <img src="/logo.png" alt="Rapid Revision Hub Logo" className="w-full h-full object-cover" />
              </motion.div>
              <div className="hidden sm:block">
                <span className="text-base font-bold font-poppins gradient-text">Rapid Revision</span>
                <span className="text-base font-bold font-poppins text-gray-900 dark:text-white"> Hub</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-0.5">
              {visibleLinks.map(link => {
                const Icon = link.icon;
                const isActive = location.pathname === link.to ||
                  (link.to === '/study-materials' && location.pathname === '/materials');
                return (
                  <Link key={link.to} to={link.to}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-white/10 hover:text-blue-600 dark:hover:text-blue-400'
                    }`}
                  >
                    <Icon size={14} />{link.label}
                  </Link>
                );
              })}
            </div>

            {/* Right Actions */}
            <div className="hidden lg:flex items-center gap-2">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 transition-all"
                id="theme-toggle-btn" aria-label="Toggle theme"
              >
                {isDark ? <FiSun size={18} className="text-amber-400" /> : <FiMoon size={18} />}
              </motion.button>

              {user ? (
                <div className="flex items-center gap-2">
                  <Link to="/profile">
                    <motion.div whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 cursor-pointer"
                    >
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-yellow-400 flex items-center justify-center text-white text-xs font-bold">
                        {user.name?.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-sm font-medium text-blue-700 dark:text-blue-300 max-w-24 truncate">
                        {displayName}
                      </span>
                    </motion.div>
                  </Link>
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    onClick={handleLogout} id="logout-btn"
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                  >
                    <FiLogOut size={15} />Logout
                  </motion.button>
                </div>
              ) : isGuest ? (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-lg">Guest</span>
                  <Link to="/register" id="guest-register-btn">
                    <motion.span whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                      className="inline-block px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-xl shadow-md shadow-blue-500/30 hover:bg-blue-700 transition-all"
                    >Create Account</motion.span>
                  </Link>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link to="/login" className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    Login
                  </Link>
                  <Link to="/register" id="get-started-btn">
                    <motion.span whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                      className="inline-block px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-xl shadow-md shadow-blue-500/30 hover:bg-blue-700 transition-all"
                    >Get Started</motion.span>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center gap-2">
              <motion.button whileTap={{ scale: 0.9 }} onClick={toggleTheme}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-300"
                aria-label="Toggle theme"
              >
                {isDark ? <FiSun size={18} className="text-amber-400" /> : <FiMoon size={18} />}
              </motion.button>
              <motion.button whileTap={{ scale: 0.9 }} onClick={() => setMobileOpen(!mobileOpen)}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-white/10"
                aria-label="Toggle menu" id="mobile-menu-btn"
              >
                {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-white dark:bg-gray-900 shadow-2xl lg:hidden flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center border border-gray-100 dark:border-gray-800">
                    <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" />
                  </div>
                  <span className="font-bold font-poppins text-sm gradient-text">Rapid Revision Hub</span>
                </div>
                <button onClick={() => setMobileOpen(false)} className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800">
                  <FiX size={20} />
                </button>
              </div>

              {/* User Info */}
              {user && (
                <div className="p-4 border-b border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-yellow-400 flex items-center justify-center text-white font-bold">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">{user.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                    </div>
                  </div>
                </div>
              )}
              {isGuest && (
                <div className="p-4 border-b border-gray-100 dark:border-gray-800">
                  <span className="text-xs bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 px-2 py-1 rounded-lg">Browsing as Guest</span>
                </div>
              )}

              {/* Nav Links */}
              <div className="flex-1 overflow-y-auto p-4 space-y-1">
                {visibleLinks.map((link, i) => {
                  const Icon = link.icon;
                  const isActive = location.pathname === link.to;
                  return (
                    <motion.div key={link.to} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                      <Link to={link.to}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                          isActive
                            ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                            : 'text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-white/5 hover:text-blue-600 dark:hover:text-blue-400'
                        }`}
                      >
                        <Icon size={18} />{link.label}
                      </Link>
                    </motion.div>
                  );
                })}
                {/* Contact info in mobile */}
                <div className="pt-4 border-t border-gray-100 dark:border-gray-800 space-y-2">
                  <a href="tel:7533828012" className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 hover:text-blue-600 transition-colors">
                    <FiPhone size={12} /> 7533828012
                  </a>
                  <a href="mailto:rapidrevisionhub@gmail.com" className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 hover:text-blue-600 transition-colors">
                    <FiMail size={12} /> rapidrevisionhub@gmail.com
                  </a>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-gray-100 dark:border-gray-800">
                {user ? (
                  <button onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                  >
                    <FiLogOut size={16} />Logout
                  </button>
                ) : (
                  <div className="space-y-2">
                    <Link to="/login" onClick={() => setMobileOpen(false)} className="block text-center py-3 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
                      Login
                    </Link>
                    <Link to="/register" onClick={() => setMobileOpen(false)} className="block text-center py-3 rounded-xl text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-md shadow-blue-500/30">
                      Create Free Account
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-16" />
    </>
  );
};

export default Navbar;
