const nodemailer = require('nodemailer');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { orderNumber, customerName, customerEmail, status } = JSON.parse(event.body);

  const statusColors = {
    confirmed: '#10b981',
    processing: '#3b82f6',
    shipped: '#8b5cf6',
    delivered: '#059669',
    cancelled: '#ef4444'
  };

  const statusMessages = {
    confirmed: 'Your order has been confirmed and is being prepared.',
    processing: 'Your order is currently being processed.',
    shipped: 'Great news! Your order has been shipped.',
    delivered: 'Your order has been delivered. Enjoy your new sneakers!',
    cancelled: 'Your order has been cancelled.'
  };

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: customerEmail,
    subject: `Order Update - ${orderNumber}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: black; color: white; padding: 30px; text-align: center;">
          <h1 style="margin: 0; font-size: 32px; font-weight: 900; font-style: italic;">
            <span style="color: #ef4444;">S</span>NEAKR<span style="color: #ef4444;">.</span>
          </h1>
        </div>
        <div style="padding: 40px 30px;">
          <h2 style="margin: 0 0 10px 0;">Order Status Update</h2>
          <p style="color: #666; margin: 0 0 30px 0;">Hi ${customerName},</p>
          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
            <div style="font-size: 14px; color: #666; margin-bottom: 5px;">Order Number</div>
            <div style="font-size: 24px; font-weight: bold; margin-bottom: 20px;">${orderNumber}</div>
            <div style="background: ${statusColors[status] || '#666'}; color: white; padding: 15px; border-radius: 6px; text-align: center;">
              <div style="font-size: 18px; font-weight: 600; text-transform: uppercase; margin-bottom: 5px;">${status}</div>
              <div style="font-size: 14px; opacity: 0.9;">${statusMessages[status] || 'Your order status has been updated.'}</div>
            </div>
          </div>
        </div>
        <div style="background: #f9f9f9; padding: 20px; text-align: center; color: #666; font-size: 14px;">
          <p style="margin: 0;">Questions? Contact us at ${process.env.EMAIL_USER}</p>
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully' })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
