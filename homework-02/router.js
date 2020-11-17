const { getTask1 } = require('./controller/task1Handler');
const { getTask2 } = require('./controller/task2Handler');
const { getTask3 } = require('./controller/task3Handler');
const { setNewArray } = require('./controller/newArraySetter');
const { notFound } = require('./utils');

module.exports = (request, response) => {
  // eslint-disable-next-line object-curly-newline
  const { method, url, queryParams, body } = request;

  switch (url.pathname) {
    case '/task1':
      if (method === 'GET' && queryParams) getTask1(response, queryParams);
      else notFound(response);
      break;
    case '/task2':
      if (method === 'GET') getTask2(response);
      else notFound(response);
      break;
    case '/task3':
      if (method === 'GET') getTask3(response);
      else notFound(response);
      break;
    case '/newArray':
      if (method === 'POST') setNewArray(response, body);
      else notFound(response);
      break;

    default:
      notFound(response);
      break;
  }
};
