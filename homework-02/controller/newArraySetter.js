const fs = require('fs');
const path = require('path');

let store = [];

function setNewArray(response, body) {
  response.writeHead(200);
  store = body;

  fs.writeFileSync(path.resolve('./', 'store.json'), JSON.stringify(store));

  response.end(JSON.stringify(store));
}

module.exports = { setNewArray };
