import { AsyncLocalStorage } from 'async_hooks';

interface ContextAttributes {
  get: (key: string) => string;
  set: (key: string, value: string | string[]) => void;
}

const context = new AsyncLocalStorage<ContextAttributes>();

export default context;
