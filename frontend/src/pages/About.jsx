import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FiTarget, FiHeart, FiGlobe, FiUsers, FiBook,
  FiArrowRight, FiGithub, FiLinkedin, FiMail,
  FiCheckCircle, FiZap, FiShield
} from 'react-icons/fi';

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: 'easeOut' },
});

const values = [
  {
    icon: FiTarget,
    title: 'Mission-Driven',
    description: 'Every feature we build is guided by a single goal — making quality education universally accessible.',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: FiHeart,
    title: 'Student-First',
    description: 'Designed by students, for students. We understand the challenges of modern learning firsthand.',
    color: 'from-rose-500 to-pink-600',
  },
  {
    icon: FiGlobe,
    title: 'Globally Inclusive',
    description: 'Built to serve learners across India and the world, with resources covering 20+ core subjects.',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    icon: FiShield,
    title: 'Trust & Privacy',
    description: 'Your data is protected with industry-standard encryption, JWT auth, and zero-data-selling policy.',
    color: 'from-purple-500 to-indigo-600',
  },
  {
    icon: FiZap,
    title: 'AI-Powered',
    description: 'Leveraging the power of AI to give every student a personalized, intelligent study companion.',
    color: 'from-amber-500 to-orange-600',
  },
  {
    icon: FiBook,
    title: 'Quality Content',
    description: 'Every resource and video is hand-curated by educators to ensure accuracy, depth, and relevance.',
    color: 'from-cyan-500 to-blue-500',
  },
];

const team = [
  {
    name: 'Praval',
    role: 'Founder & Full Stack Developer',
    bio: 'Passionate about bridging the gap between quality education and technology. Built EduConnect AI to democratize learning.',
    initials: 'P',
    color: 'from-blue-500 to-indigo-600',
    github: 'https://github.com/Praval07',
  },
];

const milestones = [
  { year: '2026', title: 'Project Inception', desc: 'EduConnect AI was conceptualized as an SDG 4 academic project to democratize learning.' },
  { year: '2026', title: 'MVP Launch', desc: 'First version launched with 12 curated study resources and 10 educational videos.' },
  { year: '2026', title: 'AI Integration', desc: 'ChatGPT-style AI Study Assistant added — answers questions on 20+ CS subjects.' },
  { year: 'Now', title: 'Growing Platform', desc: 'Open to students everywhere. Register free and help shape the future of EduConnect AI.' },
];

const sdgTargets = [
  'By 2030, ensure all girls and boys complete free, equitable and quality primary and secondary education',
  'Ensure equal access for all women and men to affordable and quality technical, vocational and tertiary education',
  'Substantially increase the number of youth and adults who have relevant skills for employment',
  'Eliminate gender disparities in education and ensure equal access to all levels of education',
  'Build and upgrade education facilities that are child, disability and gender sensitive',
];

