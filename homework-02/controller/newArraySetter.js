const fs = require('fs');
const path = require('path');

let store = [];

function setNewArray(response, body) {
  try {
    response.writeHead(200);
    store = body;

    fs.writeFileSync(path.resolve('./', 'store.json'), JSON.stringify(store));

    response.end(JSON.stringify(store));
  } catch (error) {
    response.writeHead(500).end();
  }
}

module.exports = { setNewArray };
