/* eslint-disable object-curly-newline */
const express = require('express');

const {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  fromJSONtoDB,
} = require('../controller');

const products = express.Router();

products.post('/products', async (req, res) => {
  try {
    const { body } = req;

    if (!body) {
      return res.status(404).send('Not found');
    }
    const response = await createProduct(body);

    return res.send(response);
  } catch (error) {
    console.error(error);
    return res.status(500).send('The product cannot be created');
  }
});

products.post('/db/push/:filename', fromJSONtoDB);

products.get('/products', async (req, res) => {
  try {
    const { query } = req;
    const idOfProduct = parseInt(req.query.id, 10);

    if (!idOfProduct) {
      res.status(404).send('Not found');
    }

    const gotProducts = await getProduct(query);
    res.send(gotProducts);
  } catch (error) {
    console.error(error);
    res.status(500).send('The product cannot be got');
  }
});

products.put('/products', async (req, res) => {
  try {
    const { body, query } = req;
    const idOfProduct = parseInt(req.query.id, 10);

    if (!idOfProduct) {
      return res.status(404).send('Not found');
    }

    await updateProduct(body, query);

    return res.end('Product updated!');
  } catch (error) {
    console.error(error);
    return res.status(500).send('The product cannot be updated');
  }
});

products.delete('/products', async (req, res) => {
  try {
    const { query } = req;
    const idOfProduct = parseInt(req.query.id, 10);

    if (!idOfProduct) {
      return res.status(404).send('Not found');
    }

    await deleteProduct(query);

    return res.end('Product deleted!');
  } catch (error) {
    console.error(error);
    return res.status(500).send('The product cannot be deleted at the moment');
  }
});

module.exports = products;
