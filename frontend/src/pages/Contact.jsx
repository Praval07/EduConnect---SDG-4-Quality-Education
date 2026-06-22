import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { FiUser, FiMail, FiMessageSquare, FiSend, FiCheckCircle, FiPhone, FiMapPin, FiLinkedin } from 'react-icons/fi';

const contactInfo = [
  { icon: FiMail, label: 'Email', value: 'rapidrevisionhub@gmail.com', href: 'mailto:rapidrevisionhub@gmail.com' },
  { icon: FiPhone, label: 'Phone', value: '7533828012', href: 'tel:7533828012' },
  { icon: FiLinkedin, label: 'LinkedIn', value: 'Praval Saxena', href: 'https://www.linkedin.com/in/praval-saxena-287214311/' },
  { icon: FiMapPin, label: 'Location', value: 'India · Serving Globally' },
];

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await axios.post('/api/contact', form);
      setSuccess(true);
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold font-poppins text-gray-900 dark:text-white mb-3">
          Get In <span className="gradient-text">Touch</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
          Have questions about Rapid Revision Hub? We'd love to hear from you. Send us a message and we'll respond within 24 hours.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-5 gap-8">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 space-y-5"
        >
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-7 text-white">
            <h2 className="text-xl font-bold font-poppins mb-2">Let's talk!</h2>
            <p className="text-blue-200 text-sm mb-7">
              Whether you have a question, feedback, or a collaboration idea — we're always open to a conversation.
            </p>
            <div className="space-y-4">
              {contactInfo.map(info => {
                const Icon = info.icon;
                const content = info.href ? (
                  <a href={info.href} target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-blue-200">
                    {info.value}
                  </a>
                ) : (
                  info.value
                );
                return (
                  <div key={info.label} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
                      <Icon size={16} className="text-blue-200" />
                    </div>
                    <div>
                      <p className="text-xs text-blue-300">{info.label}</p>
                      <p className="text-sm font-medium text-white">{content}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800/50 rounded-2xl p-5 shadow-md border border-gray-100 dark:border-gray-700/50">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm">SDG 4 — Our Mission</h3>
            <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">
              Rapid Revision Hub is committed to the United Nations Sustainable Development Goal 4: ensuring inclusive and equitable quality education and promoting lifelong learning opportunities for all by 2030.
            </p>
            <div className="mt-3">
              <span className="sdg-badge">🎓 SDG 4 — Quality Education</span>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-3 bg-white dark:bg-gray-800/50 rounded-3xl p-7 shadow-xl shadow-gray-100/80 dark:shadow-none border border-gray-100 dark:border-gray-700/50"
        >
          {success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-5"
              >
                <FiCheckCircle size={36} className="text-emerald-600" />
              </motion.div>
              <h3 className="text-xl font-bold font-poppins text-gray-900 dark:text-white mb-2">Message Sent!</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                Thank you for reaching out! We'll get back to you within 24 hours.
              </p>
              <motion.button
                whileHover={{ scale: 1.03 }}
                onClick={() => setSuccess(false)}
                className="px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-all"
              >
                Send Another Message
              </motion.button>
            </motion.div>
          ) : (
            <>
              <h2 className="text-lg font-bold font-poppins text-gray-900 dark:text-white mb-6">Send us a message</h2>

              {error && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 text-sm rounded-xl px-4 py-3 mb-5">
                  {error}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Full Name *</label>
                    <div className="relative">
                      <FiUser size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text" id="contact-name" required value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email Address *</label>
                    <div className="relative">
                      <FiMail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="email" id="contact-email" required value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        placeholder="you@example.com"
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Subject *</label>
                  <div className="relative">
                    <FiMessageSquare size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text" id="contact-subject" required value={form.subject}
                      onChange={e => setForm({ ...form, subject: e.target.value })}
                      placeholder="How can we help you?"
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Message *</label>
                  <textarea
                    id="contact-message" required rows={5}
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about your question or feedback in detail..."
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  id="contact-submit"
                  disabled={loading}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-blue-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-all disabled:opacity-60 text-sm"
                >
                  {loading ? (
                    <div className="flex gap-1.5">
                      {[0, 1, 2].map(i => (
                        <motion.div key={i} className="w-1.5 h-1.5 bg-white rounded-full"
                          animate={{ y: [-3, 3, -3] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }} />
                      ))}
                    </div>
                  ) : (
                    <><FiSend size={16} /> Send Message</>
                  )}
                </motion.button>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
