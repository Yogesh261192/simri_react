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