require('dotenv').config();

const config = {
  port: process.env.PORT || 3000,
  tables: {
    products: 'products',
    colors: 'colors',
    types: 'types',
  },
  folders: {
    UPLOAD: process.env.UPLOAD || `${process.cwd()}/upload`,
  },
  accessSecret: process.env.ACCESS,
  refreshSecret: process.env.REFRESH,
  tokenLife: 60,
  refreshTokenLife: 120,
};

module.exports = config;
