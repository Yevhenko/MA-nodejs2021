const { Pool } = require('pg');

module.exports = (config) => {
  const client = new Pool(config);

  return {
    testConnection: async () => {
      try {
        console.log('testConnection');
        await client.query('SELECT NOW()');
      } catch (err) {
        console.error(err || err.message);
        throw err;
      }
    },
    close: async () => {
      console.log('INFO: Closing pg DB wrapper');
      client.end();
    },
    // eslint-disable-next-line object-curly-newline
    createProduct: async ({ type, color, price = 0, quantity = 1 }) => {
      try {
        if (!type) {
          throw new Error('ERROR: no product color defined');
        }
        if (!color) {
          throw new Error('ERROR: no product color defined');
        }

        const timestamp = new Date();
        const res = await client.query(
          'INSERT INTO products(type, color, price, created_at, updated_at) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *',
          [type, color, price, quantity, timestamp, timestamp, null],
        );
        console.log(`DEBUG: new product created: ${JSON.stringify(res.rows[0])}`);
        return res.rows[0];
      } catch (err) {
        console.error(err || err.message);
        throw err;
      }
    },
    getProduct: async (id) => {
      try {
        if (!id) {
          throw new Error('ERROR: no product id defined');
        }
        const res = await client.query(
          'SELECT * FROM products WHERE id = $1 and deleted_at IS NULL',
          [id],
        );

        return res.rows[0];
      } catch (err) {
        console.error(err || err.message);
        throw err;
      }
    },
    updateProduct: async ({ id, ...product }) => {
      try {
        if (!id) {
          throw new Error('ERROR: no product is defined');
        }

        const query = [];
        const values = [];

        // eslint-disable-next-line no-restricted-syntax
        for (const [i, [k, v]] of Object.entries(product).entries()) {
          query.push(`${k} = $${i + 1}`);
          values.push(v);
        }

        if (!values.length) {
          throw new Error('ERROR: nothing to update');
        }

        values.push(id);

        const res = await client.query(
          `UPDATE products SET ${query.join(',')} WHERE id = $${values.length} RETURNING *`,
          values,
        );

        console.log(`DEBUG: product updated: ${JSON.stringify(res.rows[0])}`);
      } catch (err) {
        console.error(err || err.message);
        throw err;
      }
    },
    deleteProduct: async (id) => {
      try {
        if (!id) {
          throw new Error('ERROR: no product id defined');
        }
        await client.query('DELETE FROM products WHERE id = $1', [id]);
        return true;
      } catch (err) {
        console.error(err || err.message);
        throw err;
      }
    },
  };
};
