import UserDetail from '../../domain/entities/UserDetail';
import * as userFactory from './userFactory';

interface Callback<T> {
  run: () => Promise<T>;
}

export enum FactoryType {
  USER = 'User'
}

export interface Factories {
  [FactoryType.USER]: Callback<UserDetail>;
}

const factories: Factories = { [FactoryType.USER]: userFactory };

export default factories;
