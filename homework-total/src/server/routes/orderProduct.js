const express = require('express');

const orderProduct = express.Router();

const { createOrderProduct, deleteOrderProduct } = require('../controller');

orderProduct.post('/orderProduct', async (req, res, next) => {
  try {
    const { body } = req;

    if (!body) res.sendStatus(404).send('no data');

    await createOrderProduct(body);
    res.json('created');
  } catch (error) {
    next(error);
  }
});

orderProduct.delete('/orderProduct', async (req, res, next) => {
  try {
    const { query } = req;

    const orderProductId = Number(query.id);

    if (!orderProductId) res.sendStatus(404).send('no data');

    await deleteOrderProduct(query);
    res.json('deleted');
  } catch (error) {
    next(error);
  }
});

module.exports = orderProduct;
