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
      prepend: true,
      level: logLevel,
      timestamp: tsFormat,
      datePattern: 'yyyy-MM-dd',
      filename: `${logDir}/-${logLevel}.log`
    })
  ]
});

export default logger;
