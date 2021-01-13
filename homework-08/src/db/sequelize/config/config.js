require('dotenv').config({ path: `${process.env.PWD}/.env` });

const {
  db: {
    config: { sequelize },
  },
} = require('../../../config');

module.exports = {
  development: sequelize,
};
