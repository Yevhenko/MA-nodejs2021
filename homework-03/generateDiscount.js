const { promisify } = require('util');

function generateDiscount(callback) {
  setTimeout(() => {
    const discount = Math.floor(Math.random() * 99) + 1;
    if (discount > 20) {
      return callback(new Error());
    } else {
      return callback(null, discount);
    }
    
  }, 50);
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
    generateDiscount((error, result) => {
      if (error){
         rej(error);
      } else {
        res(result);
      }
    });
  });
};

const callbackPromisified = promisify(getCallbackDiscount);

function getPromiseDiscount(theNumberOfDiscounts, propperDiscounts, callback) {
  callbackPromisified()
  .then(d => {
    propperDiscounts.push(d);
    if (propperDiscounts.length < theNumberOfDiscounts) {
      getPromiseDiscount(theNumberOfDiscounts, propperDiscounts, callback);
    } else {
      callback(propperDiscounts);
  }
})
  .catch(() => getPromiseDiscount(theNumberOfDiscounts, propperDiscounts, callback));
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
