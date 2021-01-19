exports.up = function (knex) {
  return knex.schema.createTable('orders', (t) => {
    t.increments('id').primary();
    t.string('status');
    t.timestamps();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('orders');
};
