import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import { bindModel } from './config/db';
import genericErrorHandler from './middlewares/genericErrorHandler';
import notFoundHandler from './middlewares/notFoundHandler';
import rateLimitMiddleware from './middlewares/rateLimitHandler';
import transactionHandler from './middlewares/transactionHandler';
import routes from './routes';

const app: express.Application = express();

bindModel();

app.use(cors());
app.use(helmet());
app.use(transactionHandler);
app.use(rateLimitMiddleware);
app.use(express.json({ limit: '300kb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);

app.use(genericErrorHandler);
app.use(notFoundHandler);

export default app;
