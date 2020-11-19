const testArray = require('./clothes.json');

function filterByKey(array, key, item) {
  return array.filter((element) => element[key] === item);
}

function filterByPrice(array) {
  const theMostExpensiveGood = { theBiggestPrice: 0, goods: {} };
  const regexp = new RegExp(/\d+/);
  array.map((e) => {
    const newItem = {};
    const calculatePrice = Number(regexp.exec(e.price || e.priceForPair));

    newItem.quantity = e.quantity || 0;
    newItem.price = calculatePrice * newItem.quantity;
    if (newItem.price > theMostExpensiveGood.theBiggestPrice) {
      theMostExpensiveGood.theBiggestPrice = newItem.price;
      theMostExpensiveGood.goods = e;
    }
    return newItem;
  });
  return theMostExpensiveGood.goods;
}

function regulateAnArray(array) {
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
}

module.exports = filterByPrice(testArray);
module.exports = { regulateAnArray, filterByKey };
