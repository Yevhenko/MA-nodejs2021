require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const routes = require('./server/routes');

const app = express();
const { port } = require('./config');

app.use(bodyParser.json());
app.use(routes);

const boot = async () => {
  await db.init();
  console.log(`Now DB type is ${db.getType()}`);

  db.setType('knex');
  console.log(`Now DB type is ${db.getType()}`);
  app.listen(port, () => console.log(`App is listening on ${port}!`));
};

boot();
