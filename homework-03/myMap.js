function myMap(array, callback) {
  const newArray = [];
  for (let i = 0; i < array.length; i += 1) {
    const newArrayIndex = callback(array[i]);
    newArray.push(newArrayIndex);
  }
  return newArray;
}

module.exports = { myMap };
