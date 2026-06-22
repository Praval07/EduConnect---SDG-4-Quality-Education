import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiArrowRight, FiBook, FiVideo, FiMessageSquare, FiUsers,
  FiCheckCircle, FiZap, FiShield, FiGlobe, FiTrendingUp
} from 'react-icons/fi';
import AnimatedCounter from '../components/AnimatedCounter';

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: 'easeOut' },
});

const stats = [
  { value: 12, label: 'Study Resources', suffix: '', icon: FiBook, color: 'text-blue-600', note: 'Curated & growing' },
  { value: 10, label: 'Educational Videos', suffix: '', icon: FiVideo, color: 'text-emerald-600', note: 'Hand-picked tutorials' },
  { value: 20, label: 'Subjects Covered', suffix: '+', icon: FiTrendingUp, color: 'text-amber-600', note: 'CS & beyond' },
  { value: 0, label: 'Students Registered', suffix: '', icon: FiUsers, color: 'text-purple-600', note: 'Be the first!' },
];

const features = [
  {
    icon: FiBook,
    title: 'Premium Study Materials',
    description: 'Access curated notes, PDFs, slides and resources across 20+ subjects — from DSA to Web Development.',
    color: 'from-blue-500 to-blue-600',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    to: '/study-materials',
  },
  {
    icon: FiVideo,
    title: 'Educational Videos',
    description: 'Watch handpicked YouTube tutorials from top educators. Search, filter, and save videos for later.',
    color: 'from-emerald-500 to-emerald-600',
    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    to: '/videos',
  },
  {
    icon: FiMessageSquare,
    title: 'AI Study Assistant',
    description: 'ChatGPT-style AI assistant that explains concepts, creates study plans, and answers all your academic questions.',
    color: 'from-purple-500 to-purple-600',
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    to: '/ai-assistant',
  },
  {
    icon: FiTrendingUp,
    title: 'Progress Tracking',
    description: 'Monitor your learning journey with a personalized dashboard showing resources downloaded, videos watched, and AI sessions.',
    color: 'from-amber-500 to-amber-600',
    bg: 'bg-amber-50 dark:bg-amber-900/20',
    to: '/dashboard',
  },
  {
    icon: FiShield,
    title: 'Secure & Private',
    description: 'JWT-authenticated accounts, secure data storage, and privacy-first design to protect your learning journey.',
    color: 'from-red-500 to-red-600',
    bg: 'bg-red-50 dark:bg-red-900/20',
    to: '/profile',
  },
  {
    icon: FiGlobe,
    title: 'SDG 4 Aligned',
    description: 'Committed to the UN Sustainable Development Goal 4: ensuring inclusive and equitable quality education for all.',
    color: 'from-teal-500 to-teal-600',
    bg: 'bg-teal-50 dark:bg-teal-900/20',
    to: '/about-sdg',
  },
];

const faqs = [
  {
    q: 'Is Rapid Revision Hub free to use?',
    a: 'Yes! Rapid Revision Hub is completely free for students. Create an account and get immediate access to all study materials, videos, and the AI assistant.',
  },
  {
    q: 'What subjects does Rapid Revision Hub cover?',
    a: 'We cover 20+ subjects including DSA, DBMS, OS, Computer Networks, Web Development (React, Node.js, MongoDB), Python, JavaScript, and more.',
  },
  {
    q: 'How does the AI Study Assistant work?',
    a: 'Our AI assistant uses advanced natural language processing to understand your questions and provide detailed, structured explanations with code examples and study tips.',
  },
  {
    q: 'Can I download study materials offline?',
    a: 'Yes! All PDF notes and resources can be downloaded for offline use. Simply click the download button on any resource card.',
  },
  {
    q: 'Is my data secure?',
    a: 'Absolutely. We use JWT authentication, bcrypt password hashing, and follow industry-standard security practices to protect your account and data.',
  },
];

const FAQItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      className="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden"
      whileHover={{ borderColor: '#2563EB' }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors"
        id={`faq-${q.substring(0, 20).replace(/\s/g, '-')}`}
      >
        <span className="font-medium text-gray-900 dark:text-white pr-4">{q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          className="text-blue-600 text-xl font-light flex-shrink-0"
        >
          +
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0 }}
        style={{ overflow: 'hidden' }}
      >
        <p className="px-5 pb-5 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
          {a}
        </p>
      </motion.div>
    </motion.div>
  );
};

import { useState } from 'react';

