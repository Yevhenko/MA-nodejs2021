const express = require('express');
const { optimizeJson } = require('../controller');

const optimize = express.Router();

optimize.put('/optimize/:file', async (req, res, next) => {
  try {
    await optimizeJson(req, res);
    res.end('Success!');
  } catch (error) {
    next(error);
  }
});

module.exports = optimize;
