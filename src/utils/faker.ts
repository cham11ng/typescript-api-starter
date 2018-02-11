/**
 * Generate fake data from given factory callback.
 *
 * @param {(()=>T)} factoryCallback
 * @param {number=1} total
 * @returns {Promise<T[]>}
 */
export async function generate<T>(factoryCallback: (() => T), total: number = 1): Promise<T[]> {
  const data = [];
  for (let i = 0; i < total; i++) {
    data[i] = await factoryCallback();
  }

  return data;
}
