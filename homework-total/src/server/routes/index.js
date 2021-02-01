const express = require('express');

const loginAndRefresh = require('./loginAndRefresh');
const order = require('./order');
const orderProduct = require('./orderProduct');
const price = require('./price');
const { errorHandler } = require('../../utils/errorHandler');
const { authenticate } = require('../../utils/auth');

const router = express.Router();

router.use(loginAndRefresh);
// router.use(authenticate);
router.use(order);
router.use(orderProduct);
router.use(price);
router.use(errorHandler);

module.exports = router;
