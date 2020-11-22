module.exports = (request, response) => {
  // eslint-disable-next-line object-curly-newline
  const { method, url, queryParams, body } = request;

  if (method === 'GET' && url.pathname === '/calculateDiscount1') getTask1(response, queryParams);
  else notFound(response);
};
