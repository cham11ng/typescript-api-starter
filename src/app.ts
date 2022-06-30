import cors from 'cors';
import helmet from 'helmet';
import express from 'express';
import { Model } from 'objection';

import routes from './routes';
import knex from './config/knex';
import logHandler from './middlewares/logHandler';
import notFoundHandler from './middlewares/notFoundHandler';
import transactionHandler from './middlewares/transactionHandler';
import genericErrorHandler from './middlewares/genericErrorHandler';

Model.knex(knex);

const app: express.Application = express();

app.use(cors());
app.use(helmet());
app.use(transactionHandler);
app.use(logHandler);
app.use(express.json({ limit: '300kb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);

app.use(genericErrorHandler);
app.use(notFoundHandler);

export default app;
