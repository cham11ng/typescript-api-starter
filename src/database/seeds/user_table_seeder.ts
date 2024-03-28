import { Knex } from 'knex';

import Role from '../../resources/enums/Role';
import Table from '../../resources/enums/Table';
import * as bcrypt from '../../utils/bcrypt';

/**
 * Seed users table.
 *
 * @param {Knex} knex - knex instance.
 * @returns {Promise<number[] | number[][]>}
 */
export function seed(knex: Knex): Promise<number[] | number[][]> {
  return knex(Table.USERS).then(async () => {
    return Promise.all([
      knex(Table.USERS).insert([
        {
          role_id: Role.ADMIN,
          name: 'Sagar Chamling',
          email: 'sgr.raee@gmail.com',
          password: await bcrypt.hash('secret')
        }
      ])
    ]);
  });
}
