require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./server/routes');

const app = express();
const { port } = require('./config');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);

const boot = async () => {
  app.listen(port, () => console.log(`App is listening on ${port}!`));
};

boot();
