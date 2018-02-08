import Bluebird from 'bluebird';
import { Collection, Model } from 'bookshelf';

import User from '../models/User';
import transform from '../utils/transform';
import UserDetail from '../domain/entities/UserDetail';

/**
 * Fetch all users from users table.
 *
 * @returns {Bluebird<UserDetail[]>}
 */
export function fetchAll(): Bluebird<UserDetail[]> {
  return User.fetchAll().then((users: Collection<Model<User>>) => transform(users.serialize(), userTransform));
}

/**
 * Transform user detail.
 *
 * @param  {UserDetail} user
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
