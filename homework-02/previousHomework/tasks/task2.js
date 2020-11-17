/* eslint-disable max-len */
const testArray = require('../../clothes.json');

function filterByPrice(array) {
  const theMostExpensiveGood = { theBiggestPrice: 0, goods: {} };
  const regexp = new RegExp(/\d+/);
  array.forEach((element) => {
    const quantity = element.quantity || 0;
    const price = Number(regexp.exec(element.price || element.priceForPair)) * quantity;
    if (price > theMostExpensiveGood.theBiggestPrice) {
      theMostExpensiveGood.theBiggestPrice = price;
      theMostExpensiveGood.goods = element;
    }
  });

  return theMostExpensiveGood.goods;
}

module.exports = filterByPrice(testArray);
