const express = require('express');

const test = require('./test');
const { errorHandler } = require('../../utils/errorHandler');

const router = express.Router();

router.use(test);
router.use(errorHandler);

module.exports = router;
