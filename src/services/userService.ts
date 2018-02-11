import User from '../models/User';
import transform from '../utils/transform';
import UserDetail from '../domain/entities/UserDetail';
import UserPayload from '../domain/requests/UserPayload';

/**
 * Fetch all users from users table.
 *
 * @returns {Promise<UserDetail[]>}
 */
export async function fetchAll(): Promise<UserDetail[]> {
  const users = await User.fetchAll();

  return transform(users.serialize(), userTransform);
}

/**
 * Insert user from given user payload
 *
 * @param {UserPayload} params
 * @returns {Promise<UserDetail>}
 */
export async function insert(params: UserPayload): Promise<UserDetail> {
  const user = await new User(params).save();

  return user.serialize();
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
