import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiPlay, FiExternalLink, FiYoutube, FiClock, FiBookmark } from 'react-icons/fi';

// ─── REAL VIDEOS FROM @rapidrevisionhub-n5e ───────────────────────────────
const ownChannelVideos = [
  {
    id: 'q2CCA6ZZoUM',
    title: 'Technical Communication in 300 Seconds 🔥 | TC Quick Revision | AKTU Exam Shorts',
    channel: 'Rapid Revision Hub',
    category: 'TC / AKTU',
    isOwn: true,
    thumbnail: `https://img.youtube.com/vi/q2CCA6ZZoUM/maxresdefault.jpg`,
  },
  {
    id: '4W4gugyj64I',
    title: 'Technical Communication in 360 Seconds 🔥 | TC Quick Revision | AKTU Exam Shorts',
    channel: 'Rapid Revision Hub',
    category: 'TC / AKTU',
    isOwn: true,
    thumbnail: `https://img.youtube.com/vi/4W4gugyj64I/maxresdefault.jpg`,
  },
];

// ─── CURATED EDUCATIONAL VIDEOS ───────────────────────────────────────────
const curatedVideos = [
  // DSA
  { id: 'pkYVOmU3MgA', title: 'Data Structures & Algorithms Full Course', channel: 'Abdul Bari', category: 'DSA', thumbnail: `https://img.youtube.com/vi/pkYVOmU3MgA/maxresdefault.jpg` },
  { id: 'RBSGKlAvoiM', title: 'Data Structures Easy to Advanced Course', channel: 'freeCodeCamp', category: 'DSA', thumbnail: `https://img.youtube.com/vi/RBSGKlAvoiM/maxresdefault.jpg` },
  // DBMS
  { id: 'T7AxM6bvsyE', title: 'DBMS Complete Tutorial in Hindi', channel: 'Gate Smashers', category: 'DBMS', thumbnail: `https://img.youtube.com/vi/T7AxM6bvsyE/maxresdefault.jpg` },
  { id: 'ztHopE5Wnpc', title: 'Database Management System Full Course', channel: 'Neso Academy', category: 'DBMS', thumbnail: `https://img.youtube.com/vi/ztHopE5Wnpc/maxresdefault.jpg` },
  // OS
  { id: 'vBURTt97EkA', title: 'Operating System Full Course', channel: 'Neso Academy', category: 'OS', thumbnail: `https://img.youtube.com/vi/vBURTt97EkA/maxresdefault.jpg` },
  // React
  { id: 'w7ejDZ8SWv8', title: 'React JS Crash Course 2024', channel: 'Traversy Media', category: 'React', thumbnail: `https://img.youtube.com/vi/w7ejDZ8SWv8/maxresdefault.jpg` },
  { id: 'bMknfKXIFA8', title: 'React Full Course for Beginners', channel: 'Dave Gray', category: 'React', thumbnail: `https://img.youtube.com/vi/bMknfKXIFA8/maxresdefault.jpg` },
  // Node.js
  { id: 'Oe421EPjeBE', title: 'Node.js and Express.js Full Course', channel: 'freeCodeCamp', category: 'Node.js', thumbnail: `https://img.youtube.com/vi/Oe421EPjeBE/maxresdefault.jpg` },
  // Python
  { id: '_uQrJ0TkZlc', title: 'Python Tutorial for Beginners', channel: 'Programming with Mosh', category: 'Python', thumbnail: `https://img.youtube.com/vi/_uQrJ0TkZlc/maxresdefault.jpg` },
  // JavaScript
  { id: 'W6NZfCO5SIk', title: 'JavaScript Tutorial for Beginners', channel: 'Programming with Mosh', category: 'JavaScript', thumbnail: `https://img.youtube.com/vi/W6NZfCO5SIk/maxresdefault.jpg` },
  // MongoDB
  { id: 's0anSjEeua8', title: 'MongoDB Crash Course', channel: 'Traversy Media', category: 'MongoDB', thumbnail: `https://img.youtube.com/vi/s0anSjEeua8/maxresdefault.jpg` },
  // CN
  { id: 'qiQR5rTSshw', title: 'Computer Networking Full Course', channel: 'freeCodeCamp', category: 'CN', thumbnail: `https://img.youtube.com/vi/qiQR5rTSshw/maxresdefault.jpg` },
  // HTML & CSS
  { id: 'mU6anWqZJcc', title: 'HTML Full Course — Build a Website', channel: 'freeCodeCamp', category: 'HTML/CSS', thumbnail: `https://img.youtube.com/vi/mU6anWqZJcc/maxresdefault.jpg` },
  { id: 'OXGznpKZ_sA', title: 'CSS Full Course', channel: 'freeCodeCamp', category: 'HTML/CSS', thumbnail: `https://img.youtube.com/vi/OXGznpKZ_sA/maxresdefault.jpg` },
];

const CATEGORIES = ['All', 'TC / AKTU', 'DSA', 'DBMS', 'OS', 'React', 'Node.js', 'Python', 'JavaScript', 'MongoDB', 'CN', 'HTML/CSS'];

const CATEGORY_COLORS = {
  'TC / AKTU':  'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  DSA:          'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  DBMS:         'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
  OS:           'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  React:        'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400',
  'Node.js':    'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  Python:       'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  JavaScript:   'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  MongoDB:      'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  CN:           'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  'HTML/CSS':   'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
};

