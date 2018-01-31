import * as Knex from 'knex';

export function up(knex: Knex) {
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

export function down(knex: Knex) {
  return knex.schema.dropTable('users');
}
