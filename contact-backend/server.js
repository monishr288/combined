const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();

// In server.js, update CORS:
app.use(cors({
  origin: 'http://localhost:5173',  // ← CHANGE THIS
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create email transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Verify transporter connection
transporter.verify((error, success) => {
  if (error) {
    console.log('❌ Email service error:', error);
  } else {
    console.log('✅ Email service ready');
  }
});

// Contact Route - Simple and Direct
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and message'
      });
    }

    if (message.length < 10) {
      return res.status(400).json({
        success: false,
        message: 'Message should be at least 10 characters'
      });
    }

    // Email to you (admin)
    const adminMailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: `Portfolio Contact: ${subject || 'New Message'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>👤 Name:</strong> ${name}</p>
            <p><strong>📧 Email:</strong> ${email}</p>
            ${phone ? `<p><strong>📱 Phone:</strong> ${phone}</p>` : ''}
            ${subject ? `<p><strong>📝 Subject:</strong> ${subject}</p>` : ''}
            <p><strong>💬 Message:</strong></p>
            <p style="background: white; padding: 15px; border-left: 4px solid #3b82f6; margin: 10px 0;">
              ${message.replace(/\n/g, '<br>')}
            </p>
            <p><small>Received: ${new Date().toLocaleString()}</small></p>
          </div>
          <p style="color: #666; font-size: 14px;">
            This message was sent from your portfolio contact form.
          </p>
        </div>
      `
    };

    // Auto-reply to sender
    const userMailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Thank you for contacting me!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #3b82f6;">Thank You for Reaching Out! 🙏</h2>
          
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px; text-align: center; margin: 20px 0;">
            <h3 style="margin: 0; font-size: 24px;">Hi ${name},</h3>
            <p style="font-size: 18px; opacity: 0.9;">I've received your message and will get back to you soon!</p>
          </div>

          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #e2e8f0;">
            <h4 style="color: #475569; margin-top: 0;">📋 Your Message Summary:</h4>
            <p><strong>Subject:</strong> ${subject || 'General Inquiry'}</p>
            <p><strong>Received:</strong> ${new Date().toLocaleString()}</p>
          </div>

          <div style="margin: 30px 0;">
            <h4 style="color: #475569;">In the meantime, you can:</h4>
            <ul style="color: #64748b;">
              <li>📁 View my <a href="${process.env.CLIENT_URL}/#projects" style="color: #3b82f6; text-decoration: none;">projects</a></li>
              <li>💼 Check my <a href="${process.env.CLIENT_URL}/simpl.pdf" style="color: #3b82f6; text-decoration: none;">resume</a></li>
              <li>👨‍💻 Visit my <a href="https://github.com/monishr288" style="color: #3b82f6; text-decoration: none;">GitHub</a></li>
            </ul>
          </div>

          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
            <p style="color: #64748b; font-size: 14px;">
              Best regards,<br>
              <strong style="color: #3b82f6;">Monish R</strong><br>
              <span style="font-size: 12px;">Frontend Developer</span>
            </p>
            
            <div style="margin-top: 20px;">
              <a href="tel:9025952561" style="color: #64748b; text-decoration: none; margin: 0 10px;">📞 9025952561</a>
              <a href="mailto:rmonish543@gmail.com" style="color: #64748b; text-decoration: none; margin: 0 10px;">📧 rmonish543@gmail.com</a>
            </div>
          </div>

          <p style="color: #94a3b8; font-size: 12px; text-align: center; margin-top: 30px;">
            This is an automated response. Please don't reply to this email.
          </p>
        </div>
      `
    };

    // Send both emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    console.log(`✅ Message received from: ${name} <${email}>`);

    res.status(200).json({
      success: true,
      message: 'Thank you for your message! I will get back to you soon.'
    });

  } catch (error) {
    console.error('❌ Email error:', error);
    
    res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again later or contact me directly at rmonish543@gmail.com'
    });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString() 
  });
});


// 404 handler - FIXED: Remove the path or use '*'
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found' 
  });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📧 Contact endpoint: http://localhost:${PORT}/api/contact`);
  console.log(`🔧 Health check: http://localhost:${PORT}/health`);
});