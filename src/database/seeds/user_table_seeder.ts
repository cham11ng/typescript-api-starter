import * as Knex from 'knex';
import Bluebird from 'bluebird';

import Table from '../../resources/enums/Table';

export function seed(knex: Knex): Bluebird<any[]> {
  return knex(Table.USERS)
    .del()
    .then(() => {
      return Promise.all([
        knex(Table.USERS).insert([
          {
            email: 'sgr.raee@gmail.com',
            name: 'Sagar Chamling'
          }
        ])
      ]);
    });
}
