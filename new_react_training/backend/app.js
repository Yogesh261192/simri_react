const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const authRoutes = require('./routes/auth');
const { registerUser, confirmOrder } = require('./controllers/authController');

// Define allowed origins
const allowedOrigins = ['https://simdi.in', 'https://www.simdi.in'];

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (e.g., mobile apps, curl)
    console.log(origin, 'origin')
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};

const app = express();

// Apply CORS middleware
app.use(cors(corsOptions));

// Handle preflight requests
// app.options('*', cors(corsOptions));
app.options('/confirm_order', cors()) 
// Parse JSON request bodies
app.use(express.json());

// API routes
app.use('/api/auth', authRoutes);
app.post('/register', registerUser);
app.post('/confirm_order',cors(), confirmOrder);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
