import * as Knex from 'knex';
import Bluebird from 'bluebird';

import Tables from '../../resources/enums/Tables';

export function up(knex: Knex): Bluebird<any[]> {
  return knex.schema.createTable(Tables.users, table => {
    table.increments('id').primary();
    table
      .string('email')
      .notNullable()
      .unique();
    table.string('name').notNullable();

    table.timestamps(true, true);
  });
}

export function down(knex: Knex): Bluebird<any[]> {
  return knex.schema.dropTable(Tables.users);
}
