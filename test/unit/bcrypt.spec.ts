import { faker } from '@faker-js/faker';
import { describe, test, beforeEach, expect } from 'bun:test';

import { hash, compare } from '../../src/utils/hash';

describe('Utils: compare()', () => {
  let hashedText: string;
  const plainText = faker.internet.password();

  beforeEach(async () => {
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
