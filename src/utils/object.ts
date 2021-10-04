import { isArray } from './array';
import { camelcase } from './string';

/**
 * Check the given parameter is object or not.
 *
 * @param {any} obj
 * @returns {boolean}
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function isObject(obj: any): boolean {
  return (
    obj !== undefined &&
    obj !== null &&
    !Array.isArray(obj) &&
    obj instanceof Object
  );
}

/**
 * Camelize the snake_case data. The data parameter can be an object, array of object, string, date.
 * Instance of Date is also instance of Object so need to be handled.
 *
 * @param {any} data
 * @returns {any}
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function camelize(data: any): any {
  const isDate = data instanceof Date;

  if (isArray(data)) {
    return data.map((obj: any) => camelize(obj));
  }

  if (!isDate && isObject(data)) {
    return Object.keys(data).reduce((accumulator, current) => {
      const key = camelcase(current);
      const value = camelize(data[current]);

      return Object.assign(accumulator, { [key]: value });
    }, {});
  }

  return data;
}
