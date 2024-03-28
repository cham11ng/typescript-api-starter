import { faker } from '@faker-js/faker';

import { compare, hash } from '../../src/utils/bcrypt';

describe('Utils: compare()', () => {
  let hashedText: string;
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
