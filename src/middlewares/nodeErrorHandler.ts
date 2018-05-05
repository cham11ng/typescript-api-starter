import logger from '../utils/logger';
import errorMessages from '../resources/lang/errors.json';

/**
 * Node startup error handler.
 *
 * @param  {NodeJS.ErrnoException} err
 * @returns <void>
 */
export default function nodeErrorHandler(err: NodeJS.ErrnoException): void {
  switch (err.code) {
    case 'EACCES':
      logger.error(errorMessages.portRequirePrivilege);
      process.exit(1);

      break;

    case 'EADDRINUSE':
      logger.error(errorMessages.portInUse);
      process.exit(1);

      break;

    default:
      throw err;
  }
}
