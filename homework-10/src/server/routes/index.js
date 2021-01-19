const express = require('express');

const order = require('./order');
const test = require('./test');
const { errorHandler } = require('../../utils/errorHandler');

const router = express.Router();

router.use(order);
router.use(test);
router.use(errorHandler);

module.exports = router;
