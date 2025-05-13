const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
let {registerUser, confirmOrder}= require('./controllers/authController');
// console.log(dotenv)


dotenv.config();
const app = express();
// console.log(process.env)
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.post('/register', registerUser);
app.post('/confirm_order', confirmOrder);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
