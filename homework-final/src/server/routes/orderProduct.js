const express = require('express');

const orderProduct = express.Router();

const { createOrderProduct, deleteOrderProduct } = require('../controller');

orderProduct.post('/order', async (req, res, next) => {
  try {
    const { body } = req;

    if (!body) res.status(400).send('No data');

    const response = await createOrderProduct(body);

    res.json(response);
  } catch (error) {
    next(error);
  }
});

orderProduct.delete('/demand', async (req, res) => {
  try {
    const { query } = req;
    const userId = Number(req.query.id);

    if (!userId) {
      return res.status(404).send('Not found');
    }

    await deleteOrderProduct(query);

    return res.end('Order deleted!');
  } catch (error) {
    console.error(error);
    return res.status(500).send('The order cannot be deleted at the moment');
  }
});

module.exports = orderProduct;
