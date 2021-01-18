const express = require('express');

const test = express.Router();

test.post('/test', async (req, res, next) => {
  try {
    const { body } = req;

    if (!body) {
      res.status(404).send('Not found');
    }

    res.send(body);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = test;
