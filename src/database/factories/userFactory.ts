import * as faker from 'faker';

import UserDetail from '../../domain/entities/UserDetail';
import * as userService from '../../services/userService';

/**
 * Returns user fake data.
 *
 * @returns {Promise<UserDetail>}
 */
export function run(): Promise<UserDetail> {
  return userService.insert({
    name: faker.name.findName(),
    email: faker.internet.email()
  });
}
