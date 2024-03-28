import { faker } from '@faker-js/faker';

import knex from '../src/config/db';
import UserDetail from '../src/domain/entities/UserDetail';
import Table from '../src/resources/enums/Table';
import * as userService from '../src/services/userService';

const tables = [Table.USER_SESSIONS, Table.USERS];

export const TEST_EMAIL = faker.internet.email();
export const TEST_PASSWORD = faker.internet.password();

let userData: UserDetail;

/**
 * Create user.
 *
 * @returns Promise
 */
async function createUser(): Promise<UserDetail> {
  return await userService.insert({
    email: TEST_EMAIL,
    password: TEST_PASSWORD,
    name: faker.person.fullName()
  });
}

/**
 * Delete all table's data.
 *
 * @returns {Promise<UserDetail>}
 */
export async function init(): Promise<UserDetail> {
  if (userData) {
    return userData;
  }

  for (const table of tables) {
    await knex(table).del();
  }

  userData = await createUser();

  return userData;
}

/**
 * Get a random element from given array.
 *
 * @param {any[]} list - List of elements.
 * @returns {any}
 */
export function getRandomElement(list: any[]): any {
  return faker.helpers.arrayElement<any>(list);
}
