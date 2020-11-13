const { task1 } = require('../previousHomework/tasks');
const array = require('../array.json');

function getTask1(response, queryParams) {
  console.log(task1(array, JSON.stringify(queryParams)));
  response.writeHead(200).end('Success!');
}

module.exports = { getTask1 };
