import * as fs from 'fs';
import * as dotenv from 'dotenv';

dotenv.config();

const contents: string = fs.readFileSync('./package.json', { encoding: 'utf8' });
const { name, version } = JSON.parse(contents);

export default {
  name,
  version,
  host: process.env.APP_HOST || '127.0.0.1',
  port: (process.env.NODE_ENV === 'test' ? process.env.TEST_APP_PORT : process.env.APP_PORT) || '8000',
  pagination: {
    page: 1,
    maxRows: 20
  },
  logging: {
    dir: process.env.LOGGING_DIR || 'logs',
    level: process.env.LOGGING_LEVEL || 'debug'
  }
};
