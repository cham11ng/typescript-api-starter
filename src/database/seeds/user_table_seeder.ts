import * as Knex from 'knex';
import Bluebird from 'bluebird';

import Tables from '../../resources/enums/Tables';

export function seed(knex: Knex): Bluebird<any[]> {
  return knex(Tables.users)
    .del()
    .then(() => {
      return Promise.all([
        knex(Tables.users).insert([
          {
            email: 'sgr.raee@gmail.com',
            name: 'Sagar Chamling'
          }
        ])
      ]);
    });
}
