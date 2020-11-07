function filterByKey(array, key, item) {
  return array.filter((element) => element[key] === item);
}

module.exports = filterByKey;
