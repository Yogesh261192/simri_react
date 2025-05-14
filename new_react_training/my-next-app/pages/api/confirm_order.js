// pages/api/confirm_order.js
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email, total_amount, items } = req.body;

  try {
    const filesResponse = await fetch(
      `https://cloud.appwrite.io/v1/storage/buckets/${process.env.BUCKET_ID}/files`,
      {
        method: 'GET',
        headers: {
          'X-Appwrite-Project': process.env.APPWRITE_PROJECT_ID,
          'X-Appwrite-Key': process.env.APPWRITE_API_KEY,
        },
      }
    ).then((r) => r.json());

    const files = filesResponse.files || [];

    const itemsWithImageUrls = items.map((item) => {
      const match = files.filter((file) =>
        file.name.toLowerCase().includes(item.name.toLowerCase())
      );
      const imageUrl = match[0]
        ? `https://fra.cloud.appwrite.io/v1/storage/buckets/${process.env.BUCKET_ID}/files/${match[0].$id}/view?project=${process.env.APPWRITE_PROJECT_ID}&mode=admin`
        : null;

      return {
        ...item,
        imageUrl,
      };
    });

    // const html = `
    //   <div style="font-family: Arial; max-width: 600px; margin: auto;">
    //     <h2 style="text-align: center;">Order Confirmation</h2>
    //     <table width="100%" cellpadding="10" cellspacing="0">
    //       <thead>
    //         <tr>
    //           <th>Image</th>
    //           <th>Product</th>
    //           <th>Qty</th>
    //           <th>Price</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         ${itemsWithImageUrls
    //           .map(
    //             (item) => `
    //           <tr>
    //             <td>${item.imageUrl ? `<img src="${item.imageUrl}" width="60" />` : 'No image'}</td>
    //             <td>${item.name}</td>
    //             <td>${item.quantity}</td>
    //             <td>${item.price * item.quantity}</td>
    //           </tr>
    //         `
    //           )
    //           .join('')}
    //       </tbody>
    //     </table>
    //     <h3>Total: ₹${total_amount}</h3>
    //     <p>Thanks for your order!</p>
    //   </div>
    // `;
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
        <h3 style="text-align: right; margin-top: 20px;">Total:${total_amount}</h3>
        <p style="margin-top: 40px;">We hope you enjoy your purchase!</p>
        <p style="color: #555;">Best regards,<br/>Team SIMDI</p>
      </div>
    `;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `SIMDI`,
      to: email,
      subject: 'SIMDI, Your Order Confirmation',
      html,
    });

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
}
