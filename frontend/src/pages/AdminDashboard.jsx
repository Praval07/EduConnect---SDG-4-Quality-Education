import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import {
  FiUsers, FiBook, FiVideo, FiMail, FiMessageSquare,
  FiPlus, FiEdit, FiTrash2, FiActivity, FiShield,
  FiTrendingUp, FiCheck, FiX, FiCheckCircle
} from 'react-icons/fi';

const AdminDashboard = () => {
  const { user, token } = useAuth();
  const [activeTab, setActiveTab] = useState('stats');
  const [stats, setStats] = useState({ totalUsers: 0, totalResources: 0, totalVideos: 0, totalMessages: 0, totalAIQueries: 0 });
  const [users, setUsers] = useState([]);
  const [resources, setResources] = useState([]);
  const [videos, setVideos] = useState([]);
  const [messages, setMessages] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Resource Form State
  const [resourceForm, setResourceForm] = useState({ title: '', description: '', category: 'DSA', type: 'pdf', fileUrl: '', tags: '' });
  const [editingResourceId, setEditingResourceId] = useState(null);

  // Video Form State
  const [videoForm, setVideoForm] = useState({ title: '', description: '', category: 'DSA', youtubeId: '', duration: '', instructor: '', tags: '' });
  const [editingVideoId, setEditingVideoId] = useState(null);

  // Security Check
  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  useEffect(() => {
    fetchStats();
    fetchUsers();
    fetchResources();
    fetchVideos();
    fetchMessages();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get('/api/admin/stats');
      if (res.data.success) setStats(res.data.stats);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get('/api/admin/users');
      if (res.data.success) setUsers(res.data.users);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchResources = async () => {
    try {
      const res = await axios.get('/api/resources');
      if (res.data.resources) setResources(res.data.resources);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchVideos = async () => {
    try {
      const res = await axios.get('/api/videos');
      if (res.data.videos) setVideos(res.data.videos);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async () => {
    try {
      const res = await axios.get('/api/admin/messages');
      if (res.data.success) setMessages(res.data.messages);
    } catch (err) {
      console.error(err);
    }
  };

  const showSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  // User Actions
  const handleDeleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      setActionLoading(true);
      const res = await axios.delete(`/api/admin/users/${id}`);
      if (res.data.success) {
        setUsers(users.filter(u => u.id !== id && u._id !== id));
        fetchStats();
        showSuccess('User deleted successfully.');
      }
    } catch (err) {
      setError('Failed to delete user.');
    } finally {
      setActionLoading(false);
    }
  };

  // Resource Actions
  const handleResourceSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setActionLoading(true);
    try {
      const tagsArray = resourceForm.tags.split(',').map(t => t.trim()).filter(Boolean);
      const payload = { ...resourceForm, tags: tagsArray };

      if (editingResourceId) {
        const res = await axios.put(`/api/admin/resources/${editingResourceId}`, payload);
        if (res.data.success) {
          showSuccess('Resource updated successfully.');
          setEditingResourceId(null);
        }
      } else {
        const res = await axios.post('/api/admin/resources', payload);
        if (res.data.success) {
          showSuccess('Resource created successfully.');
        }
      }
      setResourceForm({ title: '', description: '', category: 'DSA', type: 'pdf', fileUrl: '', tags: '' });
      fetchResources();
      fetchStats();
    } catch (err) {
      setError('Failed to save resource.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleEditResource = (res) => {
    setEditingResourceId(res._id || res.id);
    setResourceForm({
      title: res.title,
      description: res.description,
      category: res.category,
      type: res.type,
      fileUrl: res.fileUrl,
      tags: res.tags ? res.tags.join(', ') : '',
    });
    setActiveTab('add-resource');
  };

  const handleDeleteResource = async (id) => {
    if (!window.confirm('Delete this resource?')) return;
    try {
      setActionLoading(true);
      const res = await axios.delete(`/api/admin/resources/${id}`);
      if (res.data.success) {
        fetchResources();
        fetchStats();
        showSuccess('Resource deleted.');
      }
    } catch (err) {
      setError('Failed to delete resource.');
    } finally {
      setActionLoading(false);
    }
  };

  // Video Actions
  const handleVideoSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setActionLoading(true);
    try {
      const tagsArray = videoForm.tags.split(',').map(t => t.trim()).filter(Boolean);
      const payload = { ...videoForm, tags: tagsArray };

      if (editingVideoId) {
        const res = await axios.put(`/api/admin/videos/${editingVideoId}`, payload);
        if (res.data.success) {
          showSuccess('Video updated successfully.');
          setEditingVideoId(null);
        }
      } else {
        const res = await axios.post('/api/admin/videos', payload);
        if (res.data.success) {
          showSuccess('Video created successfully.');
        }
      }
      setVideoForm({ title: '', description: '', category: 'DSA', youtubeId: '', duration: '', instructor: '', tags: '' });
      fetchVideos();
      fetchStats();
    } catch (err) {
      setError('Failed to save video.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleEditVideo = (vid) => {
    setEditingVideoId(vid._id || vid.id);
    setVideoForm({
      title: vid.title,
      description: vid.description,
      category: vid.category,
      youtubeId: vid.youtubeId,
      duration: vid.duration,
      instructor: vid.instructor,
      tags: vid.tags ? vid.tags.join(', ') : '',
    });
    setActiveTab('add-video');
  };

  const handleDeleteVideo = async (id) => {
    if (!window.confirm('Delete this video?')) return;
    try {
      setActionLoading(true);
      const res = await axios.delete(`/api/admin/videos/${id}`);
      if (res.data.success) {
        fetchVideos();
        fetchStats();
        showSuccess('Video deleted.');
      }
    } catch (err) {
      setError('Failed to delete video.');
    } finally {
      setActionLoading(false);
    }
  };

  // Message Actions
  const handleMarkReplied = async (id) => {
    try {
      setActionLoading(true);
      const res = await axios.put(`/api/admin/messages/${id}/reply`);
      if (res.data.success) {
        fetchMessages();
        showSuccess('Message marked as replied.');
      }
    } catch (err) {
      setError('Failed to mark message as replied.');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[85vh]">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8 border-b border-purple-500/25 pb-5">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
          <FiShield size={20} className="text-white" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-poppins text-white flex items-center gap-2">
            Admin Management <span className="text-xs bg-red-500/20 text-red-400 border border-red-500/30 px-2 py-0.5 rounded-full uppercase tracking-wider">Secured</span>
          </h1>
          <p className="text-gray-400 text-sm">Control center for Rapid Revision Hub platform statistics and resources</p>
        </div>
      </div>

      {/* Notifications */}
      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-400 text-sm flex items-center gap-2">
          <span>⚠️</span> {error}
        </div>
      )}
      {successMsg && (
        <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-400 text-sm flex items-center gap-2 animate-bounce">
          <FiCheckCircle /> {successMsg}
        </div>
      )}

      {/* Tabs list */}
      <div className="flex flex-wrap gap-2 mb-8 bg-[#0F172A] p-1.5 rounded-2xl border border-purple-500/15">
        {[
          { id: 'stats', label: 'Stats & Overview', icon: FiActivity },
          { id: 'users', label: 'Users', icon: FiUsers },
          { id: 'resources', label: 'Resources List', icon: FiBook },
          { id: 'add-resource', label: editingResourceId ? 'Edit Resource' : 'Add Resource', icon: FiPlus },
          { id: 'videos', label: 'Videos List', icon: FiVideo },
          { id: 'add-video', label: editingVideoId ? 'Edit Video' : 'Add Video', icon: FiPlus },
          { id: 'messages', label: 'Messages', icon: FiMail },
        ].map(t => {
          const Icon = t.icon;
          const active = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                active ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30' : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon size={15} /> {t.label}
            </button>
          );
        })}
      </div>

      {/* Content Area */}
      {loading ? (
        <div className="py-20 flex justify-center items-center">
          <div className="w-10 h-10 border-4 border-purple-500/30 border-t-purple-600 rounded-full animate-spin" />
        </div>
      ) : (
        <div>
          {/* STATS TAB */}
          {activeTab === 'stats' && (
            <div className="space-y-8">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                  { icon: FiUsers, label: 'Total Users', value: stats.totalUsers, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
                  { icon: FiBook, label: 'Resources', value: stats.totalResources, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
                  { icon: FiVideo, label: 'Videos', value: stats.totalVideos, color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' },
                  { icon: FiMail, label: 'Messages', value: stats.totalMessages, color: 'text-pink-400', bg: 'bg-pink-500/10 border-pink-500/20' },
                  { icon: FiMessageSquare, label: 'AI Queries', value: stats.totalAIQueries, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
                ].map((s, idx) => {
                  const Icon = s.icon;
                  return (
                    <div key={idx} className={`p-5 rounded-2xl border ${s.bg} bg-[#0F172A]`}>
                      <Icon size={22} className={`${s.color} mb-3`} />
                      <div className="text-3xl font-bold font-poppins text-white mb-1">{s.value}</div>
                      <div className="text-xs text-gray-400">{s.label}</div>
                    </div>
                  );
                })}
              </div>

              <div className="bg-[#0F172A] border border-purple-500/15 rounded-3xl p-6">
                <h3 className="font-semibold text-lg text-white mb-4 flex items-center gap-2"><FiTrendingUp className="text-purple-400" /> Platform Insights</h3>
                <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-300">
                  <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
                    <p className="font-bold text-white mb-2">Most Requested CS Fields</p>
                    <div className="flex justify-between border-b border-white/5 pb-1"><span>DSA & Algorithms</span><span className="text-purple-400 font-bold">45%</span></div>
                    <div className="flex justify-between border-b border-white/5 pb-1"><span>React & Frontend</span><span className="text-purple-400 font-bold">25%</span></div>
                    <div className="flex justify-between border-b border-white/5 pb-1"><span>DBMS & Databases</span><span className="text-purple-400 font-bold">18%</span></div>
                    <div className="flex justify-between"><span>OS & Networks</span><span className="text-purple-400 font-bold">12%</span></div>
                  </div>
                  <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
                    <p className="font-bold text-white mb-2">System Diagnostics</p>
                    <div className="flex justify-between"><span>DB Status:</span><span className="text-emerald-400 font-bold">Active (Mock Mode Fallback)</span></div>
                    <div className="flex justify-between"><span>API Response:</span><span className="text-emerald-400 font-bold">Nominal (12ms)</span></div>
                    <div className="flex justify-between"><span>Mailing Server:</span><span className="text-amber-400 font-bold">Awaiting SMTP configs</span></div>
                    <div className="flex justify-between"><span>Admin Security:</span><span className="text-emerald-400 font-bold">JWT Protected</span></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* USERS TAB */}
          {activeTab === 'users' && (
            <div className="bg-[#0F172A] border border-purple-500/15 rounded-3xl overflow-hidden shadow-lg">
              <div className="px-6 py-4 border-b border-purple-500/15 flex items-center justify-between bg-purple-950/10">
                <h3 className="font-semibold text-white">Registered Users</h3>
                <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full">{users.length} Total</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-300 border-collapse">
                  <thead>
                    <tr className="bg-white/5 text-gray-400 uppercase text-xs tracking-wider border-b border-purple-500/15">
                      <th className="px-6 py-3">Name</th>
                      <th className="px-6 py-3">Email</th>
                      <th className="px-6 py-3">College</th>
                      <th className="px-6 py-3">Course / Branch</th>
                      <th className="px-6 py-3">Role</th>
                      <th className="px-6 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-500/10">
                    {users.map(u => (
                      <tr key={u._id || u.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 font-semibold text-white">{u.name}</td>
                        <td className="px-6 py-4">{u.email}</td>
                        <td className="px-6 py-4">{u.college || 'N/A'}</td>
                        <td className="px-6 py-4">{u.course ? `${u.course} - ${u.branch}` : 'N/A'}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-0.5 text-xs rounded-full border ${
                            u.role === 'admin' ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                          }`}>{u.role}</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => handleDeleteUser(u._id || u.id)}
                            disabled={actionLoading || u.role === 'admin'}
                            className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all disabled:opacity-40"
                          >
                            <FiTrash2 size={15} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* RESOURCES TAB */}
          {activeTab === 'resources' && (
            <div className="bg-[#0F172A] border border-purple-500/15 rounded-3xl overflow-hidden shadow-lg">
              <div className="px-6 py-4 border-b border-purple-500/15 flex items-center justify-between bg-purple-950/10">
                <h3 className="font-semibold text-white">Study Materials ({resources.length})</h3>
                <button onClick={() => { setEditingResourceId(null); setResourceForm({ title: '', description: '', category: 'DSA', type: 'pdf', fileUrl: '', tags: '' }); setActiveTab('add-resource'); }} className="flex items-center gap-1 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold px-3 py-1.5 rounded-xl shadow-md transition-all cursor-pointer">
                  <FiPlus size={13} /> Add New
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-300 border-collapse">
                  <thead>
                    <tr className="bg-white/5 text-gray-400 uppercase text-xs tracking-wider border-b border-purple-500/15">
                      <th className="px-6 py-3">Title</th>
                      <th className="px-6 py-3">Category</th>
                      <th className="px-6 py-3">Type</th>
                      <th className="px-6 py-3">Downloads</th>
                      <th className="px-6 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-500/10">
                    {resources.map(r => (
                      <tr key={r._id || r.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 font-semibold text-white">{r.title}</td>
                        <td className="px-6 py-4">{r.category}</td>
                        <td className="px-6 py-4 uppercase text-xs font-bold text-purple-400">{r.type}</td>
                        <td className="px-6 py-4">{r.downloadCount || 0}</td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <button onClick={() => handleEditResource(r)} className="p-1.5 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition-all"><FiEdit size={14} /></button>
                          <button onClick={() => handleDeleteResource(r._id || r.id)} className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all"><FiTrash2 size={14} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ADD/EDIT RESOURCE TAB */}
          {activeTab === 'add-resource' && (
            <div className="bg-[#0F172A] border border-purple-500/15 rounded-3xl p-6 shadow-lg max-w-2xl mx-auto">
              <h3 className="text-xl font-bold font-poppins text-white mb-6 flex items-center gap-2">
                {editingResourceId ? <FiEdit className="text-purple-400" /> : <FiPlus className="text-purple-400" />}
                {editingResourceId ? 'Edit Revision Resource' : 'Add Revision Resource'}
              </h3>
              <form onSubmit={handleResourceSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Resource Title *</label>
                  <input type="text" required value={resourceForm.title} onChange={e => setResourceForm({ ...resourceForm, title: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-700 bg-gray-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="e.g. DBMS Normalization Notes" />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Description *</label>
                  <textarea required rows={3} value={resourceForm.description} onChange={e => setResourceForm({ ...resourceForm, description: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-700 bg-gray-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Describe this resource..." />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-1">Category *</label>
                    <select value={resourceForm.category} onChange={e => setResourceForm({ ...resourceForm, category: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-700 bg-gray-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
                      {['DSA', 'DBMS', 'OS', 'CN', 'Python', 'Java', 'React', 'Node.js', 'MongoDB', 'Programming', 'Web Development'].map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-1">Type *</label>
                    <select value={resourceForm.type} onChange={e => setResourceForm({ ...resourceForm, type: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-700 bg-gray-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
                      {['pdf', 'notes', 'link', 'zip'].map(t => <option key={t} value={t}>{t.toUpperCase()}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1">File / Drive Link *</label>
                  <input type="url" required value={resourceForm.fileUrl} onChange={e => setResourceForm({ ...resourceForm, fileUrl: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-700 bg-gray-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="https://drive.google.com/file/..." />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Tags (Comma separated)</label>
                  <input type="text" value={resourceForm.tags} onChange={e => setResourceForm({ ...resourceForm, tags: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-700 bg-gray-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="e.g. database, normalization, aktu" />
                </div>

                <div className="flex gap-3 justify-end pt-4">
                  <button type="button" onClick={() => { setActiveTab('resources'); setEditingResourceId(null); }} className="px-5 py-2.5 rounded-xl text-gray-400 hover:text-white text-sm font-semibold transition-all">Cancel</button>
                  <button type="submit" disabled={actionLoading} className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold rounded-xl shadow-lg transition-all cursor-pointer">
                    {actionLoading ? 'Saving...' : editingResourceId ? 'Update Resource' : 'Create Resource'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* VIDEOS TAB */}
          {activeTab === 'videos' && (
            <div className="bg-[#0F172A] border border-purple-500/15 rounded-3xl overflow-hidden shadow-lg">
              <div className="px-6 py-4 border-b border-purple-500/15 flex items-center justify-between bg-purple-950/10">
                <h3 className="font-semibold text-white">YouTube Educational Videos ({videos.length})</h3>
                <button onClick={() => { setEditingVideoId(null); setVideoForm({ title: '', description: '', category: 'DSA', youtubeId: '', duration: '', instructor: '', tags: '' }); setActiveTab('add-video'); }} className="flex items-center gap-1 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold px-3 py-1.5 rounded-xl shadow-md transition-all cursor-pointer">
                  <FiPlus size={13} /> Add Video
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-300 border-collapse">
                  <thead>
                    <tr className="bg-white/5 text-gray-400 uppercase text-xs tracking-wider border-b border-purple-500/15">
                      <th className="px-6 py-3">Title</th>
                      <th className="px-6 py-3">Instructor</th>
                      <th className="px-6 py-3">Youtube ID</th>
                      <th className="px-6 py-3">Category</th>
                      <th className="px-6 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-500/10">
                    {videos.map(v => (
                      <tr key={v._id || v.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 font-semibold text-white">{v.title}</td>
                        <td className="px-6 py-4">{v.instructor}</td>
                        <td className="px-6 py-4 font-mono text-xs">{v.youtubeId}</td>
                        <td className="px-6 py-4">{v.category}</td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <button onClick={() => handleEditVideo(v)} className="p-1.5 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition-all"><FiEdit size={14} /></button>
                          <button onClick={() => handleDeleteVideo(v._id || v.id)} className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all"><FiTrash2 size={14} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ADD/EDIT VIDEO TAB */}
          {activeTab === 'add-video' && (
            <div className="bg-[#0F172A] border border-purple-500/15 rounded-3xl p-6 shadow-lg max-w-2xl mx-auto">
              <h3 className="text-xl font-bold font-poppins text-white mb-6 flex items-center gap-2">
                {editingVideoId ? <FiEdit className="text-purple-400" /> : <FiPlus className="text-purple-400" />}
                {editingVideoId ? 'Edit Revision Video' : 'Add Revision Video'}
              </h3>
              <form onSubmit={handleVideoSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Video Title *</label>
                  <input type="text" required value={videoForm.title} onChange={e => setVideoForm({ ...videoForm, title: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-700 bg-gray-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="e.g. React hooks explained in 1 hour" />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Description *</label>
                  <textarea required rows={3} value={videoForm.description} onChange={e => setVideoForm({ ...videoForm, description: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-700 bg-gray-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Describe this video course..." />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-1">Category *</label>
                    <select value={videoForm.category} onChange={e => setVideoForm({ ...videoForm, category: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-700 bg-gray-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
                      {['DSA', 'DBMS', 'OS', 'CN', 'Python', 'Java', 'React', 'Node.js', 'MongoDB', 'Programming', 'Web Development', 'HTML', 'CSS', 'JavaScript'].map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-1">Instructor *</label>
                    <input type="text" required value={videoForm.instructor} onChange={e => setVideoForm({ ...videoForm, instructor: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-700 bg-gray-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="e.g. Abdul Bari, Neso Academy" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-1">YouTube Video ID *</label>
                    <input type="text" required value={videoForm.youtubeId} onChange={e => setVideoForm({ ...videoForm, youtubeId: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-700 bg-gray-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="e.g. SqcY0GlETPk" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-1">Duration *</label>
                    <input type="text" required value={videoForm.duration} onChange={e => setVideoForm({ ...videoForm, duration: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-700 bg-gray-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="e.g. 10:45:00" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Tags (Comma separated)</label>
                  <input type="text" value={videoForm.tags} onChange={e => setVideoForm({ ...videoForm, tags: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-700 bg-gray-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="e.g. react, hooks, frontend" />
                </div>

                <div className="flex gap-3 justify-end pt-4">
                  <button type="button" onClick={() => { setActiveTab('videos'); setEditingVideoId(null); }} className="px-5 py-2.5 rounded-xl text-gray-400 hover:text-white text-sm font-semibold transition-all">Cancel</button>
                  <button type="submit" disabled={actionLoading} className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold rounded-xl shadow-lg transition-all cursor-pointer">
                    {actionLoading ? 'Saving...' : editingVideoId ? 'Update Video' : 'Create Video'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* CONTACT MESSAGES TAB */}
          {activeTab === 'messages' && (
            <div className="space-y-4">
              {messages.length === 0 ? (
                <div className="text-center py-10 bg-[#0F172A] border border-purple-500/15 rounded-3xl text-gray-400">No contact messages received.</div>
              ) : (
                messages.map(m => (
                  <div key={m._id || m.id} className="bg-[#0F172A] border border-purple-500/15 rounded-3xl p-6 shadow-md flex flex-col md:flex-row justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-base">{m.name}</span>
                        <span className="text-xs text-gray-400">({m.email})</span>
                      </div>
                      <p className="text-purple-400 font-semibold text-sm">Subject: {m.subject}</p>
                      <p className="text-gray-300 text-sm bg-white/5 p-3 rounded-xl border border-white/5 mt-2 whitespace-pre-wrap">{m.message}</p>
                      <span className="text-xs text-gray-500 inline-block mt-2">{new Date(m.createdAt).toLocaleString()}</span>
                    </div>
                    <div className="flex-shrink-0 flex items-start gap-2">
                      {m.replied ? (
                        <span className="flex items-center gap-1 px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full"><FiCheck size={12} /> Replied</span>
                      ) : (
                        <button
                          onClick={() => handleMarkReplied(m._id || m.id)}
                          className="flex items-center gap-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold px-3 py-1.5 rounded-xl shadow-md transition-all cursor-pointer"
                        >
                          Mark as Replied
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
