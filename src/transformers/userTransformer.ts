import UserDetail from '../resources/domain/UserDetail';

/**
 * Transform all the users detail.
 *
 * @param  {UserDetail[]} users
 * @returns <UserDetail[]>
 */
export function transformAll(users: UserDetail[]): UserDetail[] {
  return users.map((user: UserDetail) => transform(user));
}

/**
 * Transform user detail.
 *
 * @param  {UserDetail} user
 * @returns {UserDetail}
 */
export function transform(user: UserDetail): UserDetail {
  return {
    name: user.name,
    email: user.email,
    updatedAt: new Date(user.updatedAt).toLocaleString(),
    createdAt: new Date(user.updatedAt).toLocaleString()
  };
}