const About = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative py-20 lg:py-28 gradient-hero">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-40 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl" />
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="sdg-badge mb-6 inline-flex">🎓 SDG 4 — Quality Education</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold font-poppins text-gray-900 dark:text-white leading-tight mb-6"
          >
            About <span className="gradient-text">EduConnect AI</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            We're on a mission to make quality education accessible to every student — regardless of location, background, or financial status. Powered by AI, guided by the United Nations SDG 4.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex flex-wrap gap-4 justify-center">
            <Link to="/register">
              <motion.span whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-2xl shadow-xl shadow-blue-500/30 hover:bg-blue-700 transition-all text-sm">
                Start Learning Free <FiArrowRight />
              </motion.span>
            </Link>
            <Link to="/contact">
              <motion.span whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-white font-semibold rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 transition-all text-sm">
                <FiMail size={15} /> Get in Touch
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Banner — honest numbers only */}
      <section className="bg-blue-600 py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
            {[
              { value: '12', label: 'Study Resources', note: 'Curated & growing' },
              { value: '10', label: 'Educational Videos', note: 'Hand-picked tutorials' },
              { value: '20+', label: 'Subjects Covered', note: 'CS & beyond' },
              { value: '0', label: 'Students Registered', note: 'Be the first!' },
            ].map((stat, i) => (
              <motion.div key={stat.label} {...fadeIn(i * 0.1)}>
                <div className="text-3xl font-bold font-poppins mb-0.5">{stat.value}</div>
                <div className="text-blue-100 text-sm font-medium">{stat.label}</div>
                <div className="text-blue-300 text-xs mt-0.5">{stat.note}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white dark:bg-gray-900/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <motion.div {...fadeIn()}>
              <span className="inline-block px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-semibold rounded-full mb-4 uppercase tracking-wider">
                Our Story
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-poppins text-gray-900 dark:text-white mb-5 leading-tight">
                Why We Built <span className="gradient-text">EduConnect AI</span>
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                <p>
                  EduConnect AI was born from a simple observation: millions of students struggle to access quality educational resources, personalized guidance, and interactive learning tools — not because they lack the drive to learn, but because the right tools aren't available to them.
                </p>
                <p>
                  We set out to build a platform that combines the best of Coursera, Khan Academy, and ChatGPT into a single, free, student-first platform aligned with the UN's Sustainable Development Goal 4 — Quality Education for All.
                </p>
                <p>
                  EduConnect AI is a new platform — built with real passion, real code, and a real commitment to SDG 4. It currently offers 12 curated study resources, 10 handpicked educational videos across 20+ CS subjects, and an AI study assistant available 24/7. Everything is free.
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                {['Free Forever', 'No Ads', 'Open to All', 'AI-Powered', 'Community-Driven'].map(tag => (
                  <span key={tag} className="flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1.5 rounded-full font-medium">
                    <FiCheckCircle size={12} /> {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Visual Timeline */}
            <motion.div {...fadeIn(0.2)} className="relative">
              <div className="space-y-4">
                {milestones.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    className="flex gap-4 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-md border border-gray-100 dark:border-gray-700"
                  >
                    <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold font-poppins shadow-lg">
                      {m.year}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{m.title}</h3>
                      <p className="text-gray-500 dark:text-gray-400 text-xs mt-0.5 leading-relaxed">{m.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-[#F8FAFC] dark:bg-[#0F172A]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn()} className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold font-poppins text-gray-900 dark:text-white mb-3">
              What We <span className="gradient-text">Stand For</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto text-sm">
              Our values aren't just words — they're built into every feature, every design decision, and every line of code.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="bg-white dark:bg-gray-800/50 rounded-2xl p-6 shadow-md border border-gray-100 dark:border-gray-700/50"
                >
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${v.color} flex items-center justify-center mb-4 shadow-lg`}>
                    <Icon size={20} className="text-white" />
                  </div>
                  <h3 className="font-semibold font-poppins text-gray-900 dark:text-white mb-2">{v.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{v.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white dark:bg-gray-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeIn()} className="mb-12">
            <h2 className="text-3xl font-bold font-poppins text-gray-900 dark:text-white mb-3">
              Meet the <span className="gradient-text">Team</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Passionate individuals building tools that make education better for everyone.
            </p>
          </motion.div>
          <div className="flex justify-center">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 max-w-sm w-full"
              >
                <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center text-white text-3xl font-bold font-poppins mx-auto mb-5 shadow-xl`}>
                  {member.initials}
                </div>
                <h3 className="font-bold font-poppins text-gray-900 dark:text-white text-lg mb-1">{member.name}</h3>
                <p className="text-blue-600 dark:text-blue-400 text-sm font-medium mb-3">{member.role}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-5">{member.bio}</p>
                <div className="flex justify-center gap-3">
                  <a href={member.github} target="_blank" rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 hover:bg-blue-600 hover:text-white transition-all">
                    <FiGithub size={16} />
                  </a>
                  <a href="#" className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 hover:bg-blue-600 hover:text-white transition-all">
                    <FiLinkedin size={16} />
                  </a>
                  <a href="#" className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 hover:bg-blue-600 hover:text-white transition-all">
                    <FiMail size={16} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SDG 4 Section */}
      <section className="py-20 bg-[#F8FAFC] dark:bg-[#0F172A]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeIn()}>
              <span className="sdg-badge mb-5 inline-flex">🎓 UN SDG 4</span>
              <h2 className="text-3xl font-bold font-poppins text-gray-900 dark:text-white mb-4 leading-tight">
                Our Commitment to{' '}
                <span className="gradient-text">Quality Education</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-5">
                The United Nations Sustainable Development Goal 4 aims to "ensure inclusive and equitable quality education and promote lifelong learning opportunities for all" by 2030. EduConnect AI is our contribution toward achieving this goal.
              </p>
              <div className="space-y-2.5">
                {sdgTargets.map((target, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400"
                  >
                    <FiCheckCircle size={15} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>{target}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div {...fadeIn(0.2)}>
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-2xl shadow-blue-500/20">
                <div className="text-6xl font-bold font-poppins mb-2">SDG</div>
                <div className="text-5xl font-bold font-poppins text-blue-200 mb-5">4</div>
                <h3 className="text-xl font-bold mb-3">Quality Education</h3>
                <p className="text-blue-200 text-sm leading-relaxed mb-6">
                  "Education is the most powerful weapon you can use to change the world." — Nelson Mandela
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: FiBook, label: '12 Resources' },
                    { icon: FiUsers, label: '0 Students (so far)' },
                    { icon: FiGlobe, label: 'Global Access' },
                    { icon: FiHeart, label: 'Always Free' },
                  ].map(item => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label} className="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2">
                        <Icon size={14} className="text-blue-200" />
                        <span className="text-xs text-white font-medium">{item.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        </div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div {...fadeIn()}>
            <h2 className="text-3xl font-bold font-poppins text-white mb-4">
              Ready to Join Our Mission?
            </h2>
            <p className="text-blue-200 mb-7 text-sm">
              Register free and be among the first students on EduConnect AI.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/register" id="about-cta-register">
                <motion.span whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-blue-700 font-bold rounded-2xl shadow-2xl hover:bg-blue-50 transition-all text-sm">
                  Get Started Free <FiArrowRight />
                </motion.span>
              </Link>
              <Link to="/contact" id="about-cta-contact">
                <motion.span whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 text-white font-bold rounded-2xl border border-white/20 hover:bg-white/20 transition-all text-sm">
                  <FiMail size={15} /> Contact Us
                </motion.span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
