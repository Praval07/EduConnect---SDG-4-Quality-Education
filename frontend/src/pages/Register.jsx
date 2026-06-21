import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import {
  FiUser, FiMail, FiLock, FiPhone, FiBook, FiArrowRight,
  FiEye, FiEyeOff, FiCheckCircle
} from 'react-icons/fi';

const COURSES = ['B.Tech', 'M.Tech', 'MCA', 'BCA', 'B.Sc (CS)', 'B.Sc (IT)', 'MBA', 'BBA', 'Diploma', 'Other'];
const SEMESTERS = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'];

const Register = () => {
  const [form, setForm] = useState({
    name: '', email: '', mobile: '', college: '', course: '', branch: '', semester: '',
    password: '', confirmPassword: '',
  });
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const validate = () => {
    if (!form.name.trim()) return 'Full name is required';
    if (!form.email.trim()) return 'Email is required';
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(form.email)) return 'Please enter a valid email';
    if (form.mobile && !/^[6-9]\d{9}$/.test(form.mobile)) return 'Enter a valid 10-digit mobile number';
    if (!form.password) return 'Password is required';
    if (form.password.length < 6) return 'Password must be at least 6 characters';
    if (form.password !== form.confirmPassword) return 'Passwords do not match';
    return null;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    const validationError = validate();
    if (validationError) { setError(validationError); return; }
    setLoading(true);
    try {
      const { confirmPassword, ...data } = form;
      await register(data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const strength = !form.password ? 0
    : form.password.length >= 8 && /[A-Z]/.test(form.password) && /[0-9]/.test(form.password) ? 3
    : form.password.length >= 6 ? 2 : 1;

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-5/12 bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 flex-col justify-center items-center px-10 py-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-yellow-300/10 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 text-white text-center max-w-sm">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center mx-auto mb-6 border border-white/20">
              <span className="text-white text-2xl font-bold font-poppins">RR</span>
            </div>
            <h1 className="text-3xl font-bold font-poppins mb-3">Join <span className="text-yellow-300">Rapid Revision Hub</span></h1>
            <p className="text-blue-200 mb-10">Free forever. No credit card needed.</p>
          </motion.div>
          <div className="space-y-3 text-left">
            {[
              'Access 20+ CS subjects',
              'AI-powered study assistant',
              'Handpicked YouTube videos',
              'Progress tracking dashboard',
              'Download study materials',
              'SDG 4 aligned platform',
            ].map((item, i) => (
              <motion.div key={item} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.08 }}
                className="flex items-center gap-3"
              >
                <FiCheckCircle size={16} className="text-yellow-300 flex-shrink-0" />
                <span className="text-blue-100 text-sm">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="w-full lg:w-7/12 flex items-center justify-center px-4 sm:px-8 py-10 bg-[#F8FAFC] dark:bg-[#0F172A] overflow-y-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="w-full max-w-xl"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-yellow-400 flex items-center justify-center">
              <span className="text-white text-sm font-bold">RR</span>
            </div>
            <span className="font-bold font-poppins gradient-text">Rapid Revision Hub</span>
          </div>

          <h2 className="text-3xl font-bold font-poppins text-gray-900 dark:text-white mb-1">Create your account</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">Start your learning journey today — free forever</p>

          {error && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              className="mb-5 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl text-red-600 dark:text-red-400 text-sm flex items-center gap-2"
            >
              <span>⚠️</span> {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Row 1: Name + Email */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wide">Full Name *</label>
                <div className="relative">
                  <FiUser size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="text" name="name" id="reg-name" value={form.name} onChange={handleChange}
                    placeholder="Praval Saxena"
                    className="w-full pl-10 pr-3 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    autoComplete="name"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wide">Email *</label>
                <div className="relative">
                  <FiMail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="email" name="email" id="reg-email" value={form.email} onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-3 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    autoComplete="email"
                  />
                </div>
              </div>
            </div>

            {/* Row 2: Mobile + College */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wide">Mobile Number</label>
                <div className="relative">
                  <FiPhone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="tel" name="mobile" id="reg-mobile" value={form.mobile} onChange={handleChange}
                    placeholder="10-digit number"
                    className="w-full pl-10 pr-3 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wide">College / University</label>
                <div className="relative">
                  <FiBook size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="text" name="college" id="reg-college" value={form.college} onChange={handleChange}
                    placeholder="AKTU, DU, VIT..."
                    className="w-full pl-10 pr-3 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Row 3: Course + Branch + Semester */}
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wide">Course</label>
                <select name="course" id="reg-course" value={form.course} onChange={handleChange}
                  className="w-full px-3 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                >
                  <option value="">Select</option>
                  {COURSES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wide">Branch</label>
                <input type="text" name="branch" id="reg-branch" value={form.branch} onChange={handleChange}
                  placeholder="CSE, IT, ECE..."
                  className="w-full px-3 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wide">Semester</label>
                <select name="semester" id="reg-semester" value={form.semester} onChange={handleChange}
                  className="w-full px-3 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                >
                  <option value="">Select</option>
                  {SEMESTERS.map(s => <option key={s} value={s}>{s} Sem</option>)}
                </select>
              </div>
            </div>

            {/* Row 4: Passwords */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wide">Password *</label>
                <div className="relative">
                  <FiLock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type={showPass ? 'text' : 'password'} name="password" id="reg-password" value={form.password} onChange={handleChange}
                    placeholder="Min. 6 characters"
                    className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    autoComplete="new-password"
                  />
                  <button type="button" onClick={() => setShowPass(p => !p)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    {showPass ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                  </button>
                </div>
                {form.password && (
                  <div className="mt-1.5 flex gap-1">
                    {[1, 2, 3].map(i => (
                      <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= strength ? strength === 1 ? 'bg-red-400' : strength === 2 ? 'bg-yellow-400' : 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'}`} />
                    ))}
                    <span className="text-xs text-gray-400 ml-1">{strength === 1 ? 'Weak' : strength === 2 ? 'Good' : 'Strong'}</span>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wide">Confirm Password *</label>
                <div className="relative">
                  <FiLock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type={showConfirm ? 'text' : 'password'} name="confirmPassword" id="reg-confirm-password" value={form.confirmPassword} onChange={handleChange}
                    placeholder="Repeat password"
                    className={`w-full pl-10 pr-10 py-3 rounded-xl border text-sm text-gray-900 dark:text-white placeholder-gray-400 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 transition-all ${
                      form.confirmPassword && form.password !== form.confirmPassword
                        ? 'border-red-400 focus:ring-red-400'
                        : form.confirmPassword && form.password === form.confirmPassword
                        ? 'border-green-400 focus:ring-green-400'
                        : 'border-gray-200 dark:border-gray-700 focus:ring-blue-500'
                    }`}
                    autoComplete="new-password"
                  />
                  <button type="button" onClick={() => setShowConfirm(p => !p)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    {showConfirm ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                  </button>
                </div>
              </div>
            </div>

            <motion.button type="submit" id="register-submit-btn" disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.01, y: loading ? 0 : -1 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold rounded-2xl shadow-xl shadow-blue-500/30 transition-all text-sm flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating Account...
                </div>
              ) : (
                <><span>Create Free Account</span><FiArrowRight size={16} /></>
              )}
            </motion.button>
          </form>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-5">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
              Sign in →
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
