import { createConnection, Connection } from 'typeorm';
import { promisify } from 'util';

import { getDbConfig } from './config';

const retryDelay = 1000;
const delay = promisify(setTimeout);
let connection: Connection | null = null;
let retryCount = 0;

const tryCreateConnection = async (): Promise<Connection> => {
  return createConnection(getDbConfig()).then(
    (connection) => {
      console.log('Connection to Postgres was established.');

      return connection;
    },
    async (err) => {
      await delay(retryDelay);

      retryCount += 1;
      console.log(`Try establish db connection #${retryCount} after '${err.message}'`);

      return tryCreateConnection();
    },
  );
};

export const getDbConnection = async (): Promise<Connection> => {
  if (!connection) {
    connection = await tryCreateConnection();
  }

  return connection;
};
