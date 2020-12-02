const { uploadCsv, getListOfFiles, optimizeJson } = require('./controller');
const { notFound } = require('../utils/notfound');

async function router(request, response) {
  const { url, method } = request;

  if (method === 'PUT' && url.path.startsWith('/optimize')) {
    await optimizeJson(url.path, response);
  }
  if (method === 'GET' && url.pathname === '/listOfFiles') {
    await getListOfFiles(response);
  } else {
    notFound(response);
  }
}

async function streamRoutesHandler(request, response) {
  const { url, method } = request;

  if (method === 'PUT' && url === '/uploadcsv') {
    try {
      await uploadCsv(request);
    } catch (error) {
      console.error('Failed to upload CSV-file', error);
      response.statusCode = 500;
      response.write(JSON.stringify({ message: '500 Server error' }));
      return response.end();
    }
    response.statusCode = 200;
    response.write(JSON.stringify({ message: 'OK' }));
    response.end();
  }
  return notFound(response);
}

module.exports = { router, streamRoutesHandler };
