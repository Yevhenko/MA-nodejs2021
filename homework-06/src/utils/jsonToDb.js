const fs = require('fs');

const { db: dbConfig } = require('../config');

const db = require('../db')(dbConfig);

function jsontodb(filename) {
  return new Promise((resolve, reject) => {
    const filepath = `upload/${filename}`;
    const inputStream = fs.createReadStream(filepath);

    let last = '';
    let c = 1;

    inputStream.on('data', (chunk) => {
      // eslint-disable-next-line no-plusplus
      console.log('c :>> ', c++);
      const str = chunk.toString('utf8');

      if (last) last += str.split('{', 1)[0];

      const stringifiedJson = `${last}${str.slice(str.indexOf('{'), str.lastIndexOf('}') + 1)}`;

      const inputProducts = JSON.parse(`[${stringifiedJson}]`);

      inputProducts.forEach((e) => {
        console.log('e :>> ', e);
        db.createProduct({
          type: e.type || 'no type',
          color: e.color || 'no color',
          price: e.price + 0.99,
          quantity: e.quantity || 0,
        })
          .then(() => {
            console.log('+');
          })
          .catch((err) => err);
      });
      last = str.slice(str.lastIndexOf('},') + 2);
    });

    inputStream.on('end', () => {
      console.log('\nJSON TO DB\n');
      resolve();
    });

    inputStream.on('error', (error) => {
      console.error('ERRRO: jsontodb', error.message);
      reject(error);
    });
  });
}

module.exports = { jsontodb };
