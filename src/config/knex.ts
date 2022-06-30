import Knex from 'knex';
import { knexSnakeCaseMappers } from 'objection';

import config from '../config/config';

const dbConfig = config.db;

export default Knex({ ...dbConfig, ...knexSnakeCaseMappers() });
