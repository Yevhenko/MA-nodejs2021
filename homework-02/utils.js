function notFound(response) {
  response.setHeader('Content-Type', 'application/json');
  response.statusCode = 404;
  response.write('Not found');
  response.end();
}

function success(response, data) {
  response.writeHead(200).end(JSON.stringify(data));
}

module.exports = { notFound, success };
