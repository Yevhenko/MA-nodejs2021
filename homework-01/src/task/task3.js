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

module.exports = regulateAnArray;
