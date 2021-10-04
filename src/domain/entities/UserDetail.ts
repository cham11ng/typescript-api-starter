/**
 * UserDetail Interface.
 */
interface UserDetail {
  id?: number;
  name: string;
  email: string;
  roleId: number;
  createdAt: string;
  updatedAt: string;
}

export default UserDetail;
