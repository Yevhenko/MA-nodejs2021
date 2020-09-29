let socksQuantity = 0;
let redHatsQuantity = 0;
let costRed = 0;
let costGreen = 0;
let costBlue = 0;
let totalCost = 0;

const regexp = new RegExp(/\d+/);

function arrayHandler() {
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

  for (let i = 0; i < array.length; i += 1) {
    if (array[i].type === 'socks' && array[i].quantity) {
      socksQuantity += array[i].quantity;
    }

    if (array[i].type === 'hat' && array[i].color === 'red' && array[i].quantity) {
      redHatsQuantity += array[i].quantity;
    }

    if (array[i].color === 'red' && (array[i].price || array[i].priceForPair)) {
      costRed += Number(regexp.exec(array[i].price + array[i].priceForPair));
    }

    if (array[i].color === 'green' && (array[i].price || array[i].priceForPair)) {
      costGreen += Number(regexp.exec(array[i].price + array[i].priceForPair));
    }

    if (array[i].color === 'blue' && (array[i].price || array[i].priceForPair)) {
      costBlue += Number(regexp.exec(array[i].price + array[i].priceForPair));
    }

    if (array[i].price || array[i].priceForPair) {
      totalCost += Number(regexp.exec(array[i].price + array[i].priceForPair));
    }
  }
  console.log(`Socks - ${socksQuantity}`);
  console.log(`Socks - ${redHatsQuantity}`);
  console.log(`Red - ${costRed}`);
  console.log(`Green - ${costGreen}`);
  console.log(`Blue - ${costBlue}`);
  return `Total cost is - ${totalCost}`;
}

console.log(arrayHandler());
