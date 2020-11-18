const { regulateAnArray } = require('../previousHomework');
const { success } = require('../utils');
const array = require('../clothes.json');

function getTask3(response) {
  const data = regulateAnArray(array);
  success(response, data);
}

module.exports = { getTask3 };
