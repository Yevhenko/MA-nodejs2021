const { task2 } = require('../previousHomework/tasks');

function getTask2(response) {
  console.log(task2);
  response.writeHead(200).end('Success!');
}

module.exports = { getTask2 };
