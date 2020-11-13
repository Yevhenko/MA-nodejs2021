const { getTask1 } = require('./controller/task1Handler');
const { getTask2 } = require('./controller/task2Handler');
const { getTask3 } = require('./controller/task3Handler');
const { setNewArray } = require('./controller/newArraySetter');

module.exports = (request, response) => {
  // eslint-disable-next-line object-curly-newline
  const { method, url, queryParams, body } = request;

  switch (url.pathname) {
    case '/task1':
      if (method === 'GET' && queryParams) getTask1(response, queryParams);
      else {
        response.writeHead(404, { 'Content-Type': 'application/json' });
        response.end('Not Found');
      }
      break;
    case '/task2':
      if (method === 'GET') getTask2(response);
      else {
        response.writeHead(404, { 'Content-Type': 'application/json' });
        response.end('Not found');
      }
      break;
    case '/task3':
      if (method === 'GET') getTask3(response);
      else {
        response.writeHead(404, { 'Content-Type': 'application/json' });
        response.end('Not found');
      }
      break;
    case '/newArray':
      if (method === 'POST') setNewArray(response, body);
      else {
        response.writeHead(404, { 'Content-Type': 'application/json' });
        response.end('Not found');
      }
      break;

    default:
      response.writeHead(404, { 'Content-Type': 'application/json' });
      response.end('Not Found');
      break;
  }
};
