import { Model } from 'objection';

import Table from '../resources/enums/Table';

class UserSession extends Model {
  id!: number;
  token!: string;
  userId!: number;
  isActive!: boolean;
  updatedBy!: string;
  createdBy!: string;

  static get tableName(): string {
    return Table.USER_SESSIONS;
  }
}

export default UserSession;
