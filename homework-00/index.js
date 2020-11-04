const array = [
  {
    type: 'socks',
    color: 'red',
    quantity: 10,
    priceForPair: '$3',
  },
  {
    type: 'socks',
    color: 'green',
    quantity: 5,
    priceForPair: '$10',
  },
  {
    type: 'socks',
    color: 'blue',
    quantity: 8,
    priceForPair: '$6',
  },
  {
    type: 'hat',
    color: 'red',
    quantity: 7,
    price: '$5',
  },
  {
    type: 'hat',
    color: 'green',
    quantity: 0,
    price: '$6',
  },
  { type: 'socks', color: 'blue', priceForPair: '$6' },
  {
    type: 'socks',
    color: 'red',
    quantity: 10,
    priceForPair: '$3',
  },
  {
    type: 'socks',
    color: 'white',
    quantity: 3,
    priceForPair: '$4',
  },
  { type: 'socks', color: 'green', priceForPair: '$10' },
  {
    type: 'socks',
    color: 'blue',
    quantity: 2,
    priceForPair: '$6',
  },
  {
    type: 'hat',
    color: 'green',
    quantity: 3,
    price: '$5',
  },
  {
    type: 'hat',
    color: 'red',
    quantity: 1,
    price: '$6',
  },
  { type: 'socks', color: 'blue', priceForPair: '$6' },
];

const regexp = new RegExp(/\d+/);

let socksQuantity = 0;
let redHatsQuantity = 0;
let costRed = 0;
let costGreen = 0;
let costBlue = 0;
let totalCost = 0;

function arrayHandler() {
  for (let i = 0; i < array.length; i += 1) {
    const price = array[i].price || array[i].priceForPair;

    if (array[i].type === 'socks' && array[i].quantity) {
      socksQuantity += array[i].quantity;
    }

    if (array[i].type === 'hat' && array[i].color === 'red' && array[i].quantity) {
      redHatsQuantity += array[i].quantity;
    }

    if (array[i].color === 'red' && price) {
      costRed += Number(regexp.exec(price));
    }

    if (array[i].color === 'green' && price) {
      costGreen += Number(regexp.exec(price));
    }

    if (array[i].color === 'blue' && price) {
      costBlue += Number(regexp.exec(price));
    }

    if (price) {
      totalCost += Number(regexp.exec(price));
    }
  }
  console.log(`Socks - ${socksQuantity}`);
  console.log(`Red hats - ${redHatsQuantity}`);
  console.log(`Red items - ${costRed}`);
  console.log(`Green items - ${costGreen}`);
  console.log(`Blue items - ${costBlue}`);
  return `Total cost of all items is - ${totalCost}`;
}

console.log(arrayHandler());
