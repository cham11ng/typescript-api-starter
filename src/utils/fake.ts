/**
 * Generate fake data from given factory callback.
 *
 * @param {(()=>Promise<T>)} factoryCallback - Factory callback to generate data.
 * @param {number} total - Total data to generate.
 * @returns {Promise<T[]>}
 */
export async function generate<T>(factoryCallback: () => Promise<T>, total = 1): Promise<T[]> {
  const data: T[] = [];
  for (let i = 0; i < total; i++) {
    const res = await factoryCallback();

    data.push(res);
  }

  return data;
}
