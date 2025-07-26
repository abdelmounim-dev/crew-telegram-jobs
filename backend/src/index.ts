import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }: { strapi: Core.Strapi }) {
    const crypto = require('crypto');

    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

    function checkTelegramAuth(data: any) {
      const { hash, ...checkData } = data;
      const dataCheckString = Object.keys(checkData)
        .sort()
        .map(key => `${key}=${checkData[key]}`)
        .join('\n');

      const secret = crypto.createHash('sha256').update(BOT_TOKEN).digest();
      const hmac = crypto.createHmac('sha256', secret).update(dataCheckString).digest('hex');

      return hmac === hash;
    }

    strapi
      .plugin("users-permissions")
      .service("providers-registry")
      .add("telegram", {
        displayName: "Telegram",
        icon: "telegram",
        enabled: true,
        check: "true",
        authCallback: async (query: any) => {
          const data = query;

          if (!checkTelegramAuth(data)) {
            console.log('Invalid Telegram signature'); // Added for debugging
            throw new Error('Invalid Telegram signature');
          }
          console.log('Telegram callback hit!', data); // Added for debugging

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

          return user;
        },
      });
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/* { strapi }: { strapi: Core.Strapi } */) {},
};
