import { isArray, getRandomElement } from '../../src/utils/array';

describe('Utils: isArray()', () => {
  const arr = [12, 14, 16, 19, 10];

  test('should return true if parameter is an array', () => {
    const result = isArray(arr);

    expect(result).toEqual(true);
  });

  test('should return false if parameter is an object', () => {
    const result = isArray({});

    expect(result).toEqual(false);
  });

  test('should return false if parameter is an null', () => {
    const result = isArray(null);

    expect(result).toEqual(false);
  });

  test('should return false if parameter is an undefined', () => {
    const result = isArray(undefined);

    expect(result).toEqual(false);
  });
});

describe('Utils: getRandomElement()', () => {
  const common = [12, 14, 16, 19, 10];

  test('should get random element from given array', () => {
    const element = getRandomElement(common);

    expect(common.includes(element)).toEqual(true);
  });
});
