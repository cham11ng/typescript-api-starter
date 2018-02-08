import * as faker from 'faker';

import UserDetail from '../../domain/entities/UserDetail';

/**
 * Retunrs user fake data.
 *
 * @returns UserDetail
 */
export default function userFactory(): UserDetail {
  const now = new Date().toISOString();

  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    updatedAt: now,
    createdAt: now
  };
}
