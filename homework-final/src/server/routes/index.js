const express = require('express');

const loginAndRefresh = require('./loginAndRefresh');
const products = require('./products');
const order = require('./order');
const test = require('./test');
const { errorHandler } = require('../../utils/errorHandler');
const { authenticate } = require('../../utils/auth');

const router = express.Router();

router.use(loginAndRefresh);
// router.use(authenticate);
router.use(products);
router.use(order);
router.use(test);
router.use(errorHandler);

module.exports = router;
