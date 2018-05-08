import 'winston-daily-rotate-file';

import * as fs from 'fs';
import * as winston from 'winston';

import app from '../config/config';

const { level, maxSize, maxFiles, datePattern, dir: logDir } = app.logging;

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const transports = [
  new winston.transports.DailyRotateFile({
    maxSize,
    maxFiles,
    datePattern,
    zippedArchive: true,
    filename: `${logDir}/${level}-%DATE%.log`
  })
];

if (process.env.NODE_ENV === 'development') {
  transports.push(
    new winston.transports.Console({
      level,
      colorize: true,
      timestamp: () => new Date().toISOString()
    })
  );
}

const logger = new winston.Logger({ transports });

export default logger;
