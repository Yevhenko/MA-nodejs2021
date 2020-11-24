function notFound(response) {
    response.setHeader('Content-Type', 'application/json');
    response.statusCode = 404;
    response.write('Not found');
    response.end();
  }

    
function arrayModifier(array) {
  return array.map(element => {
    if (!element.quantity) element.quantity = 0;
    if (element.priceForPair) {
      element.price = element.priceForPair;
      delete element.priceForPair;
    }

    return element;
  });
};
  
  module.exports = { notFound, arrayModifier };