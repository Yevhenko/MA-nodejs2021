const { task1 } = require('../previousHomework/tasks');
const { success } = require('../utils');
const array = require('../clothes.json');

function getTask1(response, queryParams) {
  const data = task1(array, JSON.stringify(queryParams));
  success(response, data);
}

module.exports = { getTask1 };
