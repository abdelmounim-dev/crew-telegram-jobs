const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001; // Using a different port to avoid conflict with your backend

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from 'public' directory

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/auth/telegram', (req, res) => {
  console.log('Received Telegram Auth Data:');
  console.log(JSON.stringify(req.body, null, 2));
  res.send('Auth data received. Check server console for details.');
});

app.listen(PORT, () => {
  console.log(`Telegram Auth App listening at http://localhost:${PORT}`);
});
