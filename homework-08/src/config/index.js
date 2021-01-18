require('dotenv').config();

const { fatal } = require('../utils/fatal');

const config = {
  port: process.env.PORT || 3000,
  db: {
    defaultType: process.env.DB_WRAPPER_TYPE || 'pg',
    config: {
      pg: {
        user: process.env.DB_USER || fatal('user not defined'),
        host: process.env.DB_HOST || fatal('host not defined'),
        port: process.env.DB_PORT || fatal('port not defined'),
        database: process.env.DB_NAME || fatal('db not defined'),
        password: process.env.DB_PASS || fatal('password not defined'),
      },
      knex: {
        client: 'pg',
        connection: {
          user: process.env.DB_USER || fatal('user not defined'),
          host: process.env.DB_HOST || fatal('host not defined'),
          port: process.env.DB_PORT || fatal('port not defined'),
          database: process.env.DB_NAME || fatal('db not defined'),
          password: process.env.DB_PASS || fatal('password not defined'),
        },
        pool: {
          min: 2,
          max: 10,
        },
        debug: false,
        migrations: {
          tableName: 'knex_migrations',
        },
      },
      sequelize: {
        dialect: 'postgres',
        username: process.env.DB_USER || fatal('user not defined'),
        host: process.env.DB_HOST || fatal('host not defined'),
        port: process.env.DB_PORT || fatal('port not defined'),
        database: process.env.DB_NAME || fatal('db not defined'),
        password: process.env.DB_PASS || fatal('password not defined'),
        pool: {
          min: 0,
          max: 10,
          idle: 5000,
          acquire: 5000,
          evict: 5000,
        },
        logging: false,
      },
    },
  },
  tables: {
    products: 'products',
    colors: 'colors',
    types: 'types',
  },
  folders: {
    UPLOAD: process.env.UPLOAD || `${process.cwd()}/upload`,
  },
};

module.exports = config;
