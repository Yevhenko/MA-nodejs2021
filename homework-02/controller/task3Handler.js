const { task3 } = require('../previousHomework/tasks');
const { success } = require('../utils');
const array = require('../clothes.json');

function getTask3(response) {
  const data = task3(array);
  success(response, data);
}

module.exports = { getTask3 };
