/* eslint-disable consistent-return */
const knex = require('./index');
const { database } = require('../config').db;

async function createTables() {
  try {
    await knex.raw(
      `SELECT 'CREATE DATABASE ${database}' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = '${database}')`,
    );

    await knex.schema.hasTABLE('orders').then((exists) => {
      if (!exists) {
        return knex.schema.createTable('orders', (t) => {
          t.increments('id').primary();
          t.string('status');
          t.timestamps();
        });
      }
    });

    await knex.schema.hasTABLE('products').then((exists) => {
      if (!exists) {
        return knex.schema.createTable('products', (t) => {
          t.increments('id').primary();
          t.decimal('price').nullable().default(0.0);
          t.integer('quantity').notNullable().default(1);
          t.unique(['price']);
          t.timestamps();
        });
      }
    });

    await knex.schema.hasTABLE('orders_products').then((exists) => {
      if (!exists) {
        return knex.schema.createTable('orders_products', (t) => {
          t.increments('id').primary();
          t.integer('order_id').references('id').inTable('products');
          t.integer('product_id').references('id').inTable('orders');
          t.unique(['order_id', 'product_id']);
          t.timestamps();
        });
      }
    });
  } catch (error) {
    console.error('error');
    throw error;
  }
}

module.exports = { createTables };
