import bookshelf from '../config/bookshelf';

const TABLE_NAME = 'users';

class User extends bookshelf.Model<User> {
  get tableName(): string {
    return TABLE_NAME;
  }

  get hasTimestamps(): boolean {
    return true;
  }
}

export default User;