const Landing = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center gradient-hero">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-40 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Center Content */}
            <div className="lg:col-span-2 text-center max-w-3xl mx-auto">
              <motion.div {...fadeIn(0)} className="mb-6 flex justify-center">
                <span className="sdg-badge">🎓 SDG 4 — Quality Education</span>
              </motion.div>

              <motion.h1
                {...fadeIn(0.1)}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold font-poppins text-gray-900 dark:text-white leading-tight mb-6"
              >
                Rapid Revision{' '}
                <span className="gradient-text">Hub</span>
              </motion.h1>

              <motion.p
                {...fadeIn(0.2)}
                className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-8 max-w-2xl mx-auto font-medium"
              >
                Access handwritten notes, important questions, formulas, educational videos, AI-powered study assistance, and revision resources for engineering and competitive exams.
              </motion.p>

              <motion.div {...fadeIn(0.3)} className="flex flex-wrap justify-center gap-4 mb-10">
                <Link to="/register" id="hero-start-learning">
                  <motion.span
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold rounded-2xl shadow-xl shadow-purple-500/25 hover:opacity-95 transition-all text-sm cursor-pointer"
                  >
                    Start Learning
                    <FiArrowRight size={16} />
                  </motion.span>
                </Link>
                <Link to="/study-materials" id="hero-explore">
                  <motion.span
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#0F172A] text-white font-semibold rounded-2xl shadow-lg border border-purple-500/30 hover:border-purple-400 transition-all text-sm cursor-pointer"
                  >
                    Explore Resources
                  </motion.span>
                </Link>
                <a href="https://www.linkedin.com/in/praval-saxena-287214311/" target="_blank" rel="noopener noreferrer" id="hero-linkedin">
                  <motion.span
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#0077B5] text-white font-semibold rounded-2xl shadow-lg hover:bg-[#006097] transition-all text-sm cursor-pointer"
                  >
                    Connect on LinkedIn
                  </motion.span>
                </a>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div {...fadeIn(0.4)} className="flex flex-wrap justify-center items-center gap-6">
                {[
                  { icon: '✅', text: 'Free Forever' },
                  { icon: '🔒', text: 'Secure & Private' },
                  { icon: '🎓', text: 'SDG 4 Certified' },
                ].map(item => (
                  <div key={item.text} className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <span>{item.icon}</span>
                    <span>{item.text}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn()} className="text-center mb-10">
            <span className="inline-block px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-semibold rounded-full uppercase tracking-wider">
              By the Numbers
            </span>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">Real numbers. No fake claims.</p>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gray-50 dark:bg-gray-800 mb-3 ${stat.color}`}>
                    <Icon size={22} />
                  </div>
                  <div className="text-4xl font-bold font-poppins text-gray-900 dark:text-white mb-1">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 text-sm font-medium">{stat.label}</div>
                  {stat.note && <div className="text-gray-400 text-xs mt-0.5">{stat.note}</div>}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#F8FAFC] dark:bg-[#0F172A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn()} className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-semibold rounded-full mb-4">
              Everything You Need
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-poppins text-gray-900 dark:text-white mb-4">
              Premium Features Built for{' '}
              <span className="gradient-text">Modern Students</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              From AI-powered assistance to curated study materials — everything designed to make learning more effective and enjoyable.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <Link key={feature.title} to={feature.to} className="block group">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    whileHover={{ y: -6 }}
                    className="bg-[#0F172A] rounded-3xl p-6 shadow-lg shadow-black/30 border border-purple-500/10 hover:border-purple-500/30 cursor-pointer h-full"
                  >
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.color} mb-4 shadow-lg`}>
                      <Icon size={20} className="text-white" />
                    </div>
                    <h3 className="font-semibold font-poppins text-white mb-2 text-lg group-hover:text-purple-300 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Join the Mission — replaces fake testimonials */}
      <section className="py-20 bg-white dark:bg-gray-900/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn()} className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold font-poppins text-gray-900 dark:text-white mb-4">
              Why <span className="gradient-text">Rapid Revision Hub?</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto text-sm">
              Built to make quality education accessible to every student — free, honest, and powered by AI.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                emoji: '🤖',
                title: 'AI Study Assistant',
                desc: 'Ask anything about your syllabus. Get structured, markdown-formatted answers on DBMS, DSA, React, Python, OS, and more — instantly.',
                color: 'from-purple-500 to-blue-600',
              },
              {
                emoji: '📚',
                title: 'Curated Resources',
                desc: '12 hand-picked study resources covering DSA, Web Development, DBMS, OS, and Computer Networks. Quality over quantity.',
                color: 'from-blue-500 to-cyan-500',
              },
              {
                emoji: '🎥',
                title: 'YouTube Video Library',
                desc: '10 hand-picked educational videos from top instructors like Neso Academy, Abdul Bari, Dave Gray, and Traversy Media.',
                color: 'from-emerald-500 to-teal-600',
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-2xl mb-4 shadow-lg`}>
                  {item.emoji}
                </div>
                <h3 className="font-bold font-poppins text-gray-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Honest "Be First" CTA */}
          <motion.div
            {...fadeIn(0.2)}
            className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-3xl p-8 text-center border border-blue-100 dark:border-blue-800/50"
          >
            <div className="text-4xl mb-3">🚀</div>
            <h3 className="text-xl font-bold font-poppins text-gray-900 dark:text-white mb-2">
              Be Among the First Students
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-5 max-w-md mx-auto">
              Rapid Revision Hub is just getting started. Register now, explore the platform, and help shape its future. Your feedback matters.
            </p>
            <Link to="/register" id="mission-cta-register">
              <motion.span
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-7 py-3 bg-blue-600 text-white font-semibold rounded-2xl shadow-xl shadow-blue-500/30 hover:bg-blue-700 transition-all text-sm"
              >
                Join Free Now <FiArrowRight size={16} />
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-[#F8FAFC] dark:bg-[#0F172A]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn()} className="text-center mb-12">
            <h2 className="text-3xl font-bold font-poppins text-gray-900 dark:text-white mb-4">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
          </motion.div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <FAQItem q={faq.q} a={faq.a} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-blue-300/10 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div {...fadeIn()}>
            <h2 className="text-3xl sm:text-4xl font-bold font-poppins text-white mb-4">
              Ready to Transform Your Learning?
            </h2>
            <p className="text-blue-200 text-lg mb-8">
              Start learning today — free, honest, and AI-powered.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/register" id="cta-register">
                <motion.span
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-700 font-bold rounded-2xl shadow-2xl hover:bg-blue-50 transition-all"
                >
                  Get Started Free
                  <FiArrowRight />
                </motion.span>
              </Link>
              <Link to="/login">
                <motion.span
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-bold rounded-2xl border border-white/20 hover:bg-white/20 transition-all"
                >
                  Already have an account? Login
                </motion.span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
