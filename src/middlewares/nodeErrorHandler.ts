import config from '../config/config';
import logger from '../utils/logger';

const { errors } = config;

const nodeErrorHandler = (err: NodeJS.ErrnoException): void => {
  switch (err.code) {
    case 'EACCES':
      logger.log('error', errors.portRequirePrivilege);
      break;

    case 'EADDRINUSE':
      logger.log('error', errors.portInUse);
      break;

    default:
      throw err;
  }

  process.exit(1);
};

export default nodeErrorHandler;
