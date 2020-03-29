import * as dotenv from 'dotenv';

dotenv.config();

module.exports = {
  development: {
    client: process.env.DB_CLIENT,
    connection: {
      charset: 'utf8',
      timezone: 'UTC',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: 'src/database/migrations',
      tableName: 'migrations',
      stub: 'src/resources/stubs/migration.stub'
    },
    seeds: {
      directory: 'src/database/seeds',
      stub: 'src/resources/stubs/seed.stub'
    }
  },
  test: {
    client: process.env.DB_CLIENT,
    connection: {
      charset: 'utf8',
      timezone: 'UTC',
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      port: process.env.TEST_APP_PORT,
      database: process.env.TEST_DB_NAME,
      password: process.env.TEST_DB_PASSWORD
    },
    migrations: {
      directory: 'src/database/migrations',
      tableName: 'migrations'
    },
    seeds: {
      directory: 'src/database/seeds'
    }
  }
};
