/**
 * Transform all the given detail with given transformation callback.
 *
 * @param  {T[]} data - Data to transform.
 * @param  {(info:T)=>T} transformCallback - Transformation callback.
 * @returns {T}
 */
export default function transform<T>(data: T[], transformCallback: (info: T) => T): T[] {
  return data.map(transformCallback);
}
