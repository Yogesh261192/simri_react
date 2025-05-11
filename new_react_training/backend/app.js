const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
let {registerUser}= require('./controllers/authController');

console.log(registerUser)

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.post('/register', registerUser)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
