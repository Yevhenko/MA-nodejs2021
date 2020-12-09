const express = require('express');
const { optimizeJson } = require('../controller');

const optimize = express.Router();

optimize.put('/optimize/:file', async (req, res) => {
  try {
    await optimizeJson(req, res);
    return res.end('Success!');
  } catch (error) {
    console.error(error);
    return res.status(500).send('error');
  }
});

module.exports = optimize;
