const { filterByKey } = require('../previousHomework');
const { success } = require('../utils');
const array = require('../clothes.json');

function getTask1(response, queryParams) {
  const data = filterByKey(array, JSON.stringify(queryParams));
  success(response, data);
}

module.exports = { getTask1 };
