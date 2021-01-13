/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const { readdirSync } = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const modelsDir = path.join(__dirname, './models');

const name = 'sequelize';

module.exports = (config) => {
  const sequelize = new Sequelize(config);
  const db = {};

  readdirSync(modelsDir)
    .filter((file) => file.indexOf('.') !== 0 && file.slice(-3) === '.js')
    .forEach((file) => {
      const model = require(path.join(modelsDir, file))(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
    });

  return {
    testConnection: async () => {
      try {
        console.log(`Hello from ${name} testconnection.`);
        await sequelize.authenticate();
      } catch (error) {
        console.error('testConnection >> ', error.message || error);
        throw error;
      }
    },

    close: async () => {
      console.log('INFO: Closing pg DB wrapper');
      return sequelize.close();
    },

    // eslint-disable-next-line object-curly-newline
    createProduct: async (product) => {
      try {
        if (!product.type) {
          throw new Error('ERROR: no product color defined');
        }
        if (!product.color) {
          throw new Error('ERROR: no product color defined');
        }

        const p = JSON.parse(JSON.stringify(product));
        const timestamp = Date.now();

        delete p.id;
        p.price = p.price || 0;
        p.quantity = p.quantity || 0;
        p.created_at = timestamp;
        p.updated_at = timestamp;

        const res = await db.Product.create(p);
        console.log(`DEBUG: new product created: ${JSON.stringify(res)}`);
        return res;
      } catch (err) {
        console.error(err || err.message);
        throw err;
      }
    },

    getProduct: async (id) => {
      try {
        if (!id) {
          throw new Error('ERROR: No product id defined!');
        }

        const res = await db.Product.findOne({
          where: {
            id,
            deletedAt: { [Sequelize.Op.is]: null },
          },
        });

        return res;
      } catch (error) {
        console.error('getProduct >> ', error.message || error);
        throw error;
      }
    },

    updateProduct: async ({ id, ...product }) => {
      try {
        if (!id) {
          throw new Error('ERROR: No product id defined!');
        }

        if (!Object.keys(product).length) {
          throw new Error('ERROR: Nothing to update!');
        }

        const res = await db.Product.update(product, { where: { id }, returnin: true });

        console.log(`DEBUG: Product was updated: ${JSON.stringify(res[1][0])}`);
        return res.rows[1][0];
      } catch (error) {
        console.error('updateProduct >> ', error.message || error);
        throw error;
      }
    },

    deleteProduct: async (id) => {
      try {
        if (!id) {
          throw new Error('ERROR: No product id defined!');
        }

        await db.Product.destroy({ where: { id } });

        console.log(`DEBUG: Product ${id} has been removed.`);
        return true;
      } catch (error) {
        console.error('deleteProduct >> ', error.message || error);
        throw error;
      }
    },
  };
};
