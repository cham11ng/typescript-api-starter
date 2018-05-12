import faker from 'faker';

/**
 * Check the given parameter is array or not.
 *
 * @param {any} arr
 * @returns {boolean}
 */
export function isArray(arr: any) {
  return arr !== undefined && arr !== null && Array.isArray(arr);
}

/**
 * Get a random element from given array.
 *
 * @param {any[]} list
 * @returns {any}
 */
export function getRandomElement(list: any[]): any {
  return faker.random.arrayElement<any>(list);
}
