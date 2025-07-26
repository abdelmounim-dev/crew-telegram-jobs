const axios = require("axios");
const crypto = require("crypto");

const BOT_TOKEN = "8319236603:AAEEDn6258A6lO_63Ex5IL-pzUrU-oUmBtI"; // Replace this
const STRAPI_URL = "http://localhost:1337"; // Replace with your actual URL

const telegramUser = {
  id: 123456789, // Replace with real Telegram ID
  first_name: "John",
  last_name: "Doe",
  username: "johndoe",
  auth_date: Math.floor(Date.now() / 1000), // Current timestamp
};

// Step 1: Generate the Telegram hash
function generateHash(data, token) {
  const secret = crypto.createHash("sha256").update(token).digest();
  const sorted = Object.keys(data)
    .sort()
    .map((key) => `${key}=${data[key]}`)
    .join("\n");

  const hmac = crypto.createHmac("sha256", secret).update(sorted).digest("hex");
  return hmac;
}

// Step 2: Send POST request
async function testTelegramLogin() {
  const payload = {
    ...telegramUser,
    hash: generateHash(telegramUser, BOT_TOKEN),
  };

  try {
    const res = await axios.post(
      `${STRAPI_URL}/api/auth/telegram/callback`,
      payload,
    );
    console.log("✅ Login successful:", res.data);
  } catch (err) {
    if (err.response) {
      console.error("❌ Server error:", err.response.data);
    } else {
      console.error("❌ Error:", err.message);
    }
  }
}

testTelegramLogin();
