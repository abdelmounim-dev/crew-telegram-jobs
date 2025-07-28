const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/database');

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Placeholder for Telegram authentication
app.post('/auth/telegram', (req, res) => {
  const userProfileRoutes = require('./routes/userProfileRoutes');
app.use('/api/user-profiles', userProfileRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);
  res.status(200).json({ message: 'Telegram authentication placeholder' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));