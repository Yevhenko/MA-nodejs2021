const express = require('express');

const order = express.Router();

// eslint-disable-next-line object-curly-newline
const { createOrder, updateOrder, processedOrder, deletedOrder } = require('../controller');

order.post('/order', async (req, res, next) => {
  try {
    const { body } = req;

    if (!body) res.sendStatus(404).send('no data');

    const response = await createOrder(body);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

order.post('/processedOrder', async (req, res, next) => {
  try {
    const { body, query } = req;

    const orderId = Number(query.id);

    if (!orderId || !body) res.sendStatus(404).send('no data');

    const response = await processedOrder(body, query);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

order.post('/deletedOrder', async (req, res, next) => {
  try {
    const { body, query } = req;

    const orderId = Number(query.id);

    if (!orderId || !body) res.sendStatus(404).send('no data');

    const response = await deletedOrder(body, query);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

order.put('/order', async (req, res, next) => {
  try {
    const { body, query } = req;

    const orderId = Number(query.id);

    if (!orderId || !body) res.sendStatus(404).send('no data');

    const response = await updateOrder(body, query);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = order;
