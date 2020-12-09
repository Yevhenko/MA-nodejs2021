const express = require('express');
const { getListOfFiles } = require('../controller');

const listOfFiles = express.Router();

listOfFiles.get('/listOfFiles', async (req, res) => {
  try {
    await getListOfFiles(res);

    return res.end('Success!');
  } catch (error) {
    console.error(error);
    return res.status(500).send('error');
  }
});

module.exports = listOfFiles;
