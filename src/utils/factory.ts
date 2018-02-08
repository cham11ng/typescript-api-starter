/**
 * Generate factory of geven factory callback.
 *
 * @param  {(()=>T)} factoryCallback
 * @param  {number=1} total
 * @returns void
 */
export default function factory<T>(factoryCallback: (() => T), total: number = 1): T[] {
  const data = [];
  for (let i = 0; i < total; i++) {
    data[i] = factoryCallback();
  }

  return data;
}
