const express = require('express');

const uploadcsv = require('./uploadcsv');
const listOfFiles = require('./listOfFiles');
const optimize = require('./optimizeJson');
const { errorHandler } = require('../../utills/errorHandler');

const router = express.Router();

router.use(uploadcsv);
router.use(listOfFiles);
router.use(optimize);
router.use(errorHandler);

module.exports = router;
