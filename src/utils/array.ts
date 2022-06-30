/**
 * Check the given parameter is array or not.
 *
 * @param {any} arr
 * @returns {boolean}
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function isArray(arr: any): boolean {
  return arr !== undefined && arr !== null && Array.isArray(arr);
}
