import { Knex } from 'knex';

import Table from '../../resources/enums/Table';

/**
 * Add users table.
 *
 * @param {Knex} knex - knex instance.
 * @returns {Knex.SchemaBuilder}
 */
export function up(knex: Knex): Knex.SchemaBuilder {
  return knex.schema.createTable(Table.USERS, (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
    table.integer('role_id').unsigned().notNullable().references('id').inTable(Table.USER_ROLES);

    table.timestamps(true, true);
  });
}

/**
 * Drop users table.
 *
 * @param {Knex} knex - knex instance.
 * @returns {Knex.SchemaBuilder}
 */
export function down(knex: Knex): Knex.SchemaBuilder {
  return knex.schema.dropTable(Table.USERS);
}
