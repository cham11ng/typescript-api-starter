import chalk from 'chalk';

import factory from '../src/utils/factory';
import userFactory from '../src/database/factories/userFactory';

const { info } = console;

(async () => {
  switch (process.argv[2]) {
    case 'users':
      print(factory(userFactory, +process.argv[3]));
      process.exit(0);
      break;

    default:
      info(chalk`{bold.red ${process.argv[2].toUpperCase()}} {red factory not found.}`);
      process.exit(0);
      break;
  }
})();

function print<T>(data: T) {
  info(chalk.green(JSON.stringify(data, null, ' ')));
}
