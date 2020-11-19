const { regulateAnArray } = require('../previousHomework');
const { success } = require('../utils');
const array = require('../clothes.json');

function getTask3(response) {
  try {
    const data = regulateAnArray(array);
    success(response, data);
  } catch (error) {
    response.writeHead(500).end();
  }
}

module.exports = { getTask3 };
