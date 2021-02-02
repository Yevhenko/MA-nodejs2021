const express = require('express');

const price = express.Router();

const { getPrice } = require('../controller');

price.get('/price', async (req, res, next) => {
  try {
    const { query } = req;

    const orderId = Number(query.id);

    if (!orderId) {
      res.status(404).send('Not found');
    }

    const response = await getPrice(query);

    res.json(response);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = price;
