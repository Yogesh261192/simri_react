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

app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.post('/register', registerUser);
app.post('/confirm_order', confirmOrder);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
