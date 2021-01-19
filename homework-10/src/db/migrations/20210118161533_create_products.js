exports.up = function (knex) {
  return knex.schema.createTable('products', (t) => {
    t.increments('id').primary();
    t.string('type', 255).notNullable();
    t.string('color', 255).notNullable();
    t.decimal('price').nullable().default(0.0);
    t.integer('quantity').notNullable().default(1);
    t.unique(['price']);
    t.timestamps();
  });
};

exports.down = function (knex) {
  knex.schema.dropTable('products');
};
