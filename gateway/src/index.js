require('dotenv').config();
const express = require('express');
const crypto = require('crypto');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Gateway is running!');
});

// Middleware to check for authentication (simplified for now)
const isAuthenticated = (req, res, next) => {
  // In a real application, this would involve verifying a JWT or session token
  if (req.headers.authorization === 'Bearer dummy-telegram-token') {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

// Telegram authentication route
app.post('/auth/telegram', async (req, res) => {
  const { telegram_id, first_name, last_name, username, photo_url, auth_date, hash } = req.body;

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  if (!botToken) {
    return res.status(500).json({ message: 'Telegram bot token not configured.' });
  }

  const dataCheckString = Object.keys(req.body)
    .filter(key => key !== 'hash')
    .map(key => `${key}=${req.body[key]}`)
    .sort()
    .join('\n');

  const secretKey = crypto.createHash('sha256').update(botToken).digest();
  const hmac = crypto.createHmac('sha256', secretKey).update(dataCheckString).digest('hex');

  if (hmac === hash) {
    // Authentication successful
    // In a real scenario, you would generate a JWT or session token for your application.
    res.json({ message: 'Telegram authentication successful', user: { telegram_id, username }, token: 'dummy-telegram-token' });
  } else {
    res.status(401).json({ message: 'Telegram authentication failed: Invalid hash' });
  }
});

// Proxy all other requests to Strapi after authentication
app.use('/', isAuthenticated, createProxyMiddleware({
  target: process.env.STRAPI_URL || 'http://localhost:1337',
  changeOrigin: true,
  pathRewrite: {
    '^/': '/', // rewrite path
  },
  onProxyReq: (proxyReq, req, res) => {
    // You might want to add/modify headers here before proxying
    // For example, adding the user's ID or role from the authenticated token
  },
  onError: (err, req, res) => {
    console.error('Proxy error:', err);
    res.status(500).json({ message: 'Proxy error' });
  }
}));

app.listen(port, () => {
  console.log(`Gateway listening at http://localhost:${port}`);
});
