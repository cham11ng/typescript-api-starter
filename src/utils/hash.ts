import config from '../config/config';

/**
 * Create a hash for a string.
 *
 * @param {string} value
 * @returns {Promise<string>}
 */
export function hash(value: string): Promise<string> {
  const passwordCost = Number(config.auth.passwordCost);

  return Bun.password.hash(value, { algorithm: 'bcrypt', cost: passwordCost });
}

/**
 * Compare a string with the hash.
 *
 * @param {string} value
 * @param {string} hashedValue
 * @returns {Promise<boolean>}
 */
export function compare(value: string, hashedValue: string): Promise<boolean> {
  return Bun.password.verify(value, hashedValue);
}
