import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { FiUser, FiMail, FiBook, FiSave, FiEdit2, FiX, FiCheck, FiAward, FiDownload, FiVideo, FiMessageSquare } from 'react-icons/fi';

const skillSuggestions = ['React', 'Node.js', 'Python', 'JavaScript', 'MongoDB', 'DSA', 'Machine Learning', 'Java', 'C++', 'SQL', 'TypeScript', 'Docker'];

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || '',
    college: user?.college || '',
    branch: user?.branch || '',
    semester: user?.semester || '',
    skills: user?.skills || [],
  });
  const [newSkill, setNewSkill] = useState('');
  const [error, setError] = useState('');

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      const res = await axios.put('/api/profile', form);
      updateUser(res.data.user);
      setEditing(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setError('Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const addSkill = (skill) => {
    const s = skill || newSkill.trim();
    if (s && !form.skills.includes(s)) {
      setForm({ ...form, skills: [...form.skills, s] });
    }
    setNewSkill('');
  };

  const removeSkill = (skill) => {
    setForm({ ...form, skills: form.skills.filter(s => s !== skill) });
  };

  const stats = user?.stats || {};

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold font-poppins text-gray-900 dark:text-white mb-1">
          My <span className="gradient-text">Profile</span>
        </h1>
        <p className="text-gray-500 dark:text-gray-400">Manage your learning profile and track progress</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800/50 rounded-2xl p-6 shadow-md border border-gray-100 dark:border-gray-700/50 text-center"
        >
          {/* Avatar */}
          <div className="relative inline-block mb-4">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center shadow-xl shadow-blue-500/30 mx-auto">
              <span className="text-white text-3xl font-bold font-poppins">
                {user?.name?.charAt(0)?.toUpperCase()}
              </span>
            </div>
            <div className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-emerald-500 border-2 border-white dark:border-gray-800 flex items-center justify-center">
              <FiCheck size={12} className="text-white" />
            </div>
          </div>

          <h2 className="text-xl font-bold font-poppins text-gray-900 dark:text-white mb-1">{user?.name}</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">{user?.email}</p>
          {user?.college && (
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-0.5">{user.college}</p>
          )}
          {user?.branch && (
            <p className="text-gray-500 dark:text-gray-400 text-xs">{user.branch} · Semester {user.semester}</p>
          )}

          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
            <span className="sdg-badge">🎓 SDG 4 Learner</span>
          </div>

          {/* Skills */}
          <div className="mt-4 text-left">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">Skills</p>
            <div className="flex flex-wrap gap-1.5">
              {(form.skills.length > 0 ? form.skills : user?.skills || []).map(skill => (
                <span key={skill} className="text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2 py-0.5 rounded-full">
                  {skill}
                </span>
              ))}
              {(!form.skills.length && !user?.skills?.length) && (
                <span className="text-xs text-gray-400">No skills added yet</span>
              )}
            </div>
          </div>
        </motion.div>

        {/* Edit Form + Stats */}
        <div className="lg:col-span-2 space-y-5">
          {/* Edit Profile */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800/50 rounded-2xl p-5 shadow-md border border-gray-100 dark:border-gray-700/50"
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-semibold font-poppins text-gray-900 dark:text-white flex items-center gap-2">
                <FiUser size={16} className="text-blue-600" /> Personal Information
              </h2>
              {!editing ? (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setEditing(true)}
                  id="edit-profile-btn"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-blue-600 border border-blue-200 dark:border-blue-800 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all"
                >
                  <FiEdit2 size={13} /> Edit
                </motion.button>
              ) : (
                <div className="flex gap-2">
                  <motion.button whileTap={{ scale: 0.97 }} onClick={() => setEditing(false)} className="px-3 py-1.5 text-sm text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all">
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    onClick={handleSave} disabled={saving}
                    id="save-profile-btn"
                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all disabled:opacity-60"
                  >
                    {saving ? <div className="w-3 h-3 border border-white/30 border-t-white rounded-full animate-spin" /> : <FiSave size={13} />}
                    {saving ? 'Saving...' : 'Save'}
                  </motion.button>
                </div>
              )}
            </div>

            {error && <div className="text-sm text-red-500 mb-4 bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-xl">{error}</div>}
            {saved && <div className="text-sm text-emerald-600 mb-4 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-2 rounded-xl flex items-center gap-2"><FiCheck size={14} /> Profile updated successfully!</div>}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: 'Full Name', field: 'name', icon: FiUser },
                { label: 'College / University', field: 'college', icon: FiBook },
                { label: 'Branch / Department', field: 'branch', icon: FiBook },
                { label: 'Current Semester', field: 'semester', icon: FiAward },
              ].map(({ label, field, icon: Icon }) => (
                <div key={field}>
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">{label}</label>
                  <div className="relative">
                    <Icon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      id={`profile-${field}`}
                      value={form[field]}
                      disabled={!editing}
                      onChange={e => setForm({ ...form, [field]: e.target.value })}
                      className={`w-full pl-9 pr-3 py-2.5 rounded-xl text-sm border transition-all ${
                        editing
                          ? 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                          : 'bg-transparent border-transparent text-gray-700 dark:text-gray-300 cursor-default'
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Email (read-only) */}
            <div className="mt-4">
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Email Address</label>
              <div className="relative">
                <FiMail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input value={user?.email} disabled className="w-full pl-9 pr-3 py-2.5 rounded-xl text-sm border-0 bg-gray-100 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 cursor-not-allowed" />
              </div>
            </div>

            {/* Skills */}
            {editing && (
              <div className="mt-4">
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Skills & Technologies</label>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {form.skills.map(skill => (
                    <span key={skill} className="flex items-center gap-1 text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2 py-1 rounded-full">
                      {skill}
                      <button onClick={() => removeSkill(skill)} className="hover:text-red-500 transition-colors">
                        <FiX size={10} />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={e => setNewSkill(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addSkill(); } }}
                    placeholder="Add a skill..."
                    className="flex-1 px-3 py-2 rounded-xl text-sm border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                  />
                  <button onClick={() => addSkill()} className="px-3 py-2 bg-blue-600 text-white rounded-xl text-sm hover:bg-blue-700 transition-all">Add</button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {skillSuggestions.filter(s => !form.skills.includes(s)).slice(0, 8).map(skill => (
                    <button key={skill} onClick={() => addSkill(skill)} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-all">
                      + {skill}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Learning Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800/50 rounded-2xl p-5 shadow-md border border-gray-100 dark:border-gray-700/50"
          >
            <h2 className="font-semibold font-poppins text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <FiAward size={16} className="text-amber-500" /> Learning Statistics
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: FiDownload, label: 'Downloads', value: stats.resourcesDownloaded || 0, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/30' },
                { icon: FiVideo, label: 'Videos', value: stats.videosWatched || 0, color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/30' },
                { icon: FiMessageSquare, label: 'AI Queries', value: stats.aiQueries || 0, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/30' },
              ].map(stat => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className={`${stat.bg} rounded-2xl p-4 text-center`}>
                    <Icon size={20} className={`${stat.color} mx-auto mb-2`} />
                    <div className={`text-2xl font-bold font-poppins ${stat.color}`}>{stat.value}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
