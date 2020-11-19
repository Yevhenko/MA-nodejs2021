const { filterByPrice } = require('../previousHomework');
const { success } = require('../utils');

function getTask2(response) {
  try {
    const data = filterByPrice;
    success(response, data);
  } catch (error) {
    response.writeHead(500).end();
  }
}

module.exports = { getTask2 };
