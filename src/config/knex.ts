import * as Knex from 'knex';
import * as dotenv from 'dotenv';

dotenv.config();

const isTestEnvironment = process.env.NODE_ENV === 'test';

const config = {
  client: process.env.DB_CLIENT,
  connection: {
    charset: 'utf8',
    host: process.env.DB_HOST,
    port: +(process.env.DB_PORT || '5432'),
    database: isTestEnvironment ? process.env.TEST_DB_NAME : process.env.DB_NAME,
    user: isTestEnvironment ? process.env.TEST_DB_USER : process.env.DB_USER,
    password: isTestEnvironment ? process.env.TEST_DB_PASSWORD : process.env.DB_PASSWORD
  }
};

export default Knex(config);
