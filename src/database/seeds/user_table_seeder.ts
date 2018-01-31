import * as Knex from 'knex';
import Bluebird from 'bluebird';

export function seed(knex: Knex): Bluebird<any[]> {
  return knex('users')
    .del()
    .then(() => {
      return Promise.all([
        knex('users').insert([
          {
            email: 'sgr.raee@gmail.com',
            name: 'Sagar Chamling'
          }
        ])
      ]);
    });
}
