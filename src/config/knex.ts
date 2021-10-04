import Knex from 'knex';

import config from '../config/config';

const dbConfig: Knex.Config = config.db;

export default Knex(dbConfig);
