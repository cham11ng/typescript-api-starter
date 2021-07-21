import cors from 'cors';
import helmet from 'helmet';
import express from 'express';

import routes from './routes';
import config from './config/config';
import logHandler from './middlewares/logHandler';
import notFoundHandler from './middlewares/notFoundHandler';
import genericErrorHandler from './middlewares/genericErrorHandler';

const { name, version } = config;
const app: express.Application = express();

app.locals.name = name;
app.locals.version = version;

app.use(cors());
app.use(helmet());
app.use(logHandler);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);

app.use(genericErrorHandler);
app.use(notFoundHandler);

export default app;
