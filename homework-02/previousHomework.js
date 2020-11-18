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
  return array.map((e) => {
    const sampleOfTheElement = {};
    sampleOfTheElement.type = e.type;
    sampleOfTheElement.color = e.color;
    sampleOfTheElement.quantity = e.quantity || 0;
    sampleOfTheElement.price = e.price || e.priceForPair;

    return sampleOfTheElement;
  });
}

module.exports = filterByPrice(testArray);
module.exports = { regulateAnArray, filterByKey };
