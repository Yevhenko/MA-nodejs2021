const express = require('express');

const uploadcsv = require('./uploadcsv');
const listOfFiles = require('./listOfFiles');
const optimize = require('./optimizeJson');

const router = express.Router();

router.use(uploadcsv);
router.use(listOfFiles);
router.use(optimize);

module.exports = router;
