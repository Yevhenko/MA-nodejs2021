const { getTask1 } = require('./controller/task1Handler');
const { getTask2 } = require('./controller/task2Handler');
const { getTask3 } = require('./controller/task3Handler');
const { setNewArray } = require('./controller/newArraySetter');
const { notFound } = require('./utils');

module.exports = (request, response) => {
  // eslint-disable-next-line object-curly-newline
  const { method, url, queryParams, body } = request;

  if (method === 'GET' && url.pathname === '/task1') getTask1(response, queryParams);
  else if (method === 'GET' && url.pathname === '/task2') getTask2(response);
  else if (method === 'GET' && url.pathname === '/task3') getTask3(response);
  else if (method === 'POST' && url.pathname === '/newArray') setNewArray(response, body);
  else notFound(response);
};
