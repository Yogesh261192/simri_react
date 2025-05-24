import nodemailer from 'nodemailer';
import fetch from 'node-fetch';

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.in",
  port: 465,
  secure: true,
  auth: {
    user: "no-reply@simdi.in",
    pass: process.env.SMTP_PASSWORD,
  },
});

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const { email, total_amount, items, details } = req.body;

  if (!process.env.APPWRITE_PROJECT_ID || !process.env.APPWRITE_API_KEY || !process.env.BUCKET_ID) {
    return res.status(500).json({ error: 'Appwrite configuration missing' });
  }

  try {
    const fileFetch = await fetch(
      `https://cloud.appwrite.io/v1/storage/buckets/${process.env.BUCKET_ID}/files`,
      {
        method: 'GET',
        headers: {
          'X-Appwrite-Project': process.env.APPWRITE_PROJECT_ID,
          'X-Appwrite-Key': process.env.APPWRITE_API_KEY,
        }
      }
    );
    const filesResponse = await fileFetch.json();
    const files = filesResponse.files || [];

    const itemsWithImageUrls = items.map(item => {
      const match = files.find(file =>
        file.name.toLowerCase().includes(item.name.toLowerCase())
      );

      const imageUrl = match
        ? `https://fra.cloud.appwrite.io/v1/storage/buckets/${process.env.BUCKET_ID}/files/${match.$id}/view?project=${process.env.APPWRITE_PROJECT_ID}&mode=admin`
        : null;

      return { ...item, imageUrl };
    });

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px;">
        <h2 style="text-align: center; color: #2c3e50;">Order Confirmation</h2>
        <p>Hello,</p>
        <p>Thank you for your order. Here are the details:</p>
        <table width="100%" cellpadding="10" cellspacing="0" style="border-collapse: collapse;">
          <thead>
            <tr style="background-color: #f2f2f2;">
              <th align="left">Image</th>
              <th align="left">Product</th>
              <th align="center">Qty</th>
              <th align="right">Price</th>
            </tr>
          </thead>
          <tbody>
            ${itemsWithImageUrls.map(item => `
              <tr style="border-bottom: 1px solid #ddd;">
                <td>${item.imageUrl ? `<img src="${item.imageUrl}" width="60" height="60" style="border-radius: 6px;" />` : 'No image'}</td>
                <td>${item.name}</td>
                <td align="center">${item.quantity}</td>
                <td align="right">${item.price * item.quantity}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <h3 style="text-align: right; margin-top: 20px;">Total: ${total_amount}</h3>
        <p style="margin-top: 40px;">We hope you enjoy your purchase!</p>
        <p style="color: #555;">Best regards,<br/>SIMDI</p>
      </div>
    `;

    // const transporter = nodemailer.createTransport({
    //   service: 'gmail',
    //   auth: {
    //     user: process.env.SMTP_EMAIL,
    //     pass: process.env.SMTP_PASSWORD
    //   }
    // });
    
     const detailsEmail = html + `
  <table width="100%" cellpadding="10" cellspacing="0" style="border-collapse: collapse; margin-top: 20px;">
    <thead>
      <tr style="background-color: #f2f2f2;">
        <th align="left">Address</th>
        <th align="left">Locality</th>
        <th align="center">Pin</th>
        <th align="right">Number</th>
      </tr>
    </thead>
    <tbody>
      <tr style="border-bottom: 1px solid #ddd;">
        <td align="left">${details.address}</td>
        <td align="left">${details.locality}</td>
        <td align="center">${details.pincode}</td>
        <td align="right">${details.alternatePhone}</td>
      </tr>
    </tbody>
  </table>
`;

    
    await transporter.sendMail({
      from: 'SIMDI <no-reply@simdi.in>',
      to: email,
      subject: 'Your Order Confirmation',
      html
    });

    transporter.sendMail({
      from: 'SIMDI <no-reply@simdi.in>',
      to: "team@simdi.in",
      cc: "yogeshmamgain2611@gmail.com",
      subject: 'New Order Received',
      html: detailsEmail
    });

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email send failed:', error);
    res.status(500).json({ error: error });
  }


}
