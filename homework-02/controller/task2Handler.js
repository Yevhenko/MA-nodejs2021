const { task2 } = require('../previousHomework/tasks');
const { success } = require('../utils');

function getTask2(response) {
  const data = task2;
  success(response, data);
}

module.exports = { getTask2 };
