const { filterByPrice } = require('../previousHomework');
const { success } = require('../utils');

function getTask2(response) {
  const data = filterByPrice;
  success(response, data);
}

module.exports = { getTask2 };
