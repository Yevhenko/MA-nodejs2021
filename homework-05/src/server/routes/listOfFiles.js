const express = require('express');
const { getListOfFiles } = require('../controller');

const listOfFiles = express.Router();

listOfFiles.get('/listOfFiles', async (req, res, next) => {
  try {
    await getListOfFiles(res);

    res.end('Success!');
  } catch (error) {
    next(error);
  }
});

module.exports = listOfFiles;
