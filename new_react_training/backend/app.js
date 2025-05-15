const dotenv = require('dotenv');
const fs = require('fs');
const https = require('https');
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const { registerUser, confirmOrder } = require('./controllers/authController');

// Load env vars
dotenv.config();

const app = express();

// SSL certificate options
const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/simdi.in/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/simdi.in/fullchain.pem'),
};

// Middleware
app.use(cors({ origin: 'https://simdi.in', credentials: true }));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.post('/register', registerUser);
app.post('/confirm_order', confirmOrder);

// Start HTTPS server
const PORT =  443;
https.createServer(options, app).listen(PORT, () => {
  console.log(`HTTPS Server is running on port ${PORT}`);
});
