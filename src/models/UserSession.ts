import bookshelf from '../config/bookshelf';

import Table from '../resources/enums/Table';

class UserSession extends bookshelf.Model<UserSession> {
  get requireFetch(): boolean {
    return false;
  }

  get tableName(): string {
    return Table.USER_SESSIONS;
  }

  get hasTimestamps(): boolean {
    return true;
  }
}

export default UserSession;
