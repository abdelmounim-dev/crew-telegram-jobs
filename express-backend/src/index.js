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
  const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const roleRoutes = require('./routes/roleRoutes');
app.use('/api/roles', roleRoutes);

const fileRoutes = require('./routes/fileRoutes');
app.use('/api/files', fileRoutes);

const applicationRoutes = require('./routes/applicationRoutes');
app.use('/api/applications', applicationRoutes);

const jobRoutes = require('./routes/jobRoutes');
app.use('/api/jobs', jobRoutes);

const ownerProfileRoutes = require('./routes/ownerProfileRoutes');
app.use('/api/owner-profiles', ownerProfileRoutes);

const crewProfileRoutes = require('./routes/crewProfileRoutes');
app.use('/api/crew-profiles', crewProfileRoutes);

const userProfileRoutes = require('./routes/userProfileRoutes');
app.use('/api/user-profiles', userProfileRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);
  res.status(200).json({ message: 'Telegram authentication placeholder' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));