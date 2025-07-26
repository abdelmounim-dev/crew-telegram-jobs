'use strict';

const crypto = require('crypto');

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

function checkTelegramAuth(data) {
  const { hash, ...checkData } = data;
  const dataCheckString = Object.keys(checkData)
    .sort()
    .map(key => `${key}=${checkData[key]}`)
    .join('\n');

  const secret = crypto.createHash('sha256').update(BOT_TOKEN).digest();
  const hmac = crypto.createHmac('sha256', secret).update(dataCheckString).digest('hex');

  return hmac === hash;
}

module.exports = {
  async telegramCallback(ctx) {
    const data = ctx.request.body;

    if (!checkTelegramAuth(data)) {
      return ctx.unauthorized('Invalid Telegram signature');
    }

    const { id, username, first_name, last_name } = data;

    // Check if user exists
    const existingUser = await strapi.query('plugin::users-permissions.user').findOne({
      where: { telegram_id: id },
    });

    let user;
    if (existingUser) {
      user = existingUser;
    } else {
      user = await strapi.query('plugin::users-permissions.user').create({
        data: {
          username: username || `tg_${id}`,
          telegram_id: id,
          email: `${id}@telegram.fake`, // Telegram doesn’t provide real email
          provider: 'telegram',
          confirmed: true,
        },
      });
    }

    // Issue JWT
    const token = strapi.plugins['users-permissions'].services.jwt.issue({
      id: user.id,
    });

    ctx.send({
      jwt: token,
      user,
    });
  },
};

