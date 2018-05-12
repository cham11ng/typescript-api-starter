import * as Knex from 'knex';
import Bluebird from 'bluebird';

import Table from '../../resources/enums/Table';

export function up(knex: Knex): Bluebird<any[]> {
  return knex.schema.createTable(Table.USERS, table => {
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
  return knex.schema.dropTable(Table.USERS);
}
