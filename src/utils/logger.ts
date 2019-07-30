import fs from 'fs';
import DailyRotateFile from 'winston-daily-rotate-file';
import { createLogger, format, transports } from 'winston';

import app from '../config/config';

const { environment, logging } = app;
const { combine, colorize, align, splat, simple, printf, timestamp } = format;
// const { level, maxSize, maxFiles, datePattern, dir: logDir } = app.logging;

const formatter = printf((info: any) => {
  const { level, message, timestamp: ts, ...meta } = info;

  return `[${ts}] - [${level}] ${message} ${JSON.stringify(meta, null, 2) || ''}`;
});

if (!fs.existsSync(logging.dir)) {
  fs.mkdirSync(logging.dir);
}

let trans: any = [];

if (environment === 'development') {
  trans = [new transports.Console()];
}

const logger = createLogger({
  level: logging.level,
  format: combine(splat(), simple(), colorize(), timestamp(), align(), formatter),
  transports: [
    ...trans,
    new DailyRotateFile({
      maxSize: logging.maxSize,
      maxFiles: logging.maxFiles,
      datePattern: logging.datePattern,
      zippedArchive: true,
      filename: `${logging.dir}/${logging.level}-%DATE%.log`
    })
  ]
});

export default logger;
