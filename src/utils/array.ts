/**
 * Check the given parameter is array or not.
 *
 * @param {any} arr
 * @returns {boolean}
 */
export function isArray(arr: any): boolean {
  return arr !== undefined && arr !== null && Array.isArray(arr);
}
