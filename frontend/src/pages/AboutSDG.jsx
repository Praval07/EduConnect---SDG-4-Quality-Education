import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiCheckCircle, FiArrowRight, FiGlobe, FiBook, FiUsers, FiTarget, FiHeart } from 'react-icons/fi';

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: 'easeOut' },
});

const sdgTargets = [
  { number: '4.1', text: 'Ensure all girls and boys complete free, equitable and quality primary and secondary education' },
  { number: '4.3', text: 'Ensure equal access for all to affordable and quality technical, vocational and tertiary education' },
  { number: '4.4', text: 'Substantially increase the number of youth and adults who have relevant skills for employment' },
  { number: '4.5', text: 'Eliminate gender disparities in education and ensure equal access to all levels' },
  { number: '4.6', text: 'Ensure that all youth and a substantial proportion of adults achieve literacy and numeracy' },
  { number: '4.7', text: 'Ensure all learners acquire knowledge and skills needed to promote sustainable development' },
];

const howWeAlign = [
  { icon: FiBook, title: 'Free Study Materials', desc: 'Curated notes, PDFs, and resources across 20+ subjects — free for every student.' },
  { icon: FiGlobe, title: 'Universal Access', desc: 'No fees, no barriers. Any student with internet access can use Rapid Revision Hub.' },
  { icon: FiUsers, title: 'Student-Centered Design', desc: 'Built by students, for students. Every feature answers a real need.' },
  { icon: FiTarget, title: 'Skills for Employment', desc: 'Web development, DSA, databases — skills that land jobs and build careers.' },
  { icon: FiHeart, title: 'Inclusive & Diverse', desc: 'Resources in formats accessible to all learning styles and backgrounds.' },
];

const AboutSDG = () => (
  <div className="overflow-hidden">
    {/* Hero */}
    <section className="relative py-20 lg:py-28 bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 text-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-yellow-300/10 rounded-full blur-3xl" />
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="inline-block px-4 py-1.5 bg-white/10 border border-white/20 text-yellow-300 font-bold text-sm rounded-full mb-5">
            🌍 United Nations SDG 4
          </span>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold font-poppins mb-6 leading-tight"
        >
          SDG 4 —{' '}
          <span className="text-yellow-300">Quality Education</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="text-blue-100 text-lg max-w-2xl mx-auto mb-8 leading-relaxed"
        >
          "Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all" — UN 2030 Agenda
        </motion.p>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex flex-wrap gap-4 justify-center">
          <Link to="/register" id="sdg-cta-register">
            <motion.span whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-400 text-gray-900 font-bold rounded-2xl shadow-xl hover:bg-yellow-300 transition-all text-sm"
            >
              Join Free <FiArrowRight />
            </motion.span>
          </Link>
          <a href="https://sdgs.un.org/goals/goal4" target="_blank" rel="noopener noreferrer" id="sdg-un-link">
            <motion.span whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 text-white font-medium rounded-2xl hover:bg-white/20 transition-all text-sm"
            >
              <FiGlobe size={16} /> UN SDG Website
            </motion.span>
          </a>
        </motion.div>
      </div>
    </section>

    {/* Stats Banner */}
    <section className="bg-yellow-400 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-gray-900">
          {[
            { value: 'SDG 4', label: 'UN Aligned Goal' },
            { value: '20+', label: 'Subjects Covered' },
            { value: '100%', label: 'Free Platform' },
            { value: '∞', label: 'Learning Potential' },
          ].map((s, i) => (
            <motion.div key={s.label} {...fadeIn(i * 0.1)}>
              <div className="text-3xl font-black font-poppins mb-1">{s.value}</div>
              <div className="text-gray-700 text-sm font-medium">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* What is SDG 4 */}
    <section className="py-20 bg-white dark:bg-gray-900/50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeIn()} className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold font-poppins text-gray-900 dark:text-white mb-4">
            What is <span className="gradient-text">SDG 4?</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm leading-relaxed">
            SDG 4 is the 4th of the 17 United Nations Sustainable Development Goals set in 2015. It calls on governments, organizations, and individuals to ensure inclusive, equitable, and quality education for all by 2030.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {sdgTargets.map((target, i) => (
            <motion.div key={target.number} {...fadeIn(i * 0.08)}
              className="flex gap-4 bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-md border border-gray-100 dark:border-gray-700"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-lg">
                {target.number}
              </div>
              <div>
                <FiCheckCircle size={14} className="text-emerald-500 mb-1.5" />
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{target.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* How Rapid Revision Hub Aligns */}
    <section className="py-20 bg-[#F8FAFC] dark:bg-[#0F172A]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeIn()} className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold font-poppins text-gray-900 dark:text-white mb-4">
            How <span className="gradient-text">Rapid Revision Hub</span> Aligns
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto text-sm">
            Every feature we build is guided by SDG 4. Here's how our platform directly contributes to the goal.
          </p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {howWeAlign.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div key={item.title} {...fadeIn(i * 0.1)} whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center mb-4 shadow-lg">
                  <Icon size={20} className="text-white" />
                </div>
                <h3 className="font-bold font-poppins text-gray-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-16 bg-gradient-to-br from-blue-600 to-indigo-700">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div {...fadeIn()}>
          <div className="text-5xl mb-4">🌍</div>
          <h2 className="text-3xl font-bold font-poppins text-white mb-4">Be Part of the SDG 4 Mission</h2>
          <p className="text-blue-200 mb-7 text-sm">Join Rapid Revision Hub and help us build a world where every student has access to quality education.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/register" id="sdg-bottom-cta">
              <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-700 font-bold rounded-2xl shadow-2xl hover:bg-yellow-50 transition-all"
              >
                Start Learning Free <FiArrowRight />
              </motion.span>
            </Link>
            <Link to="/about">
              <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-bold rounded-2xl border border-white/20 hover:bg-white/20 transition-all"
              >
                About Us
              </motion.span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  </div>
);

export default AboutSDG;
