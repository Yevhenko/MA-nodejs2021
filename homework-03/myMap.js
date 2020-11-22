const arr = [1, 4, 3, 4, 5];

function myMap(array, callback) {
  const newArray = [];
  for (let i = 0; i < array.length; i += 1) {
    const newArrayIndex = callback(array[i]);
    newArray.push(newArrayIndex);
  }
  return newArray;
}

myMap(arr, (number) => console.log(number));
