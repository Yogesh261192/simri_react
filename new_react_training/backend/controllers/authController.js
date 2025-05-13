const sdk = require('node-appwrite');
const nodemailer = require('nodemailer'); // use consistent naming

const client = new sdk.Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject(process.env.APPWRITE_PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY);

const storage = new sdk.Storage(client);
const BUCKET_ID = process.env.BUCKET_ID;

exports.registerUser = async (req, res) => {
  const { email, password, name, phone } = req.body;
  const users = new sdk.Users(client);

  try {
    const result = await users.listIdentities();
    console.log(result);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }

  try {
    const user = await users.create(sdk.ID.unique(), email, phone, password, name);
    res.status(201).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.confirmOrder = async (req, res) => {
  try {
    const { email, total_amount, items } = req.body;

    console.log("Using Appwrite Project ID:", process.env.APPWRITE_PROJECT_ID);
    console.log("Using Appwrite API Key:", process.env.APPWRITE_API_KEY);

    // Check required Appwrite env vars
    if (!process.env.APPWRITE_PROJECT_ID || !process.env.APPWRITE_API_KEY || !process.env.BUCKET_ID) {
      return res.status(500).json({ error: 'Appwrite configuration missing' });
    }

    let filesResponse;
    try {
       await fetch(`https://cloud.appwrite.io/v1/storage/buckets/${process.env.BUCKET_ID}/files`, {
  method: 'GET',
  headers: {
    'X-Appwrite-Project': process.env.APPWRITE_PROJECT_ID,
    'X-Appwrite-Key': process.env.APPWRITE_API_KEY,
  }
  
}).then(res=>res.json()).then(response=>{
  filesResponse=response
})
// console.log(filesResponse);
    } catch (error) {
      console.error("Appwrite file listing failed:", error);
      return res.status(500).json({ error: 'Failed to fetch files from Appwrite' });
    }
    console.log(filesResponse)
    const files = filesResponse.files;
    // const response = await storage.getBucket(process.env.BUCKET_ID);
    // console.log(response)
    const itemsWithImageUrls = items.map(item => {
      const match = files.filter(file =>
        file.name.toLowerCase().includes(item.name.toLowerCase())
      );
      // console.log(match)

      const imageUrl = match
        ? `https://fra.cloud.appwrite.io/v1/storage/buckets/${process.env.BUCKET_ID}/files/${match[0].$id}/view?project=${process.env.APPWRITE_PROJECT_ID}&mode=admin`
        : null;

      return {
        ...item,
        imageUrl,
      };
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
                <td align="right">$${item.price * item.quantity}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <h3 style="text-align: right; margin-top: 20px;">Total:${total_amount}</h3>
        <p style="margin-top: 40px;">We hope you enjoy your purchase!</p>
        <p style="color: #555;">Best regards,<br/>SIMDI</p>
      </div>
    `;

    // Nodemailer setup
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD
      }
    });

    await transporter.sendMail({
      from: `"Your Shop" <${process.env.SMTP_EMAIL}>`,
      to: email,
      subject: 'Your Order Confirmation',
      html
    });

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email send failed:', error);
    res.status(500).json({ error: 'Something went wrong while sending email' });
  }
};
