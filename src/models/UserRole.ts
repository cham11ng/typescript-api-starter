import bookshelf from '../config/bookshelf';

import Table from '../resources/enums/Table';

class UserRole extends bookshelf.Model<UserRole> {
  get requireFetch(): boolean {
    return false;
  }

  get tableName(): string {
    return Table.USER_ROLES;
  }

  get hasTimestamps(): boolean {
    return true;
  }
}

export default UserRole;
