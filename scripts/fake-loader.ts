import chalk from 'chalk';

import * as fake from '../src/utils/fake';
import factories, { FactoryType } from '../src/database/factories';

const { info } = console;

(async (): Promise<void> => {
  try {
    const table = process.argv[2];
    const total = +process.argv[3] || 1;
    const factoryCallback = factories[table as FactoryType].run;

    await fake.generate(factoryCallback, total);

    process.exit(0);
  } catch (err: any) {
    info(chalk`{red ${err.message}}`);

    process.exit(1);
  }
})();
