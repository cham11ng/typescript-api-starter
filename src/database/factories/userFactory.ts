import * as faker from 'faker';

import UserDetail from '../../domain/entities/UserDetail';

export default function userFactory(): UserDetail {
  const now = new Date().toString();

  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    updatedAt: now,
    createdAt: now
  };
}
