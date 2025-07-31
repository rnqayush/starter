const nodemailer = require('nodemailer');

// Email templates
const emailTemplates = {
  emailVerification: (data) => ({
    subject: 'Verify Your Email - Multi-Business Platform',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #3b82f6; margin: 0;">Multi-Business Platform</h1>
          <p style="color: #6b7280; margin: 5px 0;">Build Your Business Website</p>
        </div>
        
        <div style="background: #f8fafc; padding: 30px; border-radius: 8px; margin-bottom: 30px;">
          <h2 style="color: #1f2937; margin-top: 0;">Welcome, ${data.name}!</h2>
          <p style="color: #4b5563; line-height: 1.6;">
            Thank you for joining Multi-Business Platform. To complete your registration and start building your business website, please verify your email address.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${data.verificationUrl}" 
               style="background: #3b82f6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
              Verify Email Address
            </a>
          </div>
          
          <p style="color: #6b7280; font-size: 14px; margin-bottom: 0;">
            If the button doesn't work, copy and paste this link into your browser:<br>
            <a href="${data.verificationUrl}" style="color: #3b82f6; word-break: break-all;">${data.verificationUrl}</a>
          </p>
        </div>
        
        <div style="text-align: center; color: #9ca3af; font-size: 12px;">
          <p>This verification link will expire in 24 hours.</p>
          <p>If you didn't create an account, please ignore this email.</p>
        </div>
      </div>
    `
  }),

  passwordReset: (data) => ({
    subject: 'Password Reset Request - Multi-Business Platform',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #3b82f6; margin: 0;">Multi-Business Platform</h1>
          <p style="color: #6b7280; margin: 5px 0;">Password Reset Request</p>
        </div>
        
        <div style="background: #fef2f2; border: 1px solid #fecaca; padding: 30px; border-radius: 8px; margin-bottom: 30px;">
          <h2 style="color: #dc2626; margin-top: 0;">Password Reset Request</h2>
          <p style="color: #4b5563; line-height: 1.6;">
            Hello ${data.name},<br><br>
            We received a request to reset your password for your Multi-Business Platform account. If you made this request, click the button below to reset your password.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${data.resetUrl}" 
               style="background: #dc2626; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
              Reset Password
            </a>
          </div>
          
          <p style="color: #6b7280; font-size: 14px; margin-bottom: 0;">
            If the button doesn't work, copy and paste this link into your browser:<br>
            <a href="${data.resetUrl}" style="color: #dc2626; word-break: break-all;">${data.resetUrl}</a>
          </p>
        </div>
        
        <div style="background: #fffbeb; border: 1px solid #fed7aa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <p style="color: #92400e; margin: 0; font-size: 14px;">
            <strong>Security Notice:</strong> If you didn't request this password reset, please ignore this email. Your password will remain unchanged.
          </p>
        </div>
        
        <div style="text-align: center; color: #9ca3af; font-size: 12px;">
          <p>This password reset link will expire in 10 minutes.</p>
          <p>For security reasons, please don't share this email with anyone.</p>
        </div>
      </div>
    `
  }),

  bookingConfirmation: (data) => ({
    subject: `Booking Confirmation - ${data.bookingNumber}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #3b82f6; margin: 0;">Booking Confirmed!</h1>
          <p style="color: #6b7280; margin: 5px 0;">Booking #${data.bookingNumber}</p>
        </div>
        
        <div style="background: #f0fdf4; border: 1px solid #bbf7d0; padding: 30px; border-radius: 8px; margin-bottom: 30px;">
          <h2 style="color: #166534; margin-top: 0;">Thank you, ${data.customerName}!</h2>
          <p style="color: #4b5563; line-height: 1.6;">
            Your booking has been confirmed. Here are the details:
          </p>
          
          <div style="background: white; padding: 20px; border-radius: 6px; margin: 20px 0;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>Booking Number:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">${data.bookingNumber}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>Service:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">${data.serviceName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>Date & Time:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">${data.dateTime}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>Total Amount:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>${data.totalAmount}</strong></td>
              </tr>
            </table>
          </div>
          
          ${data.specialRequests ? `
            <div style="background: #fef3c7; padding: 15px; border-radius: 6px; margin: 20px 0;">
              <p style="margin: 0; color: #92400e;"><strong>Special Requests:</strong> ${data.specialRequests}</p>
            </div>
          ` : ''}
        </div>
        
        <div style="text-align: center; color: #6b7280; font-size: 14px;">
          <p>Need to make changes? Contact us at ${data.businessContact}</p>
          <p>We look forward to serving you!</p>
        </div>
      </div>
    `
  }),

  welcome: (data) => ({
    subject: 'Welcome to Multi-Business Platform!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #3b82f6; margin: 0;">Welcome to Multi-Business Platform!</h1>
          <p style="color: #6b7280; margin: 5px 0;">Let's get you started</p>
        </div>
        
        <div style="background: #f8fafc; padding: 30px; border-radius: 8px; margin-bottom: 30px;">
          <h2 style="color: #1f2937; margin-top: 0;">Hello ${data.name}!</h2>
          <p style="color: #4b5563; line-height: 1.6;">
            Welcome to Multi-Business Platform! You can now create professional websites for any type of business - hotels, e-commerce stores, automobile dealerships, wedding services, and more.
          </p>
          
          <div style="margin: 30px 0;">
            <h3 style="color: #1f2937; margin-bottom: 15px;">What you can do:</h3>
            <ul style="color: #4b5563; line-height: 1.8;">
              <li>Create unlimited business websites</li>
              <li>Manage bookings and reservations</li>
              <li>Accept online payments</li>
              <li>Track analytics and performance</li>
              <li>Customize your brand and design</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${data.dashboardUrl}" 
               style="background: #3b82f6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
              Go to Dashboard
            </a>
          </div>
        </div>
        
        <div style="text-align: center; color: #6b7280; font-size: 14px;">
          <p>Need help getting started? Check out our <a href="${data.helpUrl}" style="color: #3b82f6;">help center</a></p>
          <p>Questions? Reply to this email or contact our support team.</p>
        </div>
      </div>
    `
  })
};

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_PORT == 465, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD
    }
  });
};

// Send email function
const sendEmail = async (options) => {
  try {
    const transporter = createTransporter();

    let emailContent;
    
    // Check if using template
    if (options.template && emailTemplates[options.template]) {
      emailContent = emailTemplates[options.template](options.data || {});
    } else {
      emailContent = {
        subject: options.subject,
        html: options.html || options.message
      };
    }

    const message = {
      from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
      to: options.email,
      subject: emailContent.subject,
      html: emailContent.html
    };

    const info = await transporter.sendMail(message);
    
    console.log('Email sent successfully:', info.messageId);
    return info;
  } catch (error) {
    console.error('Email sending failed:', error);
    throw error;
  }
};

// Send bulk emails
const sendBulkEmail = async (recipients, options) => {
  try {
    const transporter = createTransporter();
    const results = [];

    for (const recipient of recipients) {
      try {
        let emailContent;
        
        if (options.template && emailTemplates[options.template]) {
          emailContent = emailTemplates[options.template]({
            ...options.data,
            ...recipient.data
          });
        } else {
          emailContent = {
            subject: options.subject,
            html: options.html || options.message
          };
        }

        const message = {
          from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
          to: recipient.email,
          subject: emailContent.subject,
          html: emailContent.html
        };

        const info = await transporter.sendMail(message);
        results.push({ email: recipient.email, success: true, messageId: info.messageId });
      } catch (error) {
        console.error(`Failed to send email to ${recipient.email}:`, error);
        results.push({ email: recipient.email, success: false, error: error.message });
      }
    }

    return results;
  } catch (error) {
    console.error('Bulk email sending failed:', error);
    throw error;
  }
};

// Verify email configuration
const verifyEmailConfig = async () => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log('✅ Email configuration verified successfully');
    return true;
  } catch (error) {
    console.error('❌ Email configuration verification failed:', error);
    return false;
  }
};

module.exports = {
  sendEmail,
  sendBulkEmail,
  verifyEmailConfig,
  emailTemplates
};

