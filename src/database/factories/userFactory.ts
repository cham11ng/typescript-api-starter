import * as faker from 'faker';

import UserDetail from '../../domain/entities/UserDetail';

/**
 * Returns user fake data.
 *
 * @returns UserDetail
 */
export function run(): UserDetail {
  const now = new Date().toISOString();

  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    updatedAt: now,
    createdAt: now
  };
}
