import { Link } from 'react-router-dom';
import { FiGithub, FiTwitter, FiLinkedin, FiInstagram, FiMail, FiHeart } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-gray-900 dark:bg-[#0a0f1a] text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-emerald-500 flex items-center justify-center shadow-lg">
                <span className="text-white text-lg font-bold font-poppins">E</span>
              </div>
              <div>
                <span className="text-xl font-bold font-poppins gradient-text">EduConnect</span>
                <span className="text-xl font-bold text-white"> AI</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              Empowering quality education through technology. Aligned with the United Nations Sustainable Development Goal 4 — Quality Education for All.
            </p>
            <div className="flex items-center gap-1 mb-4">
              <span className="sdg-badge">🎓 SDG 4</span>
              <span className="text-xs text-gray-500 ml-2">Quality Education</span>
            </div>
            <div className="flex gap-3">
              {[
                { Icon: FiGithub, href: 'https://github.com/Praval07', label: 'GitHub' },
                { Icon: FiTwitter, href: '#', label: 'Twitter' },
                { Icon: FiLinkedin, href: '#', label: 'LinkedIn' },
                { Icon: FiInstagram, href: '#', label: 'Instagram' },
              ].map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -2 }}
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-blue-600 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200"
                  aria-label={label}
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold font-poppins text-white mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2.5">
              {[
                { to: '/', label: 'Home' },
                { to: '/about', label: 'About Us' },
                { to: '/dashboard', label: 'Dashboard' },
                { to: '/materials', label: 'Study Materials' },
                { to: '/videos', label: 'Educational Videos' },
                { to: '/ai-assistant', label: 'AI Study Assistant' },
                { to: '/contact', label: 'Contact Us' },
              ].map(link => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-blue-400 text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-blue-500 group-hover:w-2 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SDG 4 Info */}
          <div>
            <h3 className="font-semibold font-poppins text-white mb-4 text-sm uppercase tracking-wider">SDG 4 — Quality Education</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all by 2030.
            </p>
            <ul className="space-y-2">
              {[
                'Free & Inclusive Learning',
                'Digital Literacy',
                'Skill Development',
                'Lifelong Learning',
                'Equal Access to Education',
              ].map(item => (
                <li key={item} className="flex items-center gap-2 text-sm text-gray-400">
                  <span className="text-emerald-400">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold font-poppins text-white mb-4 text-sm uppercase tracking-wider">Get In Touch</h3>
            <p className="text-gray-400 text-sm mb-4">
              Have questions about EduConnect AI? We'd love to hear from you.
            </p>
            <a
              href="mailto:support@educonnect.ai"
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm transition-colors mb-6"
            >
              <FiMail size={14} />
              support@educonnect.ai
            </a>
            <Link to="/contact">
              <motion.span
                whileHover={{ scale: 1.03 }}
                className="inline-block px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/20"
              >
                Send Message
              </motion.span>
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm flex items-center gap-1.5">
            © 2024 EduConnect AI. Made with <FiHeart size={12} className="text-red-400" fill="currentColor" /> for SDG 4
          </p>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
