const nodemailer = require('nodemailer');
const ContactMessage = require('../models/ContactMessage');
const { getIsConnected } = require('../config/db');

let inMemoryMessages = [];

// Helper to get credentials & receiver email with fallback variable names
const getEmailConfig = () => {
  const mailHost = process.env.MAIL_HOST || 'smtp.gmail.com';
  const mailPort = parseInt(process.env.MAIL_PORT || '587', 10);
  const mailUser = process.env.MAIL_USER;
  const mailPass = process.env.MAIL_PASSWORD || process.env.MAIL_PASS;
  
  const receiverEmail = process.env.RECEIVER_EMAIL || process.env.CONTACT_RECEIVER_EMAIL;
  const receiverEmail2 = process.env.CONTACT_RECEIVER_EMAIL_2;

  const receivers = [receiverEmail, receiverEmail2].filter(Boolean).join(', ');

  return {
    mailHost,
    mailPort,
    mailUser,
    mailPass,
    receivers,
    isConfigured: Boolean(mailUser && mailPass && mailPass !== 'your_gmail_app_password_here')
  };
};

// ─── Nodemailer Transporter ──────────────────────────────────────────────────
const createTransporter = () => {
  const { mailHost, mailPort, mailUser, mailPass } = getEmailConfig();
  return nodemailer.createTransport({
    host: mailHost,
    port: mailPort,
    secure: mailPort === 465, // true for port 465, false for 587 (STARTTLS)
    auth: {
      user: mailUser,
      pass: mailPass,
    },
  });
};

// ─── Transporter Startup Verification ────────────────────────────────────────
const verifySMTPTransporter = async () => {
  const config = getEmailConfig();
  console.log(`[SMTP] Checking configuration...`);
  console.log(`[SMTP] MAIL_USER CONFIGURED: ${Boolean(config.mailUser)}`);
  console.log(`[SMTP] MAIL_PASSWORD CONFIGURED: ${config.isConfigured}`);
  console.log(`[SMTP] RECEIVER EMAIL: ${config.receivers || 'None'}`);

  if (!config.isConfigured) {
    console.warn('⚠️  [SMTP Warning] Email credentials not set or using placeholder in server/.env.');
    console.warn('    To send real emails, set MAIL_USER and MAIL_PASSWORD (Gmail App Password) in server/.env');
    return false;
  }

  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log('✅ [SMTP VERIFY: SUCCESS] Transporter connection verified and ready to send emails.');
    return true;
  } catch (err) {
    console.error('❌ [SMTP VERIFY: ERROR] Failed to connect to SMTP server:', err.message);
    return false;
  }
};

