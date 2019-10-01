import knex from '../src/config/knex';
import Table from '../src/resources/enums/Table';

const tables = [Table.USER_SESSIONS, Table.USERS];

export async function clearDb() {
  for (const table of tables) {
    await knex(table).del();
  }
}
