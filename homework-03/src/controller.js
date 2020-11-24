const { getCallbackDiscount, getAsyncDiscount, getPromiseDiscount } = require('../generateDiscount');
const { myMap } = require('../myMap');
const { arrayModifier } = require('../utils');

function calculateDiscountCallback(response, body) {
  if (!body) {
    response.writeHead(500).end();
  } else {
    const data = myMap(body, (good) => {
      const regexp = new RegExp(/\d+/);
      let sampleOfTheElement = {};
      const price = Number(regexp.exec(good.price || good.priceForPair));
      sampleOfTheElement.type = good.type;
      sampleOfTheElement.color = good.color;
      sampleOfTheElement.quantity = good.quantity || 0;
      let propperDiscounts = [];
      let theNumberOfDiscounts = 1;
        if (sampleOfTheElement.type === 'hat') {
          theNumberOfDiscounts = 2;
          if (sampleOfTheElement.color === 'red') {
            theNumberOfDiscounts = 3;
          }
        }
      getCallbackDiscount(theNumberOfDiscounts, propperDiscounts, (element) => {
        const priceWithDiscount = price * element.reduce((acc, cur) => acc * (1 - cur / 100), 1);
        sampleOfTheElement.price = priceWithDiscount;
      });

      return sampleOfTheElement;

    });
    response.writeHead(200);
    response.end(JSON.stringify(data));
  }
}

function calculateDiscountPromise(response, body) {
  if (!body) {
    response.writeHead(500).end();
  } else {
    const data = myMap(body, (good) => {
      const regexp = new RegExp(/\d+/);
      let sampleOfTheElement = {};
      const price = Number(regexp.exec(good.price || good.priceForPair));
      sampleOfTheElement.type = good.type;
      sampleOfTheElement.color = good.color;
      sampleOfTheElement.quantity = good.quantity || 0;
      let propperDiscounts = [];
      let theNumberOfDiscounts = 1;
        if (sampleOfTheElement.type === 'hat') {
          theNumberOfDiscounts = 2;
          if (sampleOfTheElement.color === 'red') {
            theNumberOfDiscounts = 3;
          }
        }
      getPromiseDiscount(theNumberOfDiscounts, propperDiscounts, (element) => {
        const priceWithDiscount = price * element.reduce((acc, cur) => acc * (1 - cur / 100), 1);
        sampleOfTheElement.price = priceWithDiscount;
      });

      return sampleOfTheElement;

    });
    response.writeHead(200);
    response.end(JSON.stringify(data));
  }
}

async function calculateDiscountAsync(response, body) {
  try {
    if (!body) {
      response.writeHead(500).end();
    } else {
      const modifiedArray = await arrayModifier(body);
      const returningArray = myMap(modifiedArray, async good => {
      const regexp = new RegExp(/\d+/);
      const price = Number(regexp.exec(good.price));
        
          good.discount = 1 - (await getAsyncDiscount()) / 100;
          if (good.type === 'hat') {
            good.discount *= 1 - (await getAsyncDiscount()) / 100;
            if (good.color === 'red') {
              good.discount *= 1 - (await getAsyncDiscount()) / 100;
            }
          }
          good.price = price;
        return good;
      });
      
      response.writeHead(200);
      response.end(JSON.stringify(Promise.all(returningArray)));
    }
  } catch (error) {
    response.writeHead(500).end();
  }
}

module.exports = { calculateDiscountCallback, calculateDiscountPromise, calculateDiscountAsync };