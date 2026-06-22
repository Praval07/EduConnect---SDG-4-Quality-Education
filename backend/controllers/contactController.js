const Contact = require('../models/Contact');
const memoryDb = require('../utils/memoryDb');
const nodemailer = require('nodemailer');

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
const submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    let contact;
    if (!memoryDb.isDbConnected()) {
      contact = {
        _id: 'contact_' + Date.now(),
        name,
        email,
        subject,
        message,
        createdAt: new Date(),
      };
      memoryDb.mockContacts.push(contact);
    } else {
      contact = await Contact.create({ name, email, subject, message });
    }

    // Try to send email using Nodemailer
    try {
      const emailUser = process.env.EMAIL_USER;
      const emailPass = process.env.EMAIL_PASS;

      if (emailUser && emailPass) {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: emailUser,
            pass: emailPass,
          },
        });

        const mailOptions = {
          from: email,
          to: 'rapidrevisionhub@gmail.com',
          subject: `Rapid Revision Hub Contact: ${subject}`,
          text: `New contact submission:\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
        };

        await transporter.sendMail(mailOptions);
        console.log(`✉️ Contact email successfully sent from ${email}`);
      } else {
        console.log('⚠️ Nodemailer credentials (EMAIL_USER/EMAIL_PASS) are not configured. Email send skipped.');
      }
    } catch (emailError) {
      console.error('❌ Nodemailer email sending failed:', emailError.message);
    }

    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully. We will get back to you soon.',
      contact,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { submitContact };
