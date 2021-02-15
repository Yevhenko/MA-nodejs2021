import { ConnectionOptions } from 'typeorm';
import { resolve } from 'path';

import { entities } from './entity';

export interface DbConfig {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
}

let dbConfig: DbConfig = {
  host: 'db_postgres',
  port: 5432,
  database: '',
  username: '',
  password: '',
};

export const initDb = (options: Partial<DbConfig>): void => {
  dbConfig = { ...dbConfig, ...options };
};

export const getHost = (): string => {
  if (!dbConfig.host) throw 'DB_HOST not found';

  return dbConfig.host;
};

export const getPort = (): number => {
  if (!dbConfig.port || dbConfig.port < 0) throw 'DB_PORT not found';

  return dbConfig.port;
};

export const getDatabase = (): string => {
  if (!dbConfig.database) throw 'DB_BASE not found';

  return dbConfig.database;
};

export const getUsername = (): string => {
  if (!dbConfig.username) throw 'DB_USER not found';

  return dbConfig.username;
};

export const getPassword = (): string => {
  if (!dbConfig.password) throw 'DB_PSWD not found';

  return dbConfig.password;
};

export const getDbConfig = (): ConnectionOptions => {
  let connectionOptions: ConnectionOptions;
  const migrations = [resolve(__dirname, './migration/*.ts')];

  try {
    connectionOptions = {
      type: 'postgres',
      host: getHost(),
      port: getPort(),
      database: getDatabase(),
      username: getUsername(),
      password: getPassword(),
      logging: false,
      synchronize: false,
      migrationsRun: false,
      entities,
      migrations,
      cli: {
        entitiesDir: 'src/db/entity',
        migrationsDir: 'src/db/migration',
      },
    };
  } catch (error) {
    const errors: string[] = [];
    const newError = (text: string) => {
      errors.push(text);
      return '';
    };

    const host = process.env.DB_HOST || newError('DB_HOST absent in envars');
    const port = process.env.DB_PORT || newError('DB_PORT absent in envars');
    const database = process.env.DB_BASE || newError('DB_BASE absent in envars');
    const username = process.env.DB_USER || newError('DB_USER absent in envars');
    const password = process.env.DB_PSWD || newError('DB_PSWD absent in envars');

    if (errors.length) {
      throw errors.join('\n');
    }

    connectionOptions = {
      type: 'postgres',
      host,
      port: parseInt(port, 10),
      database,
      username,
      password,
      logging: false,
      synchronize: false,
      migrationsRun: false,
      entities,
      migrations,
      cli: {
        entitiesDir: './src/db/entity',
        migrationsDir: './src/db/migration',
      },
    };
  }

  return connectionOptions;
};
