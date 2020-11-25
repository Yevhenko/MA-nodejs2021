const { getCallbackDiscount, getAsyncDiscount, getPromiseDiscount } = require('../generateDiscount');
const { myMap } = require('../myMap');
const { arrayModifier } = require('../utils');

function calculateDiscountCallback(response, body) {
  if (!body) {
    response.writeHead(500).end();
  } else {
    const data = [];

    myMap(body, (good) => {
      const regexp = new RegExp(/\d+/);
      const sampleOfTheElement = {};
      const price = Number(regexp.exec(good.price || good.priceForPair));
      sampleOfTheElement.type = good.type;
      sampleOfTheElement.color = good.color;
      sampleOfTheElement.quantity = good.quantity || 0;
      
      let theNumberOfDiscounts = 1;
      if (sampleOfTheElement.type === 'hat') {
        theNumberOfDiscounts = 2;
        if (sampleOfTheElement.color === 'red') {
          theNumberOfDiscounts = 3;
        }
      }

      let propperDiscounts = [];

      getCallbackDiscount(theNumberOfDiscounts, propperDiscounts, (element) => {
        sampleOfTheElement.price = price * element.reduce((acc, cur) => acc * (1 - cur / 100), 1);
        data.push(sampleOfTheElement)

        if (data.length === body.length) {
          response.writeHead(200);
          response.end(JSON.stringify(data));
        }
      });
    });
  }
}

function calculateDiscountPromise(response, body) {
  if (!body) {
    response.writeHead(500).end();
  } else {
    const data = []; 
    
    myMap(body, (good) => {
      const regexp = new RegExp(/\d+/);
      let sampleOfTheElement = {};
      const price = Number(regexp.exec(good.price || good.priceForPair));
      sampleOfTheElement.type = good.type;
      sampleOfTheElement.color = good.color;
      sampleOfTheElement.quantity = good.quantity || 0;

      let theNumberOfDiscounts = 1;
      if (sampleOfTheElement.type === 'hat') {
        theNumberOfDiscounts = 2;
        if (sampleOfTheElement.color === 'red') {
          theNumberOfDiscounts = 3;
        }
      }

      getPromiseDiscount(theNumberOfDiscounts).then(discount => {
        discount = discount.reduce((acc, cur) => acc * (1 - cur / 100), 1);
        sampleOfTheElement.price = price * discount;

        data.push(sampleOfTheElement);

        if (data.length === body.length) {
          response.writeHead(200);
          response.end(JSON.stringify(data));
        }
      })
    });
  }
}

async function calculateDiscountAsync(response, body) {
  try {
    if (!body) {
      response.writeHead(500).end();
    } else {
      const modifiedArray = arrayModifier(body);
      const returningArray = myMap(modifiedArray, async good => {
        const regexp = new RegExp(/\d+/);
        good.price = Number(regexp.exec(good.price));
          
        let discount = 1 - (await getAsyncDiscount()) / 100;
        if (good.type === 'hat') {
          discount *= 1 - (await getAsyncDiscount()) / 100;
          if (good.color === 'red') {
            discount *= 1 - (await getAsyncDiscount()) / 100;
          }
        }
        good.price *= discount;

        return good;
      });

      const data = await Promise.all(returningArray);
      
      response.writeHead(200);
      response.end(JSON.stringify(data));
    }
  } catch (error) {
    response.writeHead(500).end('error');
  }
}

module.exports = { calculateDiscountCallback, calculateDiscountPromise, calculateDiscountAsync };