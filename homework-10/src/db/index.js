const Knex = require('knex');
const config = require('../config').db;

const knex = new Knex(config);

module.exports = knex;
