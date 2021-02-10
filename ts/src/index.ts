import express from 'express';
import bodyParser from 'body-parser';

import path from 'path';
import { config as dotenv } from 'dotenv';

import { getDbConnection } from './db/connector';
import router from './router';

dotenv({ path: path.join(__dirname, '..', '.env') });

import { config } from './config';

const start = async () => {
  try {
    console.log('Start connection to DB...');
    const dbConnection = await getDbConnection();
    console.log('Application connects to Postgres.');

    const app = express();
    const port = config.APP_PORT;

    app.listen(port);
    console.log(`server was started at ${port} port.`);

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(router);

    // eslint-disable-next-line no-inner-declarations
    async function gracefulShutdown() {
      try {
        await dbConnection.close();
        console.log('DB connection closed.');
      } catch (err) {
        console.error(`Server shutdown error: ${err.message}`);
      }
    }

    process.on('SIGINT', async () => {
      console.log('SIGINT signal received.');
      await gracefulShutdown();
      process.exit(1);
    });

    process.on('SIGTERM', async () => {
      console.log('SIGTERM signal received.');
      await gracefulShutdown();
      process.exit(0);
    });

    process.on('unhandledRejection', (reason, p) => {
      console.log(`Possibly Unhandled Rejection at: Promise ${p}, Reason: ${reason}`);
    });
  } catch (error) {
    console.error(error, 'Main error:');
  }
};

start();
