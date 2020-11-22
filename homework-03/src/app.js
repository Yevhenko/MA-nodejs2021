require('dotenv').config();
const http = require('http');
const requestHandler = require('./requestHandler');

const server = http.createServer(requestHandler);
server.listen(Number(process.env.PORT));
