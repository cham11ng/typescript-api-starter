import faker from 'faker';

import { hash, compare } from '../../src/utils/bcrypt';

describe('Utils: compare()', () => {
  let hashedText;
  const plainText = faker.internet.password();

  beforeAll(async () => {
    hashedText = await hash(plainText);
  });

  test('should return true if text matches', async () => {
    const isSame = await compare(plainText, hashedText);

    expect(isSame).toEqual(true);
  });

  test('should return false if text does not match', async () => {
    const isSame = await compare(plainText + 'hello', hashedText);

    expect(isSame).toEqual(false);
  });
});
