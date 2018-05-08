import app from './app';
import config from './config/config';
import logger from './utils/logger';
import nodeErrorHandler from './middlewares/nodeErrorHandler';

const { port, host } = config;
app
  .listen(+port, host, () => {
    logger.info(`Server started at http://${host}:${port}`);
  })
  .on('error', nodeErrorHandler);
