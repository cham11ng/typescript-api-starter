import { Model } from 'objection';

import Table from '../resources/enums/Table';

class UserRole extends Model {
  id!: number;
  name!: number;
  description!: number;
  createdAt!: string;
  updatedAt!: string;

  static get tableName(): string {
    return Table.USER_ROLES;
  }

  $beforeInsert() {
    this.createdAt = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }
}

export default UserRole;
