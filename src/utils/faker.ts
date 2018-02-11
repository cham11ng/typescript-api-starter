/**
 * Generate fake data from given factory callback.
 *
 * @param  {(()=>T)} factoryCallback
 * @param  {number=1} total
 * @returns void
 */
export function generate<T>(factoryCallback: (() => T), total: number = 1): T[] {
  const data = [];
  for (let i = 0; i < total; i++) {
    data[i] = factoryCallback();
  }

  return data;
}
