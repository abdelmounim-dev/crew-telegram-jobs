const axios = require('axios');

// Replace with your actual bot token
const BOT_TOKEN = 'YOUR_TELEGRAM_BOT_TOKEN';

// Dummy user data (replace with actual data from Telegram login widget)
const userData = {
    id: 123456789,
    first_name: 'Test',
    last_name: 'User',
    username: 'testuser',
    photo_url: 'https://t.me/i/userpic/320/testuser.jpg',
    auth_date: Math.floor(Date.now() / 1000),
    hash: 'YOUR_GENERATED_HASH' // This needs to be dynamically generated or replaced
};

async function testTelegramAuth() {
    try {
        const response = await axios.post('http://localhost:5000/auth/telegram', userData);
        console.log('Authentication successful:', response.data);
    } catch (error) {
        console.error('Authentication failed:', error.response ? error.response.data : error.message);
    }
}

testTelegramAuth();
