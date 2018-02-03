import * as Knex from 'knex';
import Bluebird from 'bluebird';

export function up(knex: Knex): Bluebird<any[]> {
  return knex.schema.createTable('users', table => {
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
  return knex.schema.dropTable('users');
}
