import * as fs from 'fs';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

import app from '../config/app';

const tsFormat = () => new Date().toISOString();
const { dir: logDir, level: logLevel } = app.logging;

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      level: 'info',
      colorize: true,
      timestamp: tsFormat
    }),

    new winston.transports.DailyRotateFile({
      maxSize: '20m',
      maxFiles: '7d',
      zippedArchive: true,
      datePattern: 'YYYY-MM-DD',
      filename: `${logDir}/${logLevel}-%DATE%.log`
    })
  ]
});

export default logger;
