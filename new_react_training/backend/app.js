// ❌ Remove this part
// const https = require('https');
// const options = { key: ..., cert: ... };

const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const authRoutes = require('./routes/auth');
const { registerUser, confirmOrder } = require('./controllers/authController');
const allowedOrigins = ['https://simdi.in', 'https://www.simdi.in'];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like curl or mobile apps)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
// app.options('*', cors(corsOptions));

// app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.post('/register', registerUser);
app.post('/confirm_order', confirmOrder);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
