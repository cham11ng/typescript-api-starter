import Knex from 'knex';

import Table from '../../resources/enums/Table';

/**
 * Add user_roles table.
 *
 * @param {Knex} knex
 */
export function up(knex: Knex): Promise<any> {
  return knex.schema
    .createTable(Table.USER_ROLES, table => {
      table.increments('id').primary();

      table
        .string('name', 50)
        .unique()
        .notNullable();
      table.string('description', 100).nullable();

      table.timestamps(true, true);
    })
    .then(async () => {
      return knex(Table.USER_ROLES)
        .truncate()
        .then(() =>
          Promise.all([
            knex(Table.USER_ROLES).insert([
              {
                id: 1,
                name: 'Admin',
                description: 'This is super admin.'
              },
              {
                id: 2,
                name: 'Normal User',
                description: 'This is normal user.'
              }
            ])
          ])
        );
    });
}

/**
 * Drop user_roles table.
 *
 * @param {Knex} knex
 */
export function down(knex: Knex) {
  return knex.schema.dropTable(Table.USER_ROLES);
}
