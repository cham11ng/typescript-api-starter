import * as cors from 'cors';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import * as express from 'express';
import * as bodyParser from 'body-parser';

import routes from './routes';
import config from './config/app';
import logger from './utils/logger';
import notFoundHandler from './middlewares/notFoundHandler';
import nodeErrorHandler from './middlewares/nodeErrorHandler';
import genericErrorHandler from './middlewares/genericErrorHandler';

const { name, version, host, port } = config;
const app: express.Application = express();

app.locals.name = name;
app.locals.version = version;

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes);

app.use(genericErrorHandler);
app.use(notFoundHandler);

app
  .listen(parseInt(port, 10), host, () => {
    logger.info(`Server started at http://${host}:${port}`);
  })
  .on('error', nodeErrorHandler);

export default app;
