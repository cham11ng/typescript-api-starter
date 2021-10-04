import { AsyncLocalStorage } from 'async_hooks';

const context = new AsyncLocalStorage<any>();

export default context;
