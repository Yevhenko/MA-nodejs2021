const { promisify } = require('util');

function generateDiscount(callback) {
  setTimeout(() => {
    const discount = Math.floor(Math.random() * 99) + 1;
    if (discount >= 20) {
      return callback(new Error('error'));
    } else {
      return callback(null, discount);
    }
    
  }, 50);
};

function discountWrapper(callback) {
  generateDiscount((err, result) => {
    if (err) return discountWrapper(callback);
    else return callback(null, result);
  });
};

function getCallbackDiscount(theNumberOfDiscounts, propperDiscounts, callback) {

  generateDiscount((err, result) => {
    if (err) {
      return getCallbackDiscount(theNumberOfDiscounts, propperDiscounts, callback);
    } else {
      propperDiscounts.push(result);
    }

    if (propperDiscounts.length < theNumberOfDiscounts) {
      getCallbackDiscount(theNumberOfDiscounts, propperDiscounts, callback);
    } else {
      callback(propperDiscounts);
      return true;
    }
  });
};

function promiseDiscount() {
  return new Promise((res, rej) => {
    discountWrapper((err, result) => {
      if (err) {
        rej(err);
      } else {
        res(result);
      }
    });
  });
};

function getPromiseDiscount(theNumberOfDiscounts) {
  const quantityOfTHePromises = [];

  while (quantityOfTHePromises.length < theNumberOfDiscounts) {
    quantityOfTHePromises.push(promiseDiscount());
  }

  return Promise.all(quantityOfTHePromises);
    // .then(d => d)
    // .catch(() => getPromiseDiscount(theNumberOfDiscounts));
};

async function getAsyncDiscount() {
    let res;
    try {
      res = await promiseDiscount();
    } catch (error) {
      res = await getAsyncDiscount();
    }

    return res;
  };

module.exports = { getCallbackDiscount, getAsyncDiscount, getPromiseDiscount };
