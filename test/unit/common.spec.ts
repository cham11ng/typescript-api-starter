import * as HttpStatus from 'http-status-codes';

import { camelcase, capitalize, getRandomElement } from '../../src/utils/common';

describe('Utils: getRandomElement()', () => {
  const common = [12, 14, 16, 19, 10];

  test('should get random element from given array', () => {
    const element = getRandomElement(common);

    expect(common.includes(element)).toEqual(true);
  });
});

describe('Utils: capitalize()', () => {
  const word = 'hello';
  const capitalizeWord = 'Hello';

  test('should capitalize the given word', () => {
    expect(capitalize(word)).toEqual(capitalizeWord);
  });

  test('should capitalize single letter correctly', () => {
    expect(capitalize('a')).toEqual('A');
  });

  it('should handle empty string correctly', () => {
    expect(capitalize('')).toEqual('');
  });
});

describe('Utils: camelcase()', () => {
  const camelcaseText = 'helloWorld';

  test('should camelcase the given text', () => {
    const text = 'hello_world';
    expect(camelcase(text)).toEqual(camelcaseText);
  });

  test('should camelcase the given text with given separator', () => {
    const text = 'hello world';
    expect(camelcase(text, ' ')).toEqual(camelcaseText);
  });

  test('should handle single letter correctly', () => {
    expect(camelcase('a')).toEqual('a');
  });

  it('should handle empty string correctly', () => {
    expect(camelcase('')).toEqual('');
  });
});
