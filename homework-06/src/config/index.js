require('dotenv').config();

const { fatal } = require('../utils/fatal');

const config = {
  port: process.env.PORT || 3000,
  db: {
    user: process.env.DB_USER || fatal('user not defined'),
    host: process.env.DB_HOST || fatal('host not defined'),
    port: process.env.DB_PORT || fatal('port not defined'),
    database: process.env.DB_NAME || fatal('db not defined'),
    password: process.env.DB_PASS || fatal('password not defined'),
  },
  folders: {
    UPLOAD: process.env.UPLOAD || `${process.cwd()}/uploads`,
  },
};

module.exports = config;
