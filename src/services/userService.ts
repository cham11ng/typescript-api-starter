import Bluebird from 'bluebird';
import { Collection, Model } from 'bookshelf';

import User from '../models/User';
import UserDetail from '../resources/domain/UserDetail';
import * as usersTransformer from '../transformers/userTransformer';

/**
 * Fetch all users from users table.
 *
 * @returns {Bluebird<UserDetail[]>}
 */
export function fetchAll(): Bluebird<UserDetail[]> {
  return User.fetchAll().then((users: Collection<Model<User>>) => usersTransformer.transformAll(users.serialize()));
}
