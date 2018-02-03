import bookshelf from '../config/bookshelf';

const TABLE_NAME = 'users';

class User extends bookshelf.Model<any> {
  get tableName() {
    return TABLE_NAME;
  }

  get hasTimestamps() {
    return true;
  }
}

export default User;
