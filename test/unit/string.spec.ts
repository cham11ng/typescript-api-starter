import { camelcase, capitalize } from '../../src/utils/string';

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
  const camelcaseText = 'helloStarterAPI';

  test('should camelcase the given text', () => {
    const text = 'hello_starter_API';
    expect(camelcase(text)).toEqual(camelcaseText);
  });

  test('should camelcase the given text with given separator', () => {
    const text = 'hello starter API';
    expect(camelcase(text, ' ')).toEqual(camelcaseText);
  });

  test('should handle single letter correctly', () => {
    expect(camelcase('a')).toEqual('a');
  });

  it('should handle empty string correctly', () => {
    expect(camelcase('')).toEqual('');
  });
});
