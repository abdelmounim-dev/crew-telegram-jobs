
const crypto = require('crypto');

const testTelegramAuth = async () => {
  const url = 'http://localhost:3000/auth/telegram';
  const botToken = '8319236603:AAEEDn6258A6lO_63Ex5IL-pzUrU-oUmBtI'; // IMPORTANT: Replace with your actual bot token

  const data = {
    telegram_id: '123456789',
    first_name: 'John',
    last_name: 'Doe',
    username: 'john_doe',
    photo_url: 'https://example.com/photo.jpg',
    auth_date: Math.floor(Date.now() / 1000),
  };

  const dataCheckString = Object.keys(data)
    .filter(key => key !== 'hash')
    .sort() // Ensure keys are sorted alphabetically
    .map(key => `${key}=${data[key]}`)
    .join('\n');

  const secretKey = crypto.createHmac('sha256', 'WebAppData').update(botToken).digest();
  const hash = crypto.createHmac('sha256', secretKey).update(dataCheckString).digest('hex');

  data.hash = hash;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log('Response Status:', response.status);
    console.log('Response Body:', result);
  } catch (error) {
    console.error('Error during Telegram authentication test:', error);
  }
};

testTelegramAuth();
