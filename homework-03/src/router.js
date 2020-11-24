const { notFound } = require("../utils");

const { calculateDiscountCallback, calculateDiscountAsync, calculateDiscountPromise } = require('./controller');


module.exports = async (request, response) => {
  // eslint-disable-next-line object-curly-newline
  const { method, url,  body } = request;

  if (method === 'POST' && url.pathname === '/calculateDiscountCallback') {
     calculateDiscountCallback(response, body);
  } else if (method === 'POST' && url.pathname === '/calculateDiscountPromise') {
    calculateDiscountPromise(response, body);
  } else if (method === 'POST' && url.pathname === '/calculateDiscountAsync') {
    await calculateDiscountAsync(response, body);
  }
  else notFound(response);
};
