const sdk = require('node-appwrite');
const nodemailer = require('nodemailer'); // use consistent naming
const CryptoJS = require('crypto-js');

const fetch = require('node-fetch');
const transporter = nodemailer.createTransport({
  host: "smtp.zoho.in",
  port: 465,
  secure: true, // true for port 465, false for port 587
  auth: {
    user: "no-reply@simdi.in", // your new email
    pass: process.env.SMTP_PASSWORD, // app-specific password or your email password
  },
});


// const storage = new sdk.Storage(client);
const BUCKET_ID = process.env.BUCKET_ID;

exports.registerUser = async (req, res) => {
  
  const client = new sdk.Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject(process.env.APPWRITE_PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY);
const { email, password, name, phone } = req.body;
  const users = new sdk.Users(client);
  try {
    // const result = await users.listIdentities();
    // console.log(result);
    const user = await users.create(sdk.ID.unique(), email, phone, password, name);
    res.status(201).json({ user });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }

};

exports.confirmOrder = async (req, res) => {
  // ✅ Handle CORS preflight (important for browsers)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { email, total_amount, items,details } = req.body;
    // console.log("Using Appwrite Project ID:", process.env.APPWRITE_PROJECT_ID);
    // console.log("Using Appwrite API Key:", process.env.APPWRITE_API_KEY);

    if (!process.env.APPWRITE_PROJECT_ID || !process.env.APPWRITE_API_KEY || !process.env.BUCKET_ID) {
      return res.status(500).json({ error: 'Appwrite configuration missing' });
    }

    let filesResponse;

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
      filesResponse = await fileFetch.json();
    } catch (error) {
      console.error("Appwrite file listing failed:", error);
      return res.status(500).json({ error: 'Failed to fetch files from Appwrite' });
    }

    const files = filesResponse.files || [];

    const itemsWithImageUrls = items.map(item => {
      const match = files.find(file =>
        file.name.toLowerCase().includes(item.name.toLowerCase())
      );

      const imageUrl = match
        ? `https://fra.cloud.appwrite.io/v1/storage/buckets/${process.env.BUCKET_ID}/files/${match.$id}/view?project=${process.env.APPWRITE_PROJECT_ID}&mode=admin`
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
     

    res.status(200).json({ message: 'Email sent successfully' });
     transporter.sendMail({
      from: 'SIMDI <no-reply@simdi.in>',
      to: "team@simdi.in",
      cc:"yogeshmamgain2611@gmail.com",
      subject: 'New Order Received',
      html:detailsEmail
    });

  } catch (error) {
    console.error('Email send failed:', error);
    res.status(500).json({ error: 'Something went wrong while sending email' });
  }
};

exports.confirmBooking= async (req, res)=>{
 
   const { userName, rideDate, pickup, dropoff, staticMapUrl,email }= req.body;
  //  console.log(req.body)
    // res.status(200).json({ message: 'Please check email for booking info' });
    // console.log(userName, rideDate, pickup, dropoff, mapImage)
let html= getRideConfirmationEmail(userName, rideDate, pickup, dropoff, staticMapUrl );
  try {
    await transporter.sendMail({
     from: 'SIMDI <no-reply@simdi.in>',
      to: email,
      cc:"yogeshmamgain2611@gmail.com",
      subject: 'Your Ride Confirmation',
      
      html
    });
    res.status(200).json({ message: 'Please check email for booking info' });
  } catch (error) {
    console.log(error)
        res.status(500).json({ error: 'Something went wrong while sending email' });
  }

}

exports.confirmDilevery= async (req,res)=>{
  const { userName, rideDate, pickup, dropoff, staticMapUrl,weight,email }= req.body;
  let html= getDeliveryConfirmationEmail( userName, rideDate, pickup, dropoff, staticMapUrl,weight )
try {
    await transporter.sendMail({
     from: 'SIMDI <no-reply@simdi.in>',
      to: email,
      cc:"yogeshmamgain2611@gmail.com",
      subject: 'Your Delivery Confirmation',
      html
    });
    res.status(200).json({ message: 'Please check email for delivery info' });
  } catch (error) {
    console.log(error)
        res.status(500).json({ error: 'Something went wrong while sending email' });
  }

}

exports.verifyEmail = async (req, res) => {
  try {
    const encryptedEmail = decodeURIComponent(req.body.email); // decode URL-safe base64

    const bytes = CryptoJS.AES.decrypt(encryptedEmail, '68302e19-9978-8000-aa2b-cfbe05cbe42f');
    const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    // Re-encrypt to use in verification link (optional, you can use the same one)
    // console.log(decrypted, 'deccc')
    const encryptedAgain = encodeURIComponent(
      CryptoJS.AES.encrypt(JSON.stringify(decrypted), '68302e19-9978-8000-aa2b-cfbe05cbe42f').toString()
    );

    const verificationLink = `http://localhost:3000/email-verification?userId=${encryptedAgain}`;

    const html = sendVerificationEmail(req.body.username, encryptedAgain);

    await transporter.sendMail({
      from: 'SIMDI <no-reply@simdi.in>',
      to: decrypted.id,
      subject: 'Please verify your email',
      html,
    });

    res.status(200).json({ message: 'Please check your email for verification.' });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ error: 'Error sending verification email' });
  }
};
exports.authenticate = async (req, res) => {
  try {
    
    const html =  `<h2>Hello Somesh,</h2>
    <p>Please verify the account ${req.body.email}</p>
  
    <br>
    <p>SIMDI</p>
    `

    await transporter.sendMail({
      from: 'SIMDI <no-reply@simdi.in>',
      to: "team@simdi.in",
      subject: 'Please verify the account',
      html,
    });

    res.status(200).json({ message: 'Please check your email for verification.' });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ error: 'Error sending verification email' });
  }
};


