const express = require('express');
const { uploadCsv } = require('../controller');

const uploadcsv = express.Router();

uploadcsv.put('/uploadcsv', async (req, res, next) => {
  try {
    await uploadCsv(req);

    res.end('Success!');
  } catch (error) {
    next(error);
  }
});

module.exports = uploadcsv;
