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
require('dotenv').config();
const crypto = require('crypto');

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN; 

app.post('/auth/telegram', (req, res) => {
  const data = req.body;
  const { hash, ...otherData } = data;

  const checkString = Object.keys(otherData)
    .sort()
    .map(key => `${key}=${otherData[key]}`)
    .join('\n');

  const secretKey = crypto.createHash('sha256').update(BOT_TOKEN).digest();
  const hmac = crypto.createHmac('sha256', secretKey).update(checkString).digest('hex');

  if (hmac === hash) {
    // Authentication successful
    // You can now process the user data (e.g., create/update user in your DB)
    console.log('Telegram authentication successful:', data);
    res.status(200).json({ message: 'Telegram authentication successful', user: data });
  } else {
    // Authentication failed
    console.log('Telegram authentication failed: Invalid hash');
    res.status(401).json({ message: 'Unauthorized: Invalid hash' });
  }
});

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

const userProfileRoutes = require('./routes/userProfileRoutes');
app.use('/api/user-profiles', userProfileRoutes);

const crewProfileRoutes = require('./routes/crewProfileRoutes');
app.use('/api/crew-profiles', crewProfileRoutes);

const ownerProfileRoutes = require('./routes/ownerProfileRoutes');
app.use('/api/owner-profiles', ownerProfileRoutes);

const jobRoutes = require('./routes/jobRoutes');
app.use('/api/jobs', jobRoutes);

const applicationRoutes = require('./routes/applicationRoutes');
app.use('/api/applications', applicationRoutes);

const fileRoutes = require('./routes/fileRoutes');
app.use('/api/files', fileRoutes);

const roleRoutes = require('./routes/roleRoutes');
app.use('/api/roles', roleRoutes);

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));