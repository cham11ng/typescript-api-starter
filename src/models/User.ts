import { Model } from 'objection';

import Table from '../resources/enums/Table';

class User extends Model {
  id!: number;
  name!: string;
  email!: string;
  password!: string;
  roleId!: number;
  createdAt!: string;
  updatedAt!: string;

  static get tableName(): string {
    return Table.USERS;
  }

  $beforeInsert() {
    this.createdAt = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }
}

export default User;
