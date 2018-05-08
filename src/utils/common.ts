import faker from 'faker';

/**
 * Get a random element from given array.
 *
 * @param {any[]} list
 * @returns {any}
 */
export function getRandomElement(list: any[]): any {
  return faker.random.arrayElement<any>(list);
}

/**
 * Capitalize the first letter of given word.
 *
 * @param {string} word
 * @returns string
 */
export function capitalize(word: string): string {
  return `${word.slice(0, 1).toUpperCase()}${word.slice(1).toLowerCase()}`;
}

/**
 * Camel case given word or sentence, separator replaces to capital letters.
 * E.g. example_text => exampleText.
 *
 * @param {string} text
 * @param {string} [separator='_']
 * @returns string
 */
export function camelcase(text: string, separator: string = '_'): string {
  const words = text.split(separator);

  return [words[0], words.slice(1).map(word => capitalize(word))].join('');
}
