import bookshelf from '../config/bookshelf';

import Table from '../resources/enums/Table';

class User extends bookshelf.Model<User> {
  get tableName(): string {
    return Table.USERS;
  }

  get hasTimestamps(): boolean {
    return true;
  }
}

export default User;
