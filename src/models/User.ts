import bookshelf from '../config/bookshelf';

import Tables from '../resources/enums/Tables';

class User extends bookshelf.Model<User> {
  get tableName(): string {
    return Tables.users;
  }

  get hasTimestamps(): boolean {
    return true;
  }
}

export default User;
