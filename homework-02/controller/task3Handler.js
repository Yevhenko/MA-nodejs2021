const { task3 } = require('../previousHomework/tasks');
const array = require('../array.json');

function getTask3(response) {
  console.log(task3(array));
  response.writeHead(200).end('Success!');
}

module.exports = { getTask3 };
