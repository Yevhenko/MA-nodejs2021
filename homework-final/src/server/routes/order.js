const express = require('express');

const order = express.Router();

const { createOrder, updateOrder, processedOrder, deletedOrder } = require('../controller');

order.post('/order', async (req, res, next) => {
  try {
    const { body } = req;

    if (!body) res.status(400).send('No data');

    const response = await createOrder(body);

    res.json(response);
  } catch (error) {
    next(error);
  }
});

order.put('/order', async (req, res, next) => {
  try {
    const { body, query } = req;

    const userId = Number(query.id);

    if (!userId) res.status(400).send('No data');

    const response = await updateOrder(body, query);

    res.json(response);
  } catch (error) {
    next(error);
  }
});

order.put('/processedOrder', async (req, res, next) => {
  try {
    const { body, query } = req;

    const userId = Number(query.id);

    if (!userId) res.status(400).send('No data');

    const response = await processedOrder(body, query);

    res.json(response);
  } catch (error) {
    next(error);
  }
});
order.put('/deletedOrder', async (req, res, next) => {
  try {
    const { body, query } = req;

    const userId = Number(query.id);

    if (!userId) res.status(400).send('No data');

    const response = await deletedOrder(body, query);

    res.json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = order;
