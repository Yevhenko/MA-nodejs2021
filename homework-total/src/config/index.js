require('dotenv').config();

const config = {
  port: process.env.PORT || 3000,
  accessSecret: process.env.ACCESS,
  refreshSecret: process.env.REFRESH,
  tokenLife: 60,
  refreshTokenLife: 120,
};

module.exports = config;
