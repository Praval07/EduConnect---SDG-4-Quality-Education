import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import {
  FiMail, FiLock, FiArrowRight, FiEye, FiEyeOff,
  FiZap, FiBook, FiVideo, FiMessageSquare
} from 'react-icons/fi';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, loginAsGuest } = useAuth();
  const navigate = useNavigate();

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password) { setError('Please enter your email and password.'); return; }
    setLoading(true);
    try {
      await login(form.email.trim(), form.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    loginAsGuest();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel — Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 relative overflow-hidden flex-col justify-center items-center px-12 py-16">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-yellow-300/10 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 text-white text-center max-w-md">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center mx-auto mb-6 shadow-2xl border border-white/20">
              <span className="text-white text-2xl font-bold font-poppins">RR</span>
            </div>
            <h1 className="text-4xl font-bold font-poppins mb-3 leading-tight">
              Welcome to<br /><span className="text-yellow-300">Rapid Revision Hub</span>
            </h1>
            <p className="text-blue-200 text-lg mb-10">Learn Smarter. Revise Faster.</p>
          </motion.div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: FiBook, title: 'Study Materials', desc: 'Curated resources' },
              { icon: FiVideo, title: 'Video Library', desc: 'Best tutorials' },
              { icon: FiMessageSquare, title: 'AI Assistant', desc: 'ChatGPT-style' },
              { icon: FiZap, title: 'Quick Revision', desc: 'Learn smarter' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.title} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 + i * 0.1 }}
                  className="bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/10 text-left"
                >
                  <Icon size={20} className="text-yellow-300 mb-2" />
                  <p className="font-semibold text-sm">{item.title}</p>
                  <p className="text-blue-200 text-xs mt-0.5">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-8 py-12 bg-[#F8FAFC] dark:bg-[#0F172A]">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-yellow-400 flex items-center justify-center">
              <span className="text-white text-sm font-bold">RR</span>
            </div>
            <span className="font-bold font-poppins gradient-text">Rapid Revision Hub</span>
          </div>

          <h2 className="text-3xl font-bold font-poppins text-gray-900 dark:text-white mb-2">Welcome back 👋</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">Sign in to continue your learning journey</p>

          {error && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl flex items-center gap-2 text-red-600 dark:text-red-400 text-sm"
            >
              <span>⚠️</span> {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
              <div className="relative">
                <FiMail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="email" name="email" id="login-email" value={form.email} onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                  autoComplete="email"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
              <div className="relative">
                <FiLock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type={showPass ? 'text' : 'password'} name="password" id="login-password" value={form.password} onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full pl-11 pr-12 py-3.5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                  autoComplete="current-password"
                />
                <button type="button" onClick={() => setShowPass(p => !p)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showPass ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>

            <motion.button type="submit" id="login-submit-btn" disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.01, y: loading ? 0 : -1 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold rounded-2xl shadow-xl shadow-blue-500/30 transition-all text-sm flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing In...
                </div>
              ) : (
                <><span>Sign In</span><FiArrowRight size={16} /></>
              )}
            </motion.button>
          </form>

          <div className="mt-6 space-y-3">
            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
              <span className="text-xs text-gray-400">or</span>
              <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
            </div>

            {/* Skip / Guest Button */}
            <motion.button id="skip-guest-btn" onClick={handleSkip}
              whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
              className="w-full py-3.5 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 text-sm font-medium hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all flex items-center justify-center gap-2"
            >
              <FiZap size={16} className="text-yellow-500" />
              Skip for Now — Browse as Guest
            </motion.button>
          </div>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
              Create one free →
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
