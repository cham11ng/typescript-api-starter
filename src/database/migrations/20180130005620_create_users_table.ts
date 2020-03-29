import * as Knex from 'knex';

import Table from '../../resources/enums/Table';

export function up(knex: Knex): Knex.SchemaBuilder {
  return knex.schema.createTable(Table.USERS, (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
    table
      .integer('role_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable(Table.USER_ROLES);

    table.timestamps(true, true);
  });
}

export function down(knex: Knex): Knex.SchemaBuilder {
  return knex.schema.dropTable(Table.USERS);
}
