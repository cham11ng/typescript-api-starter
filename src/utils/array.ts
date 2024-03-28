/**
 * Check the given parameter is array or not.
 *
 * @param {any} arr - Parameter to check.
 * @returns {boolean}
 */
export function isArray(arr: unknown): boolean {
  return arr !== undefined && arr !== null && Array.isArray(arr);
}
