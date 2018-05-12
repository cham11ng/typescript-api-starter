import User from '../models/User';
import logger from '../utils/logger';
import * as object from '../utils/object';
import transform from '../utils/transform';
import UserDetail from '../domain/entities/UserDetail';
import UserPayload from '../domain/requests/UserPayload';

/**
 * Fetch all users from users table.
 *
 * @returns {Promise<UserDetail[]>}
 */
export async function fetchAll(): Promise<UserDetail[]> {
  logger.debug('Fetching users from database:');
  const users = await User.fetchAll();
  logger.debug('Fetched all users successfully:', JSON.stringify(users, null, 2));

  return transform(users.serialize(), userTransform);
}

/**
 * Insert user from given user payload
 *
 * @param {UserPayload} params
 * @returns {Promise<UserDetail>}
 */
export async function insert(params: UserPayload): Promise<UserDetail> {
  logger.debug('Inserting user into database:', JSON.stringify(params, null, 2));
  const user = await new User(params).save();
  logger.debug('Inserted user successfully:', JSON.stringify(user, null, 2));

  return object.camelize(user.serialize());
}

/**
 * Transform user detail.
 *
 * @param {UserDetail} user
 * @returns {UserDetail}
 */
export function userTransform(user: UserDetail): UserDetail {
  return {
    name: user.name,
    email: user.email,
    updatedAt: new Date(user.updatedAt).toLocaleString(),
    createdAt: new Date(user.updatedAt).toLocaleString()
  };
}
