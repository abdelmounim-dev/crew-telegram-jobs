'use strict';

const telegramAuthRoutes = require('./telegram-auth');

module.exports = [
  ...telegramAuthRoutes.routes,
];
