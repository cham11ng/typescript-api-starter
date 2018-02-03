import UserDetail from '../resources/domain/UserDetail';

export function transformAll(users: UserDetail[]): UserDetail[] {
  return users.map((user: UserDetail) => transform(user));
}

export function transform(user: UserDetail): UserDetail {
  return {
    name: user.name,
    email: user.email,
    updatedAt: new Date(user.updatedAt).toLocaleString(),
    createdAt: new Date(user.updatedAt).toLocaleString()
  };
}
