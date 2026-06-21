const Contact = require('../models/Contact');
const memoryDb = require('../utils/memoryDb');

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
const submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    if (!memoryDb.isDbConnected()) {
      const contact = {
        _id: 'contact_' + Date.now(),
        name,
        email,
        subject,
        message,
        createdAt: new Date(),
      };
      memoryDb.mockContacts.push(contact);
      return res.status(201).json({
        success: true,
        message: 'Your message has been sent successfully! We will get back to you within 24 hours (Mock Mode).',
        contact,
      });
    }

    const contact = await Contact.create({ name, email, subject, message });

    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully! We will get back to you within 24 hours.',
      contact,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { submitContact };
