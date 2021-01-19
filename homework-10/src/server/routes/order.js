const express = require('express');

const order = express.Router();

const { createOrder } = require('../controller');

order.post('/order', async (req, res, next) => {
  try {
    const { body } = req;

    if (!body) res.status(400).send('No data');

    const response = await createOrder(body);

    res.json(response);
  } catch (error) {
    next(error);
  }
})

module.exports = order;