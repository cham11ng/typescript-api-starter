import Knex from 'knex';
import { Model, knexSnakeCaseMappers } from 'objection';

import config from './config';

const dbConfig = config.db;

const knex = Knex({ ...dbConfig, ...knexSnakeCaseMappers() });

/**
 * Bind model with Knex.
 */
export function bindModel() {
  Model.knex(knex);
}

export default knex;
