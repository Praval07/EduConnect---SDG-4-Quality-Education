import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import {
  FiBook, FiVideo, FiMessageSquare, FiBookmark,
  FiTrendingUp, FiArrowRight, FiClock, FiActivity,
  FiAward, FiTarget, FiZap
} from 'react-icons/fi';

const StatCard = ({ icon: Icon, label, value, color, bgColor, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ y: -4 }}
    className="bg-white dark:bg-gray-800/50 rounded-2xl p-5 shadow-md shadow-gray-100/80 dark:shadow-none border border-gray-100 dark:border-gray-700/50"
  >
    <div className="flex items-start justify-between mb-3">
      <div className={`w-11 h-11 rounded-xl ${bgColor} flex items-center justify-center`}>
        <Icon size={20} className={color} />
      </div>
      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${bgColor} ${color}`}>Active</span>
    </div>
    <div className="text-3xl font-bold font-poppins text-gray-900 dark:text-white mb-0.5">{value}</div>
    <div className="text-sm text-gray-500 dark:text-gray-400">{label}</div>
  </motion.div>
);

const quickActions = [
  { to: '/materials', label: 'Study Materials', desc: 'Browse resources', icon: FiBook, color: 'from-blue-500 to-blue-600' },
  { to: '/videos', label: 'Watch Videos', desc: 'Educational content', icon: FiVideo, color: 'from-emerald-500 to-emerald-600' },
  { to: '/ai-assistant', label: 'AI Assistant', desc: 'Get instant help', icon: FiMessageSquare, color: 'from-purple-500 to-purple-600' },
  { to: '/profile', label: 'My Profile', desc: 'Update your info', icon: FiAward, color: 'from-amber-500 to-amber-600' },
];

const recentActivities = [
  { icon: '📚', text: 'DSA Notes downloaded', time: '2 hours ago' },
  { icon: '🤖', text: 'AI Chat: React Hooks explained', time: '5 hours ago' },
  { icon: '🎥', text: 'Watched: Python Full Course', time: 'Yesterday' },
  { icon: '⭐', text: 'Saved: Node.js API Guide', time: '2 days ago' },
];

const studyGoals = [
  { label: 'DSA Practice', progress: 65, color: 'bg-blue-500' },
  { label: 'React Projects', progress: 80, color: 'bg-emerald-500' },
  { label: 'DBMS Revision', progress: 40, color: 'bg-purple-500' },
  { label: 'OS Concepts', progress: 55, color: 'bg-amber-500' },
];

const Dashboard = () => {
  const { user } = useAuth();
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/resources?limit=3');
        setResources(res.data.resources || []);
      } catch {
        // Use mock data if API unavailable
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const stats = user?.stats || {};

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">{greeting()}, 👋</p>
            <h1 className="text-2xl sm:text-3xl font-bold font-poppins text-gray-900 dark:text-white">
              {user?.name?.split(' ')[0]}&apos;s Learning Hub
            </h1>
            {user?.college && (
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                {user.college} · {user.branch} · Semester {user.semester}
              </p>
            )}
          </div>
          <span className="sdg-badge hidden sm:flex">🎓 SDG 4</span>
        </div>
      </motion.div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={FiBook} label="Resources Downloaded" value={stats.resourcesDownloaded || 0} color="text-blue-600" bgColor="bg-blue-50 dark:bg-blue-900/30" delay={0} />
        <StatCard icon={FiBookmark} label="Saved Resources" value={stats.savedResources || 0} color="text-emerald-600" bgColor="bg-emerald-50 dark:bg-emerald-900/30" delay={0.1} />
        <StatCard icon={FiVideo} label="Videos Watched" value={stats.videosWatched || 0} color="text-purple-600" bgColor="bg-purple-50 dark:bg-purple-900/30" delay={0.2} />
        <StatCard icon={FiMessageSquare} label="AI Sessions" value={stats.aiSessions || 0} color="text-amber-600" bgColor="bg-amber-50 dark:bg-amber-900/30" delay={0.3} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-white dark:bg-gray-800/50 rounded-2xl p-5 shadow-md border border-gray-100 dark:border-gray-700/50"
        >
          <h2 className="font-semibold font-poppins text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <FiZap size={16} className="text-blue-600" /> Quick Actions
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link key={action.to} to={action.to}>
                  <motion.div
                    whileHover={{ y: -4, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="text-center p-4 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition-all cursor-pointer"
                  >
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mx-auto mb-2 shadow-lg`}>
                      <Icon size={18} className="text-white" />
                    </div>
                    <p className="text-xs font-semibold text-gray-900 dark:text-white">{action.label}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{action.desc}</p>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </motion.div>

        {/* Study Goals */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800/50 rounded-2xl p-5 shadow-md border border-gray-100 dark:border-gray-700/50"
        >
          <h2 className="font-semibold font-poppins text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <FiTarget size={16} className="text-emerald-500" /> Study Goals
          </h2>
          <div className="space-y-4">
            {studyGoals.map(goal => (
              <div key={goal.label}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{goal.label}</span>
                  <span className="text-gray-500">{goal.progress}%</span>
                </div>
                <div className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${goal.progress}%` }}
                    transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
                    className={`h-full ${goal.color} rounded-full`}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800/50 rounded-2xl p-5 shadow-md border border-gray-100 dark:border-gray-700/50"
        >
          <h2 className="font-semibold font-poppins text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <FiActivity size={16} className="text-purple-500" /> Recent Activity
          </h2>
          <div className="space-y-3">
            {recentActivities.map((activity, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="flex items-start gap-3 pb-3 border-b border-gray-50 dark:border-gray-700/50 last:border-0 last:pb-0"
              >
                <span className="text-lg">{activity.icon}</span>
                <div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{activity.text}</p>
                  <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                    <FiClock size={10} /> {activity.time}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recommended Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2 bg-white dark:bg-gray-800/50 rounded-2xl p-5 shadow-md border border-gray-100 dark:border-gray-700/50"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold font-poppins text-gray-900 dark:text-white flex items-center gap-2">
              <FiTrendingUp size={16} className="text-amber-500" /> Recommended Resources
            </h2>
            <Link to="/materials" className="text-xs text-blue-600 hover:underline flex items-center gap-1">
              View all <FiArrowRight size={12} />
            </Link>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="shimmer h-16 rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {(resources.length > 0 ? resources : [
                { _id: '1', title: 'Complete DSA Notes', category: 'DSA', downloadCount: 1247 },
                { _id: '2', title: 'React.js Complete Guide', category: 'React', downloadCount: 2389 },
                { _id: '3', title: 'DBMS Normalization Notes', category: 'DBMS', downloadCount: 1876 },
              ]).map((resource, i) => (
                <motion.div
                  key={resource._id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                    <FiBook size={16} className="text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{resource.title}</p>
                    <p className="text-xs text-gray-500">{resource.category} · {resource.downloadCount?.toLocaleString()} downloads</p>
                  </div>
                  <Link to="/materials">
                    <motion.div whileHover={{ x: 3 }} className="text-blue-600">
                      <FiArrowRight size={16} />
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
