const crypto = require('crypto');
const axios = require('axios');

// --- 1. Configuration ---
const STRAPI_URL = 'http://localhost:1337';
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

if (!BOT_TOKEN) {
  console.error('Error: TELEGRAM_BOT_TOKEN is not set in your environment variables.');
  console.error('Please add it to your .env file and try again.');
  process.exit(1);
}

// --- 2. Test User Data ---
// This simulates the data received from the Telegram login widget.
const userData = {
  id: 123456789, // Use a unique ID for testing
  first_name: 'Test',
  last_name: 'User',
  username: 'testuser',
  photo_url: 'https://t.me/i/userpic/320/testuser.jpg',
  auth_date: Math.floor(Date.now() / 1000),
};

// --- 3. Generate Telegram Hash ---
const dataCheckString = Object.keys(userData)
  .sort()
  .map(key => `${key}=${userData[key]}`)
  .join('\n');

const secret = crypto.createHash('sha256').update(BOT_TOKEN).digest();
const hmac = crypto.createHmac('sha256', secret).update(dataCheckString).digest('hex');

// --- 4. Construct Callback URL ---
const params = new URLSearchParams({
  ...userData,
  hash: hmac,
});

const callbackUrl = `${STRAPI_URL}/api/auth/telegram/callback?${params.toString()}`;

// --- 5. Make the API Request ---
async function testTelegramAuth() {
  console.log('Sending request to:', callbackUrl);
  try {
    const response = await axios.get(callbackUrl);
    console.log('\n✅ Success! Authentication successful.');
    console.log('\n--- Server Response ---');
    console.log(response.data);
  } catch (error) {
    console.error('\n❌ Error! Authentication failed.');
    if (error.response) {
      console.error('\n--- Server Error Response ---');
      console.error(`Status: ${error.response.status}`);
      console.error('Data:', error.response.data);
    } else {
      console.error('Error:', error.message);
    }
  }
}

testTelegramAuth();