import Knex from 'knex';
import * as dotenv from 'dotenv';

dotenv.config();

const dbConfig: Knex.Config = {
  client: process.env.DB_CLIENT,
  connection: {
    charset: 'utf8',
    timezone: 'UTC',
    host: process.env.DB_HOST,
    port: +(process.env.DB_PORT || '5432'),
    database: process.env.NODE_ENV === 'test' ? process.env.TEST_DB_NAME : process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  }
};

export default Knex(dbConfig);
