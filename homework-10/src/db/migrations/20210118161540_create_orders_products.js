exports.up = function (knex) {
  return knex.schema.createTable('orders_products', (t) => {
    t.increments('id').primary();
    t.integer('order_id').references('id').inTable('products');
    t.integer('product_id').references('id').inTable('orders');
    t.unique(['order_id', 'product_id']);
    t.timestamps();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('orders_products');
};
