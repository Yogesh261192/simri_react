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