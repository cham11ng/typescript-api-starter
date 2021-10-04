import * as dotenv from 'dotenv';

import errors from '../resources/lang/errors.json';
import messages from '../resources/lang/messages.json';

dotenv.config();

const isTestEnvironment = process.env.NODE_ENV === 'test';

export default {
  errors,
  messages,
  name: process.env.npm_package_name,
  version: process.env.npm_package_version,
  appUrl: process.env.APP_URL,
  environment: process.env.NODE_ENV || 'development',
  port: isTestEnvironment ? process.env.TEST_APP_PORT : process.env.APP_PORT,
  pagination: {
    page: 1,
    maxRows: 20
  },
  auth: {
    saltRounds: process.env.SALT_ROUNDS || 11,
    accessTokenDuration: process.env.ACCESS_TOKEN_DURATION || '10m',
    refreshTokenDuration: process.env.REFRESH_TOKEN_DURATION || '24h',
    emailVerificationDuration: process.env.EMAIL_VERIFICATION_DURATION || 24,
    accessTokenSecretKey: process.env.ACCESS_TOKEN_SECRET_KEY || '',
    refreshTokenSecretKey: process.env.REFRESH_TOKEN_SECRET_KEY || ''
  },
  logging: {
    dir: process.env.LOGGING_DIR || 'logs',
    level: process.env.LOGGING_LEVEL || 'info',
    maxSize: process.env.LOGGING_MAX_SIZE || '20m',
    maxFiles: process.env.LOGGING_MAX_FILES || '7d',
    datePattern: process.env.LOGGING_DATE_PATTERN || 'YYYY-MM-DD'
  },
  db: {
    client: process.env.DB_CLIENT,
    connection: {
      charset: 'utf8',
      timezone: 'UTC',
      host: process.env.DB_HOST,
      port: +(process.env.DB_PORT || 5432),
      database:
        process.env.NODE_ENV === 'test'
          ? process.env.TEST_DB_NAME
          : process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    }
  }
};
