const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // or 'outlook', 'yahoo', etc.
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS // Use App Password for Gmail
  }
});

// Send order confirmation email
app.post('/api/send-order-confirmation', async (req, res) => {
  const { orderNumber, customerName, customerEmail, items, total } = req.body;

  const itemsList = items.map(item => 
    `<tr>
      <td style="padding:15px;border-bottom:1px solid #f0f0f0">
        <div style="display:flex;align-items:center;gap:15px">
          <img src="${item.img}" alt="${item.name}" style="width:60px;height:60px;object-fit:cover;border-radius:4px" />
          <div>
            <div style="font-weight:bold;margin-bottom:4px">${item.name}</div>
            <div style="color:#666;font-size:12px;text-transform:uppercase">${item.category}</div>
          </div>
        </div>
      </td>
      <td style="padding:15px;border-bottom:1px solid #f0f0f0;text-align:right;font-weight:bold">$${item.price}</td>
    </tr>`
  ).join('');

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif">
      <div style="max-width:600px;margin:40px auto;background:#fff;box-shadow:0 2px 8px rgba(0,0,0,0.1)">
        
        <!-- Header -->
        <div style="background:#000;color:#fff;padding:40px 30px;text-align:center">
          <h1 style="margin:0;font-size:32px;font-weight:900;letter-spacing:2px;font-style:italic">SNEAKR.</h1>
          <p style="margin:10px 0 0;font-size:14px;letter-spacing:3px;opacity:0.8">ORDER CONFIRMATION</p>
        </div>
        
        <!-- Content -->
        <div style="padding:40px 30px">
          <p style="font-size:18px;margin:0 0 10px;color:#333">Hey ${customerName}! 👟</p>
          <p style="color:#666;line-height:1.6;margin:0 0 30px">Your order has been confirmed and will be delivered soon. Order number: <strong style="color:#000">#${orderNumber}</strong></p>
          
          <!-- Order Items -->
          <table style="width:100%;border-collapse:collapse;margin:30px 0">
            <thead>
              <tr style="background:#f9f9f9">
                <th style="text-align:left;padding:15px;font-size:12px;text-transform:uppercase;letter-spacing:1px;font-weight:bold">Item</th>
                <th style="text-align:right;padding:15px;font-size:12px;text-transform:uppercase;letter-spacing:1px;font-weight:bold">Price</th>
              </tr>
            </thead>
            <tbody>
              ${itemsList}
            </tbody>
          </table>
          
          <!-- Total -->
          <div style="background:#f9f9f9;padding:20px;margin:30px 0;border-radius:8px">
            <div style="display:flex;justify-content:space-between;margin-bottom:10px">
              <span style="color:#666">Subtotal</span>
              <span style="font-weight:bold">$${total.toFixed(2)}</span>
            </div>
            <div style="display:flex;justify-content:space-between;margin-bottom:10px">
              <span style="color:#666">Shipping</span>
              <span style="color:#10b981;font-weight:bold">FREE</span>
            </div>
            <div style="border-top:2px solid #000;margin-top:15px;padding-top:15px;display:flex;justify-content:space-between">
              <span style="font-size:18px;font-weight:bold">Total</span>
              <span style="font-size:24px;font-weight:900">$${total.toFixed(2)}</span>
            </div>
          </div>
          
          <!-- Payment Info -->
          <div style="background:#000;color:#fff;padding:20px;border-radius:8px;margin:30px 0">
            <div style="font-size:12px;text-transform:uppercase;letter-spacing:2px;margin-bottom:5px;opacity:0.7">Payment Method</div>
            <div style="font-size:20px;font-weight:bold;font-style:italic">💵 Cash on Delivery</div>
            <div style="font-size:13px;margin-top:8px;opacity:0.8">Pay when you receive your order</div>
          </div>
          
          <p style="color:#666;line-height:1.6;margin:30px 0">We'll contact you soon to confirm delivery details. If you have any questions, feel free to reach out!</p>
        </div>
        
        <!-- Footer -->
        <div style="background:#f9f9f9;padding:30px;text-align:center;border-top:1px solid #eee">
          <p style="margin:0;color:#999;font-size:12px;line-height:1.6">
            © 2024 SNEAKR. All rights reserved.<br>
            This is an automated email, please do not reply.
          </p>
        </div>
        
      </div>
    </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      from: `"SNEAKR." <${process.env.EMAIL_USER}>`,
      to: customerEmail,
      subject: `✅ Order Confirmed #${orderNumber} - SNEAKR.`,
      html
    });
    res.json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
