const nodemailer = require('nodemailer');

// Create transporter with Gmail or another SMTP service
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'udditlord@gmail.com', // Using the Gmail account that has the App Password
    pass: process.env.EMAIL_PASS
  },
  debug: true // Enable debug logging
});

// Verify transporter configuration on startup
transporter.verify(function(error, success) {
  if (error) {
    console.error('❌ Email configuration error:', error);
    console.error('Please check your .env file and Gmail settings');
    console.error('Make sure:');
    console.error('1. 2-Step Verification is enabled on udditlord@gmail.com');
    console.error('2. App Password is correctly set in .env file');
    console.error('3. The App Password is for "Mail" and "Other (Custom name)"');
  } else {
    console.log('✅ Email server is ready to send messages');
    console.log('Using email account: udditlord@gmail.com');
  }
});

// Create the HTML email template for client registration
const createClientEmailTemplate = (client) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to PanEura Automations</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background: linear-gradient(to right, #2563eb, #06b6d4);
          color: white;
          padding: 20px;
          text-align: center;
        }
        .logo {
          font-size: 24px;
          font-weight: bold;
        }
        .content {
          padding: 20px;
          background: #fff;
        }
        .footer {
          background: #0f172a;
          color: white;
          text-align: center;
          padding: 15px;
          font-size: 12px;
        }
        .details {
          background: #f8fafc;
          padding: 15px;
          border-radius: 5px;
          margin: 20px 0;
        }
        .details-row {
          padding: 8px 0;
          border-bottom: 1px solid #e2e8f0;
        }
        .details-row:last-child {
          border-bottom: none;
        }
        .label {
          font-weight: bold;
          color: #2563eb;
        }
        .button {
          display: inline-block;
          background-color: #2563eb;
          color: white;
          text-decoration: none;
          padding: 10px 20px;
          border-radius: 5px;
          margin-top: 20px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">PanEura Automations</div>
          <p>Eurasia's fastest growing Internet Solutions Provider</p>
        </div>
        
        <div class="content">
          <h2>Welcome to PanEura Automations!</h2>
          
          <p>Dear ${client.name},</p>
          
          <p>You should be proud to have PanEura's services. We are delighted to have you onboard with us!</p>
          
          <p>We have received your registration details and our team will review your project requirements. We will contact you shortly to discuss the next steps.</p>
          
          <h3>Your Registration Details:</h3>
          
          <div class="details">
            <div class="details-row">
              <span class="label">Name:</span> ${client.name}
            </div>
            <div class="details-row">
              <span class="label">Company:</span> ${client.company}
            </div>
            <div class="details-row">
              <span class="label">Email:</span> ${client.email}
            </div>
            <div class="details-row">
              <span class="label">Phone:</span> ${client.phone}
            </div>
            <div class="details-row">
              <span class="label">Project:</span> ${client.project}
            </div>
            <div class="details-row">
              <span class="label">Timeline:</span> ${client.timeLimit}
            </div>
            <div class="details-row">
              <span class="label">Budget:</span> ₹${client.budget.toLocaleString()}
            </div>
          </div>
          
          <p>If you have any questions or need to update your project details, please don't hesitate to contact us.</p>
          
          <a href="https://paneura.site" class="button">Visit Our Website</a>
        </div>
        
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} PanEura Automations. All rights reserved.</p>
          <p>Contact: solutions@paneura.site | +91-7456886877 | +91-93585 77653</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Send confirmation email to client
const sendClientConfirmationEmail = async (client) => {
  try {
    if (!client || !client.email) {
      console.error('❌ Invalid client data:', client);
      return false;
    }

    console.log('📧 Attempting to send welcome email to client:', {
      name: client.name,
      email: client.email
    });

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(client.email)) {
      console.error('❌ Invalid email format:', client.email);
      return false;
    }

    const mailOptions = {
      from: `"PanEura Automations" <udditlord@gmail.com>`,
      to: client.email,
      subject: 'Welcome to PanEura Automations!',
      html: createClientEmailTemplate(client)
    };

    console.log('📧 Sending email with options:', {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject
    });

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Client welcome email sent successfully:', {
      messageId: info.messageId,
      to: client.email,
      response: info.response
    });
    return true;
  } catch (error) {
    console.error('❌ Error sending client welcome email:', {
      error: error.message,
      code: error.code,
      command: error.command,
      clientEmail: client.email,
      stack: error.stack
    });
    return false;
  }
};

// Send notification email to admin
const sendAdminNotificationEmail = async (client) => {
  try {
    if (!process.env.ADMIN_EMAIL) {
      console.error('❌ Admin email not configured in .env file');
      return false;
    }

    console.log('📧 Attempting to send admin notification:', {
      adminEmail: process.env.ADMIN_EMAIL,
      clientName: client.name,
      clientCompany: client.company
    });
    
    const mailOptions = {
      from: `"PanEura Automations" <udditlord@gmail.com>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Client Registration: ${client.name} from ${client.company}`,
      html: `
        <h2>New Client Registration</h2>
        <p>A new client has registered with PanEura Automations:</p>
        <ul>
          <li><strong>Name:</strong> ${client.name}</li>
          <li><strong>Company:</strong> ${client.company}</li>
          <li><strong>Email:</strong> ${client.email}</li>
          <li><strong>Phone:</strong> ${client.phone}</li>
          <li><strong>Project:</strong> ${client.project}</li>
          <li><strong>Timeline:</strong> ${client.timeLimit}</li>
          <li><strong>Budget:</strong> ₹${client.budget.toLocaleString()}</li>
        </ul>
        <p>Log in to the <a href="https://yourwebsite.com/login">admin panel</a> to view full details.</p>
      `
    };

    console.log('📧 Sending admin notification with options:', {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject
    });

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Admin notification email sent successfully:', {
      messageId: info.messageId,
      to: process.env.ADMIN_EMAIL,
      response: info.response
    });
    return true;
  } catch (error) {
    console.error('❌ Error sending admin notification email:', {
      error: error.message,
      code: error.code,
      command: error.command,
      adminEmail: process.env.ADMIN_EMAIL,
      stack: error.stack
    });
    return false;
  }
};

module.exports = {
  sendClientConfirmationEmail,
  sendAdminNotificationEmail
}; 