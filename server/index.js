// ============================================================
//  DR. GREGG LOMBARDO — NODE.JS BACKEND
//  server/index.js
// ============================================================

require('dotenv').config();

const express    = require('express');
const nodemailer = require('nodemailer');
const path       = require('path');
const rateLimit  = require('express-rate-limit');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── MIDDLEWARE ──────────────────────────────────────────────
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Rate limit the contact form endpoint (max 5 submissions per IP per 15 min)
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Too many requests. Please try again later.' },
});

// ── EMAIL TRANSPORT ─────────────────────────────────────────
// Supports any SMTP provider (Gmail, SendGrid, etc.)
// Set credentials in your .env file — see .env.example
const transporter = nodemailer.createTransport({
  host:   process.env.SMTP_HOST,
  port:   Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true',  // true for port 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// ── CONTACT FORM ENDPOINT ───────────────────────────────────
app.post('/api/contact', contactLimiter, async (req, res) => {
  const { firstName, lastName, phone, email, procedure, message } = req.body;

  // Server-side validation
  if (!firstName || !lastName || !phone) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  // Sanitize inputs (strip HTML tags)
  const sanitize = (str = '') => str.replace(/<[^>]*>/g, '').trim();

  const safeFirst     = sanitize(firstName);
  const safeLast      = sanitize(lastName);
  const safePhone     = sanitize(phone);
  const safeEmail     = sanitize(email);
  const safeProcedure = sanitize(procedure);
  const safeMessage   = sanitize(message);

  const submittedAt = new Date().toLocaleString('en-US', {
    timeZone: 'America/New_York',
    dateStyle: 'full',
    timeStyle: 'short',
  });

  // ── Email to the office ──
  const officeMailOptions = {
    from:    `"Website Contact Form" <${process.env.SMTP_USER}>`,
    to:      process.env.OFFICE_EMAIL || 'info@drgregglombardo.com',
    subject: `New Appointment Request — ${safeFirst} ${safeLast}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; color: #333;">
        <div style="background:#0d1b2a; padding: 24px 32px; border-bottom: 3px solid #b89a5e;">
          <h2 style="margin:0; color:#fff; font-size:1.2rem; font-weight:400;">
            New Appointment Request
          </h2>
          <p style="margin:4px 0 0; color:#b89a5e; font-size:0.8rem; letter-spacing:0.1em; text-transform:uppercase;">
            Dr. Gregg Lombardo · Oral & Maxillofacial Surgery
          </p>
        </div>
        <div style="padding: 32px; background: #fafafa; border: 1px solid #eee;">
          <table style="width:100%; border-collapse:collapse;">
            <tr>
              <td style="padding:10px 0; border-bottom:1px solid #eee; color:#888; font-size:0.8rem; width:160px; text-transform:uppercase; letter-spacing:0.08em;">Patient Name</td>
              <td style="padding:10px 0; border-bottom:1px solid #eee; font-weight:bold;">${safeFirst} ${safeLast}</td>
            </tr>
            <tr>
              <td style="padding:10px 0; border-bottom:1px solid #eee; color:#888; font-size:0.8rem; text-transform:uppercase; letter-spacing:0.08em;">Phone</td>
              <td style="padding:10px 0; border-bottom:1px solid #eee;">${safePhone}</td>
            </tr>
            <tr>
              <td style="padding:10px 0; border-bottom:1px solid #eee; color:#888; font-size:0.8rem; text-transform:uppercase; letter-spacing:0.08em;">Email</td>
              <td style="padding:10px 0; border-bottom:1px solid #eee;">${safeEmail || '—'}</td>
            </tr>
            <tr>
              <td style="padding:10px 0; border-bottom:1px solid #eee; color:#888; font-size:0.8rem; text-transform:uppercase; letter-spacing:0.08em;">Procedure</td>
              <td style="padding:10px 0; border-bottom:1px solid #eee;">${safeProcedure || '—'}</td>
            </tr>
            <tr>
              <td style="padding:10px 0; color:#888; font-size:0.8rem; text-transform:uppercase; letter-spacing:0.08em; vertical-align:top;">Message</td>
              <td style="padding:10px 0; white-space: pre-wrap;">${safeMessage || '—'}</td>
            </tr>
          </table>
        </div>
        <div style="padding:16px 32px; background:#f0f0f0; font-size:0.75rem; color:#999;">
          Submitted ${submittedAt} via drgregglombardo.com
        </div>
      </div>
    `,
  };

  // ── Auto-reply to patient (if email provided) ──
  const patientMailOptions = safeEmail ? {
    from:    `"Dr. Gregg Lombardo's Office" <${process.env.SMTP_USER}>`,
    to:      safeEmail,
    subject: 'We received your appointment request',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 560px; color: #333;">
        <div style="background:#0d1b2a; padding:24px 32px; border-bottom:3px solid #b89a5e;">
          <h2 style="margin:0; color:#fff; font-size:1.1rem; font-weight:400;">
            Thank you, ${safeFirst}.
          </h2>
        </div>
        <div style="padding:32px; background:#fafafa; border:1px solid #eee; line-height:1.7;">
          <p>We've received your request and a member of our team will be in touch with you shortly to schedule your appointment.</p>
          <p style="margin-top:16px;">If you need to reach us sooner, please call our office directly:</p>
          <p style="margin-top:12px; font-size:1.1rem; font-weight:bold; color:#0d1b2a;">(910) 762-1555</p>
          <p style="margin-top:4px; font-size:0.85rem; color:#888;">Monday – Thursday: 9am – 4pm</p>
        </div>
        <div style="padding:16px 32px; background:#f0f0f0; font-size:0.75rem; color:#999;">
          Gregg A. Lombardo, DDS · 1510 Medical Center Drive, Wilmington, NC 28401
        </div>
      </div>
    `,
  } : null;

  try {
    await transporter.sendMail(officeMailOptions);
    if (patientMailOptions) {
      await transporter.sendMail(patientMailOptions);
    }
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Email send error:', err);
    return res.status(500).json({ error: 'Failed to send email.' });
  }
});

// ── FALLBACK — serve index.html for any unmatched route ─────
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// ── START ────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅  Server running at http://localhost:${PORT}`);
});
