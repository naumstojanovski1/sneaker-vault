const nodemailer = require('nodemailer');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { orderNumber, customerName, customerEmail, items, total } = JSON.parse(event.body);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const itemsList = items.map(item => 
    `<tr>
      <td style="padding:15px;border-bottom:1px solid #f0f0f0">
        <a href="https://sneakr.netlify.app/product/${item.slug || item.id}" style="text-decoration:none;color:inherit;display:flex;align-items:center;gap:15px">
          <img src="${item.img}" alt="${item.name}" style="width:60px;height:60px;object-fit:cover;border-radius:4px" />
          <div>
            <div style="font-weight:bold;margin-bottom:4px;color:#000">${item.name}</div>
            <div style="color:#666;font-size:12px;text-transform:uppercase">${item.category}</div>
          </div>
        </a>
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
      <div style="max-width:600px;margin:40px auto;background:#fff">
        
        <div style="background:#000;color:#fff;padding:50px 40px;text-align:center">
          <h1 style="margin:0;font-size:42px;font-weight:900;letter-spacing:3px;font-style:italic">SNEAKR<span style="color:#dc2626">.</span></h1>
          <div style="width:60px;height:2px;background:#dc2626;margin:20px auto"></div>
          <p style="margin:0;font-size:13px;letter-spacing:4px;text-transform:uppercase;opacity:0.9">Order Confirmation</p>
        </div>
        
        <div style="padding:50px 40px">
          <h2 style="font-size:24px;margin:0 0 15px;color:#000;font-weight:900;text-transform:uppercase;letter-spacing:1px">Thank You, ${customerName}</h2>
          <p style="color:#666;line-height:1.8;margin:0 0 10px;font-size:15px">Your order has been confirmed and is being prepared for delivery.</p>
          <p style="color:#000;font-size:15px;margin:0 0 40px">Order Number: <strong style="font-weight:900;letter-spacing:1px">#${orderNumber}</strong></p>
          
          <div style="border-top:2px solid #000;border-bottom:2px solid #000;padding:30px 0;margin:40px 0">
            <h3 style="font-size:12px;text-transform:uppercase;letter-spacing:2px;margin:0 0 25px;font-weight:900">Order Details</h3>
            <table style="width:100%;border-collapse:collapse">
              <tbody>
                ${itemsList}
              </tbody>
            </table>
          </div>
          
          <div style="background:#fafafa;padding:30px;border-left:4px solid #000">
            <div style="display:flex;justify-content:space-between;margin-bottom:12px;font-size:15px">
              <span style="color:#666">Subtotal</span>
              <span style="font-weight:700;color:#000">$${total.toFixed(2)}</span>
            </div>
            <div style="display:flex;justify-content:space-between;margin-bottom:20px;font-size:15px">
              <span style="color:#666">Shipping</span>
              <span style="color:#10b981;font-weight:700">FREE</span>
            </div>
            <div style="border-top:2px solid #000;padding-top:20px;display:flex;justify-content:space-between;align-items:center">
              <span style="font-size:16px;font-weight:900;text-transform:uppercase;letter-spacing:1px">Total</span>
              <span style="font-size:32px;font-weight:900;font-style:italic">$${total.toFixed(2)}</span>
            </div>
          </div>
          
          <div style="background:#000;color:#fff;padding:30px;margin:40px 0">
            <div style="font-size:11px;text-transform:uppercase;letter-spacing:2px;margin-bottom:8px;opacity:0.7">Payment Method</div>
            <div style="font-size:24px;font-weight:900;font-style:italic;margin-bottom:8px">Cash on Delivery</div>
            <div style="font-size:14px;opacity:0.85;line-height:1.6">Pay securely when you receive your order at your doorstep</div>
          </div>
          
          <div style="border-top:1px solid #eee;padding-top:30px;margin-top:40px">
            <p style="color:#666;line-height:1.8;margin:0 0 20px;font-size:15px">Our team will contact you shortly to confirm delivery details and schedule.</p>
            <p style="color:#666;line-height:1.8;margin:0;font-size:15px">Questions? Contact us anytime at <a href="mailto:support@sneakr.com" style="color:#000;font-weight:700;text-decoration:none">support@sneakr.com</a></p>
          </div>
        </div>
        
        <div style="background:#fafafa;padding:40px;text-align:center;border-top:1px solid #eee">
          <p style="margin:0 0 15px;color:#000;font-size:18px;font-weight:900;font-style:italic;letter-spacing:1px">SNEAKR<span style="color:#dc2626">.</span></p>
          <p style="margin:0;color:#999;font-size:12px;line-height:1.8">
            Premium Sneakers & Streetwear<br>
            © 2024 SNEAKR. All rights reserved.
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
      subject: `Order Confirmed #${orderNumber} - SNEAKR.`,
      html
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  } catch (error) {
    console.error('Email error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: error.message })
    };
  }
};
