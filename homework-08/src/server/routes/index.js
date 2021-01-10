const express = require('express');

const products = require('./products');
const { errorHandler } = require('../../utils/errorHandler');

const router = express.Router();

router.use(products);
router.use(errorHandler);

module.exports = router;
