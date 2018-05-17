import * as Knex from 'knex';

import Table from '../../resources/enums/Table';

export function up(knex: Knex) {
  return knex.schema.createTable(Table.USER_SESSIONS, table => {
    table.increments('id').primary();

    table
      .string('token')
      .unique()
      .notNullable();
    table
      .integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable(Table.USERS);
    table.boolean('is_active').notNullable();

    table.timestamps(true, true);
  });
}

export function down(knex: Knex) {
  return knex.schema.dropTable(Table.USER_SESSIONS);
}
