import * as Knex from 'knex';

import Table from '../../resources/enums/Table';

export function up(knex: Knex): Knex.SchemaBuilder {
  return knex.schema.createTable(Table.USER_SESSIONS, (table) => {
    table.increments('id').primary();

    table.text('token').notNullable();
    table
      .integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable(Table.USERS);
    table.boolean('is_active').notNullable().defaultTo(true);

    table.timestamps(true, true);
  });
}

export function down(knex: Knex): Knex.SchemaBuilder {
  return knex.schema.dropTable(Table.USER_SESSIONS);
}
