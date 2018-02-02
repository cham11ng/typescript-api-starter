import Bluebird from 'bluebird';
import { Collection } from 'bookshelf';

import User from '../models/User';

export function fetchUsers(): Bluebird<Collection<User>> {
  return User.fetchAll();
}
