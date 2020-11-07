/* eslint-disable max-len */
const testArray = require('../../array.json');

function filterByPrice(array) {
  const theMostExpensiveGood = { theBiggestPrice: 0, goods: {} };
  const regexp = new RegExp(/\d+/);
  for (let i = 0; i < array.length; i += 1) {
    // eslint-disable-next-line prettier/prettier
    const price = Number(regexp.exec(array[i].price || array[i].priceForPair)) * array[i].quantity || 0;
    if (price > theMostExpensiveGood.theBiggestPrice) {
      theMostExpensiveGood.theBiggestPrice = price;
      theMostExpensiveGood.goods = array[i];
    }
  }
  return theMostExpensiveGood.goods;
}

module.exports = filterByPrice(testArray);
