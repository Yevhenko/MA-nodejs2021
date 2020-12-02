function notFound(response) {
  response.setHeader('Content-Type', 'application/json');
  response.statusCode = 404;
  response.write('Not found');
  response.end();
}

module.exports = { notFound };