function getRideConfirmationEmail( userName, rideDate, pickupLocation, dropLocation, mapImageData ) {
  console.log(userName,rideDate,pickupLocation, dropLocation)
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8" />
      <title>Ride Booking Confirmation</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <div style="max-width: 600px; margin: auto; border: 1px solid #e0e0e0; padding: 20px;">
        <h2 style="color: #007bff;">🚖 Ride Booking Confirmed!</h2>

        <p>Hello ${userName},</p>

        <p>Thank you for booking your ride with us! Here are the details of your ride:</p>

        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0;"><strong>📅 Ride Date:</strong></td>
            <td style="padding: 8px 0;">${rideDate}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0;"><strong>📍 Pickup Location:</strong></td>
            <td style="padding: 8px 0;">${pickupLocation}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0;"><strong>📍 Drop Location:</strong></td>
            <td style="padding: 8px 0;">${dropLocation}</td>
          </tr>
        </table>

        <h3 style="margin-top: 30px;">🗺️ Your Route Map</h3>
        <p>The image below shows your ride pickup and drop:</p>
        <img src="${mapImageData}" alt="Map Snapshot" style="width: 100%; border: 1px solid #ccc; border-radius: 8px;" />

        <p style="margin-top: 30px;">We look forward to serving you. If you have any questions or need to modify your booking, feel free to contact our support team at team@simdi.in.</p>

        <p>Best regards,<br><strong>Team SIMDI</strong></p>
      </div>
    </body>
    </html>
  `;
}

function getDeliveryConfirmationEmail( userName, rideDate, pickupLocation, dropLocation, mapImageData,weight ) {
  console.log(userName,rideDate,pickupLocation, dropLocation)
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8" />
      <title>Delivery Confirmation</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <div style="max-width: 600px; margin: auto; border: 1px solid #e0e0e0; padding: 20px;">
        <h2 style="color: #007bff;">📦 Delivery Confirmed!</h2>

        <p>Hello ${userName},</p>

        <p>Thank you for booking with us! Here are the details of your delivery:</p>

        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0;"><strong>📅 Pickup Date:</strong></td>
            <td style="padding: 8px 0;">${rideDate}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0;"><strong>📍 Pickup Location:</strong></td>
            <td style="padding: 8px 0;">${pickupLocation}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0;"><strong>📍 Drop Location:</strong></td>
            <td style="padding: 8px 0;">${dropLocation}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0;"><strong>📦  Weight:</strong></td>
            <td style="padding: 8px 0;">${weight}Kg</td>
          </tr>
        </table>

        <h3 style="margin-top: 30px;">🗺️ Your Delivery Map</h3>
        <p>The image below shows your ride pickup and drop:</p>
        <img src="${mapImageData}" alt="Map Snapshot" style="width: 100%; border: 1px solid #ccc; border-radius: 8px;" />

        <p style="margin-top: 30px;">We look forward to serving you. If you have any questions or need to modify your booking, feel free to contact our support team. 
        at team@simdi.in
        </p>

        <p>Best regards,<br><strong>Team SIMDI</strong></p>
      </div>
    </body>
    </html>
  `;
}

function sendVerificationEmail(username, verification_link){
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Verify Your Account</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        background-color: #ffffff;
        margin: 30px auto;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.05);
      }
      .btn {
        display: inline-block;
        padding: 12px 24px;
        margin-top: 20px;
        background-color:rgb(15, 254, 154);
        color:white;
        text-decoration: none;
        border-radius: 5px;
        font-weight: bold;
      }
      .footer {
        font-size: 12px;
        color: #999999;
        margin-top: 30px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h2>Hello ${username},</h2>
      <p>Thank you for creating an account on <strong>SIMDI</strong>. We're excited to have you on board!</p>
      <p>Please verify your account by clicking the button below:</p>

      <a href="https://simdi.in/emailverification?userId=${verification_link}" class="btn">Verify Account</a>

      <p>If the button doesn't work, copy and paste the following link into your browser:</p>
      <p><a href="https://simdi.in/emailverification?userId=${verification_link}">https://simdi.in/emailverification?userId=${verification_link}</a></p>

      <div class="footer">
        <p>If you did not create this account, you can safely ignore this email.</p>
        <p>— The SIMDI Team</p>
      </div>
    </div>
  </body>
</html>
`
}

