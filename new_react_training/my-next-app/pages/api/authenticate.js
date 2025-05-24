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

}