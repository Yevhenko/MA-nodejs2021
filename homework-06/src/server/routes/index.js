const express = require('express');

const products = require('./products');

const router = express.Router();

const { errorHandler } = require('../../utils/errorHandler');

router.use(products);
router.use(errorHandler);

module.exports = router;