// ─── Email HTML Template ─────────────────────────────────────────────────────
const buildEmailHTML = (payload) => {
  const { name, email, phone, service, subject, message, createdAt } = payload;
  const dateStr = new Date(createdAt).toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'short',
  });

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; background: #f8fafc; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 32px auto; background: #fff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; }
    .header { background: #4f46e5; padding: 28px 32px; color: white; }
    .header h1 { margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.3px; }
    .header p { margin: 6px 0 0; font-size: 13px; opacity: 0.8; }
    .body { padding: 28px 32px; }
    .field { margin-bottom: 18px; }
    .label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #6366f1; margin-bottom: 5px; }
    .value { font-size: 15px; color: #0f172a; font-weight: 500; line-height: 1.5; }
    .message-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 16px; font-size: 14px; color: #334155; line-height: 1.7; white-space: pre-wrap; }
    .footer { background: #f1f5f9; padding: 16px 32px; font-size: 12px; color: #64748b; text-align: center; border-top: 1px solid #e2e8f0; }
    .divider { height: 1px; background: #e2e8f0; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📬 New Contact Form Submission</h1>
      <p>DuoVerse — Website Project Inquiry</p>
    </div>
    <div class="body">
      <div class="field">
        <div class="label">Client Name</div>
        <div class="value">${name}</div>
      </div>
      <div class="field">
        <div class="label">Email Address</div>
        <div class="value"><a href="mailto:${email}" style="color:#4f46e5;text-decoration:none;">${email}</a></div>
      </div>
      ${phone ? `
      <div class="field">
        <div class="label">Phone Number</div>
        <div class="value">${phone}</div>
      </div>
      ` : ''}
      ${service ? `
      <div class="field">
        <div class="label">Selected Service</div>
        <div class="value">${service}</div>
      </div>
      ` : ''}
      <div class="field">
        <div class="label">Subject</div>
        <div class="value">${subject}</div>
      </div>
      <div class="divider"></div>
      <div class="field">
        <div class="label">Message</div>
        <div class="message-box">${message}</div>
      </div>
      <div class="divider"></div>
      <div class="field">
        <div class="label">Submission Date / Time</div>
        <div class="value" style="font-size:13px;color:#64748b;">${dateStr}</div>
      </div>
    </div>
    <div class="footer">
      This email was generated by DuoVerse Contact Form.<br />
      Click <strong>Reply</strong> to email the client directly at <strong>${email}</strong>.
    </div>
  </div>
</body>
</html>`;
};

// ─── Send Email Helper ────────────────────────────────────────────────────────
const sendContactEmail = async (payload) => {
  const config = getEmailConfig();

  console.log('--- CONTACT API EMAIL TASK ---');
  console.log(`EMAIL USER CONFIGURED: ${Boolean(config.mailUser)}`);
  console.log(`RECEIVER CONFIGURED: ${Boolean(config.receivers)}`);

  if (!config.isConfigured) {
    console.warn('[Email] Credentials missing or unconfigured in .env');
    throw new Error('Email credentials are not configured on the server.');
  }

  if (!config.receivers) {
    console.warn('[Email] Receiver email not set in .env');
    throw new Error('Receiver email address is not configured on the server.');
  }

  const transporter = createTransporter();
  
  // Verify SMTP before sending
  await transporter.verify();
  console.log('SMTP VERIFY: SUCCESS');

  const info = await transporter.sendMail({
    from: `"DuoVerse" <${config.mailUser}>`,
    to: config.receivers,
    replyTo: payload.email,
    subject: `New Project Inquiry — DuoVerse (${payload.name})`,
    html: buildEmailHTML(payload),
    text: `New Contact Form Submission\n\nName: ${payload.name}\nEmail: ${payload.email}\nPhone: ${payload.phone || 'N/A'}\nService: ${payload.service || 'N/A'}\nSubject: ${payload.subject}\nMessage: ${payload.message}\nDate: ${new Date(payload.createdAt).toLocaleString()}`
  });

  console.log('EMAIL SEND: SUCCESS');
  console.log(`MESSAGE ID: ${info.messageId}`);

  return info;
};

// ─── Controllers ──────────────────────────────────────────────────────────────

// @desc    Submit a contact form message
// @route   POST /api/contact
// @access  Public
exports.submitContact = async (req, res) => {
  console.log('CONTACT API HIT');
  try {
    const { name, email, phone, service, subject, message } = req.body;

    // Server-side validation
    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Please enter your name.' });
    }
    if (!email || !email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({ success: false, message: 'Please enter a valid email address.' });
    }
    if (!message || message.trim().length < 5) {
      return res.status(400).json({ success: false, message: 'Please enter a detailed message (at least 5 characters).' });
    }

    const payload = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : '',
      service: service ? service.trim() : '',
      subject: (subject && subject.trim()) || 'New Website Inquiry',
      message: message.trim(),
      createdAt: new Date(),
    };

    // 1. Save to DB or memory
    if (getIsConnected()) {
      await ContactMessage.create(payload);
    } else {
      inMemoryMessages.push({ id: `msg-${Date.now()}`, ...payload });
    }

    // 2. Send real email via SMTP
    try {
      await sendContactEmail(payload);
      return res.status(200).json({
        success: true,
        message: 'Message sent successfully!',
      });
    } catch (emailErr) {
      console.error('❌ [Email Send Failure]:', emailErr.message);
      return res.status(500).json({
        success: false,
        message: 'Unable to send your message. Please try again.',
      });
    }
  } catch (error) {
    console.error('❌ [Contact API Exception]:', error);
    return res.status(500).json({
      success: false,
      message: 'Unable to send your message. Please try again.',
    });
  }
};

// @desc    Get all submitted contact messages
// @route   GET /api/contact
// @access  Public (internal/admin)
exports.getContactMessages = async (req, res) => {
  try {
    if (getIsConnected()) {
      const messages = await ContactMessage.find().sort({ createdAt: -1 });
      return res.status(200).json({ success: true, count: messages.length, data: messages });
    }
    return res.status(200).json({ success: true, count: inMemoryMessages.length, data: inMemoryMessages, source: 'in-memory' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to retrieve messages', error: error.message });
  }
};

exports.verifySMTPTransporter = verifySMTPTransporter;
