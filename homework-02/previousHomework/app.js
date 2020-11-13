const { task1: task4, task2: task5, task3 } = require('./tasks');
const testArray = require('../array.json');

function boot(array, key, item) {
  const data = task4(array, key, item);
  console.log(data);
  console.log(task3(data));
  console.log(task5);
}

boot(testArray, 'type', 'socks');
