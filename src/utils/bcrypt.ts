import bcrypt from 'bcrypt';

import config from '../config/config';

/**
 * Create a hash for a string.
 *
 * @param {string} value
 * @returns {Promise<string>}
 */
export function hash(value: string): Promise<string> {
  const saltRounds = config.auth.saltRounds;

  return bcrypt.hash(value, saltRounds);
}

/**
 * Compare a string with the hash.
 *
 * @param {string} value
 * @param {string} hashedValue
 * @returns {Promise<boolean>}
 */
export function compare(value: string, hashedValue: string): Promise<boolean> {
  return bcrypt.compare(value, hashedValue);
}
