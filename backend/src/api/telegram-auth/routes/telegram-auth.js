'use strict';

module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/auth/telegram/callback',
      handler: 'telegram-auth.telegramCallback',
      config: {
        auth: false,
      },
    },
  ],
};
