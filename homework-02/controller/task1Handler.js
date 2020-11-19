const { filterByKey } = require('../previousHomework');
const { success } = require('../utils');
const array = require('../clothes.json');

function getTask1(response, queryParams) {
  try {
    const data = filterByKey(array, JSON.stringify(queryParams));
    success(response, data);
  } catch (error) {
    response.writeHead(500).end();
  }
}

module.exports = { getTask1 };
