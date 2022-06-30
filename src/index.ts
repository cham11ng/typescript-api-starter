import app from './app';
import logger from './utils/logger';
import config from './config/config';
import nodeErrorHandler from './middlewares/nodeErrorHandler';

const { port } = config;

if (!port) {
  throw new Error('App Port not assigned.');
}

app
  .listen(+port, () => {
    logger.log('info', `Server started at http://localhost:${port}`);
  })
  .on('error', nodeErrorHandler);
