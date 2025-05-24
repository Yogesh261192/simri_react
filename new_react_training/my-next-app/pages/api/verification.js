import nodemailer from 'nodemailer';
import fetch from 'node-fetch';
import CryptoJS from 'crypto-js';

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
try {
    const encryptedEmail = decodeURIComponent(req.body.email); // decode URL-safe base64
    const bytes = CryptoJS.AES.decrypt(encryptedEmail, '68302e19-9978-8000-aa2b-cfbe05cbe42f');
    const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    const encryptedAgain = encodeURIComponent(
      CryptoJS.AES.encrypt(JSON.stringify(decrypted), '68302e19-9978-8000-aa2b-cfbe05cbe42f').toString()
    );
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
