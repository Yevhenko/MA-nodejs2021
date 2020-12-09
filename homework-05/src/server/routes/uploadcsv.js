const express = require('express');
const { uploadCsv } = require('../controller');

const uploadcsv = express.Router();

uploadcsv.put('/uploadcsv', async (req, res) => {
  try {
    await uploadCsv(req);

    return res.end('Success!');
  } catch (error) {
    console.error(error);
    return res.status(500).send('error');
  }
});

module.exports = uploadcsv;
