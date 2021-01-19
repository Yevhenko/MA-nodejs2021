const Knex = require('knex');
const {
  db: {
    config: { knex: options },
  },
} = require('../config');

const knex = new Knex(options);

module.exports = knex;
