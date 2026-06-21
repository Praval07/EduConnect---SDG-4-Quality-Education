import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { FiSearch, FiPlay, FiClock, FiTrendingUp, FiBookmark, FiX, FiEye } from 'react-icons/fi';

const categories = ['All', 'Programming', 'Web Development', 'React', 'Node.js', 'MongoDB', 'Python', 'DSA', 'DBMS', 'OS', 'CN'];

const mockVideos = [
  { _id: '1', title: 'Complete DSA Course — Data Structures & Algorithms', description: 'Master Data Structures and Algorithms from scratch.', category: 'DSA', youtubeId: 'bum_19loj9A', duration: '8:30:00', instructor: 'Abdul Bari', views: 45678, trending: true },
  { _id: '2', title: 'React JS Full Course 2024 — Beginner to Advanced', description: 'Complete React.js tutorial for 2024. Learn hooks, context API.', category: 'React', youtubeId: 'SqcY0GlETPk', duration: '11:55:00', instructor: 'Dave Gray', views: 89234, trending: true },
  { _id: '3', title: 'Node.js & Express Full Course — REST API', description: 'Build REST APIs with Node.js, Express, and MongoDB.', category: 'Node.js', youtubeId: 'f2EqECiTBL8', duration: '8:00:00', instructor: 'Dave Gray', views: 67543, trending: true },
  { _id: '4', title: 'Python Programming Full Course for Beginners', description: 'Learn Python from zero to hero. Variables, loops, functions.', category: 'Python', youtubeId: '_uQrJ0TkZlc', duration: '6:14:00', instructor: 'CS Dojo', views: 123456, trending: true },
  { _id: '5', title: 'MongoDB Tutorial for Beginners — Full Course', description: 'Learn MongoDB from scratch. CRUD, aggregation, indexing.', category: 'MongoDB', youtubeId: 'ExcRbA7fy_A', duration: '3:24:00', instructor: 'Traversy Media', views: 34521, trending: false },
  { _id: '6', title: 'DBMS Complete Course — Gate Smashers', description: 'DBMS complete series for university exams and GATE.', category: 'DBMS', youtubeId: 'eYpXCdvKwEQ', duration: '12:00:00', instructor: 'Gate Smashers', views: 56789, trending: false },
  { _id: '7', title: 'Operating Systems Full Course — Neso Academy', description: 'OS concepts for GATE and university. Processes, scheduling.', category: 'OS', youtubeId: 'vBURTt97EkA', duration: '15:30:00', instructor: 'Neso Academy', views: 78932, trending: false },
  { _id: '8', title: 'Computer Networks Full Course — Neso Academy', description: 'Computer Networks from basics. OSI model, TCP/IP, protocols.', category: 'CN', youtubeId: 'IPvYjXCsTg8', duration: '10:45:00', instructor: 'Neso Academy', views: 54321, trending: false },
  { _id: '9', title: 'Web Development Full Course 2024 — Zero to Mastery', description: 'Complete web development bootcamp. HTML, CSS, JS, React.', category: 'Web Development', youtubeId: 'ysEN5RaKOlA', duration: '40:00:00', instructor: 'Zero to Mastery', views: 234567, trending: true },
  { _id: '10', title: 'JavaScript Complete Course — Namaste JavaScript', description: 'Deep dive into JavaScript closures, event loop, prototypes.', category: 'Programming', youtubeId: 'pN6jk0uUrD8', duration: '6:00:00', instructor: 'Akshay Saini', views: 345678, trending: true },
];