const VideoCard = ({ video, onClick }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    whileHover={{ y: -5, scale: 1.01 }}
    className={`bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border cursor-pointer group ${
      video.isOwn ? 'border-yellow-300 dark:border-yellow-600 ring-2 ring-yellow-300/30' : 'border-gray-100 dark:border-gray-700'
    }`}
    onClick={() => onClick(video)}
    id={`video-card-${video.id}`}
  >
    {/* Thumbnail */}
    <div className="relative overflow-hidden aspect-video bg-gray-900">
      <img
        src={video.thumbnail}
        alt={video.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        onError={e => { e.target.src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`; }}
      />
      {/* Play overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.1 }}
          className="w-14 h-14 rounded-full bg-red-600 shadow-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
        >
          <FiPlay size={22} className="text-white ml-1" fill="white" />
        </motion.div>
      </div>
      {/* Own channel badge */}
      {video.isOwn && (
        <div className="absolute top-2 left-2 flex items-center gap-1 bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-1 rounded-lg shadow-lg">
          <FiYoutube size={12} /> Our Channel
        </div>
      )}
      {/* Category chip */}
      <div className={`absolute top-2 right-2 text-xs font-semibold px-2 py-1 rounded-lg ${CATEGORY_COLORS[video.category] || 'bg-gray-100 text-gray-600'}`}>
        {video.category}
      </div>
    </div>

    {/* Info */}
    <div className="p-4">
      <h3 className="font-semibold text-gray-900 dark:text-white text-sm leading-snug mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {video.title}
      </h3>
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
          <FiYoutube size={12} className="text-red-500" /> {video.channel}
        </span>
        <div className="flex items-center gap-2">
          <motion.button whileTap={{ scale: 0.9 }}
            onClick={e => { e.stopPropagation(); }}
            className="p-1.5 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all"
            aria-label="Watch later"
          >
            <FiBookmark size={14} />
          </motion.button>
          <motion.a href={`https://youtube.com/watch?v=${video.id}`} target="_blank" rel="noopener noreferrer"
            whileTap={{ scale: 0.9 }} onClick={e => e.stopPropagation()}
            className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
            aria-label="Open on YouTube"
          >
            <FiExternalLink size={14} />
          </motion.a>
        </div>
      </div>
    </div>
  </motion.div>
);

const Videos = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [modalVideo, setModalVideo] = useState(null);

  const allVideos = [...ownChannelVideos, ...curatedVideos];

  const filtered = allVideos.filter(v => {
    const matchCat = activeCategory === 'All' || v.category === activeCategory;
    const matchSearch = !search.trim() ||
      v.title.toLowerCase().includes(search.toLowerCase()) ||
      v.channel.toLowerCase().includes(search.toLowerCase()) ||
      v.category.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A] py-10">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="inline-block px-3 py-1 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs font-bold rounded-full mb-3 uppercase tracking-wider border border-red-100 dark:border-red-800">
            🎬 YouTube Learning Center
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold font-poppins text-gray-900 dark:text-white mb-2">
            Educational <span className="gradient-text">Video Library</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
            Watch our <span className="text-yellow-600 dark:text-yellow-400 font-semibold">Rapid Revision Hub</span> videos and explore handpicked tutorials from top educators on YouTube.
          </p>
        </motion.div>

        {/* Our Channel Spotlight */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/10 dark:to-amber-900/10 rounded-2xl border border-yellow-200 dark:border-yellow-800/50 flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center flex-shrink-0 shadow-lg">
            <FiYoutube size={20} className="text-white" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-gray-900 dark:text-white text-sm">🔥 Subscribe to Rapid Revision Hub on YouTube!</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Quick revision videos for AKTU students. More topics dropping soon!</p>
          </div>
          <a href="https://www.youtube.com/@rapidrevisionhub-n5e" target="_blank" rel="noopener noreferrer"
            id="subscribe-youtube-btn"
            className="flex-shrink-0 px-4 py-2 bg-red-600 text-white text-xs font-bold rounded-xl hover:bg-red-700 transition-colors shadow-md"
          >
            Subscribe ▶
          </a>
        </motion.div>
      </section>

      {/* Search + Filter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-col sm:flex-row gap-4 mb-5">
          <div className="relative flex-1">
            <FiSearch size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text" id="video-search" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search videos by title, channel, or topic..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 px-4 rounded-2xl border border-gray-200 dark:border-gray-700 min-w-fit">
            <FiClock size={14} /> {filtered.length} videos
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map(cat => (
            <motion.button key={cat} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={() => setActiveCategory(cat)}
              id={`video-cat-${cat.toLowerCase().replace(/\W/g, '-')}`}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>
      </section>

      {/* Video Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-500 dark:text-gray-400">
            <div className="text-5xl mb-4">🎬</div>
            <p className="font-semibold text-gray-900 dark:text-white mb-1">No videos found</p>
            <p className="text-sm">Try a different search or category</p>
          </div>
        ) : (
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            <AnimatePresence>
              {filtered.map(video => (
                <VideoCard key={video.id} video={video} onClick={setModalVideo} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      {/* Video Modal Player */}
      <AnimatePresence>
        {modalVideo && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setModalVideo(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.85, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-gray-900 rounded-3xl overflow-hidden w-full max-w-3xl shadow-2xl"
              id="video-modal"
            >
              <div className="aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${modalVideo.id}?autoplay=1`}
                  title={modalVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <div className="p-4 flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-bold text-white text-sm leading-snug mb-1">{modalVideo.title}</h3>
                  <p className="text-gray-400 text-xs flex items-center gap-1">
                    <FiYoutube size={12} className="text-red-400" /> {modalVideo.channel}
                  </p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <a href={`https://youtube.com/watch?v=${modalVideo.id}`} target="_blank" rel="noopener noreferrer"
                    className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-xl flex items-center gap-1 transition-colors"
                  >
                    <FiYoutube size={14} /> YouTube
                  </a>
                  <button onClick={() => setModalVideo(null)}
                    className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white text-xs rounded-xl transition-colors"
                  >
                    ✕ Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Videos;
