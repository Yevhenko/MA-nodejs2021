import { Config } from './interface';
import { schema } from './schema';

import { initDb } from '../db/config';

const { error, value } = schema.validate(process.env);

if (error) {
  console.log('Error in init Config. Config:', value);
  console.error('ERROR:', error);
  throw error.message;
}

const config: Config = value;

initDb({
  host: config.DB_HOST,
  port: config.DB_PORT,
  database: config.DB_BASE,
  username: config.DB_USER,
  password: config.DB_PSWD,
});

export { config };
