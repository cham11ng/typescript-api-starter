import { faker } from '@faker-js/faker';

import UserDetail from '../../domain/entities/UserDetail';
import * as userService from '../../services/userService';

/**
 * Returns user fake data.
 *
 * @returns {Promise<UserDetail>}
 */
export function run(): Promise<UserDetail> {
  return userService.insert({
    password: 'secret',
    name: faker.person.fullName(),
    email: faker.internet.email()
  });
}