const VideoCard = ({ video, onPlay }) => {
  const [watchLater, setWatchLater] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-gray-800/50 rounded-2xl overflow-hidden shadow-md border border-gray-100 dark:border-gray-700/50"
    >
      {/* Thumbnail */}
      <div
        className="relative cursor-pointer group"
        onClick={() => onPlay(video)}
      >
        <img
          src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
          alt={video.title}
          className="w-full h-44 object-cover"
          onError={e => { e.target.src = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`; }}
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center shadow-xl"
          >
            <FiPlay size={22} className="text-white ml-1" fill="white" />
          </motion.div>
        </div>
        {video.trending && (
          <div className="absolute top-2 left-2 flex items-center gap-1 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            <FiTrendingUp size={10} /> Trending
          </div>
        )}
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded flex items-center gap-1">
          <FiClock size={10} /> {video.duration}
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white leading-snug line-clamp-2 flex-1">
            {video.title}
          </h3>
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => setWatchLater(!watchLater)}
            className={`p-1.5 rounded-lg transition-all flex-shrink-0 ${watchLater ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/30' : 'text-gray-400 hover:text-blue-600'}`}
          >
            <FiBookmark size={14} fill={watchLater ? 'currentColor' : 'none'} />
          </motion.button>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">{video.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center">
              <span className="text-white text-xs font-bold">{video.instructor?.charAt(0)}</span>
            </div>
            <span className="text-xs text-gray-600 dark:text-gray-400 font-medium truncate max-w-24">{video.instructor}</span>
          </div>
          <span className="text-xs text-gray-400 flex items-center gap-1">
            <FiEye size={11} /> {(video.views / 1000).toFixed(0)}K
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const VideoPlayer = ({ video, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.85, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.85, y: 30 }}
        className="relative w-full max-w-4xl bg-gray-900 rounded-2xl overflow-hidden shadow-2xl"
      >
        <div className="flex items-center justify-between p-3 border-b border-gray-700">
          <h3 className="text-white font-medium text-sm truncate flex-1 mr-4">{video.title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white p-1.5 rounded-lg hover:bg-gray-700 transition-all">
            <FiX size={18} />
          </button>
        </div>
        <div className="relative pb-[56.25%] bg-black">
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="p-4 bg-gray-900">
          <p className="text-gray-400 text-xs">{video.description}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Videos = () => {
  const [videos, setVideos] = useState(mockVideos);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeVideo, setActiveVideo] = useState(null);
  const [showTrending, setShowTrending] = useState(false);

  const filtered = videos.filter(v => {
    const matchSearch = !search || v.title.toLowerCase().includes(search.toLowerCase()) || v.instructor?.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === 'All' || v.category === activeCategory;
    const matchTrend = !showTrending || v.trending;
    return matchSearch && matchCat && matchTrend;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl sm:text-3xl font-bold font-poppins text-gray-900 dark:text-white mb-1">
            Educational <span className="gradient-text">Videos</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400">Curated YouTube tutorials from the best educators</p>
        </motion.div>
      </div>

      {/* Search + Trending Toggle */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            id="videos-search"
            type="text"
            placeholder="Search videos, instructors..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm"
          />
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowTrending(!showTrending)}
          id="trending-toggle"
          className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
            showTrending
              ? 'bg-red-600 text-white shadow-md shadow-red-500/30'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
          }`}
        >
          <FiTrendingUp size={16} /> Trending Only
        </motion.button>
      </div>

      {/* Category Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
        {categories.map(cat => (
          <motion.button
            key={cat}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveCategory(cat)}
            id={`video-filter-${cat.replace(/\s/g, '-').toLowerCase()}`}
            className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              activeCategory === cat
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-blue-300 hover:text-blue-600'
            }`}
          >
            {cat}
          </motion.button>
        ))}
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
        Showing <span className="font-semibold text-gray-900 dark:text-white">{filtered.length}</span> videos
      </p>

      <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        <AnimatePresence>
          {filtered.map(video => (
            <VideoCard key={video._id} video={video} onPlay={setActiveVideo} />
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {activeVideo && <VideoPlayer video={activeVideo} onClose={() => setActiveVideo(null)} />}
      </AnimatePresence>
    </div>
  );
};

export default Videos;
