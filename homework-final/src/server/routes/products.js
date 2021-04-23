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

products.post('/products', async (req, res, next) => {
  try {
    const { body } = req;

    if (!body) {
      res.status(404).send('Not found');
    }
    const response = await createProduct(body);

    res.send(response);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// products.post('/db/push/:filename', fromJSONtoDB);

products.get('/products', async (req, res, next) => {
  try {
    const { query } = req;
    const idOfProduct = Number(req.query.id, 10);

    if (!idOfProduct) {
      res.status(404).send('Not found');
    }

    const gotProducts = await getProduct(query);
    res.send(gotProducts);
  } catch (error) {
    next(error);
  }
});

products.put('/products', async (req, res, next) => {
  try {
    const { body, query } = req;
    const idOfProduct = Number(req.query.id, 10);

    if (!idOfProduct) {
      res.status(404).send('Not found');
    }

    await updateProduct(body, query);

    res.end('Product updated!');
  } catch (error) {
    next(error);
  }
});

products.delete('/products', async (req, res, next) => {
  try {
    const { query } = req;
    const idOfProduct = Number(req.query.id, 10);

    if (!idOfProduct) {
      res.status(404).send('Not found');
    }

    await deleteProduct(query);

    res.end('Product deleted!');
  } catch (error) {
    next(error);
  }
});

module.exports = products;
