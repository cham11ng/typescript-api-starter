/**
 * Check the given parameter is string or not.
 *
 * @param {any} text
 * @returns {boolean}
 */
export function isString(text: any): boolean {
  return typeof text === 'string';
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
  if (!isString(text)) {
    return text;
  }

  const words = text.split(separator);

  return [words[0], ...words.slice(1).map(word => `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`)].join('');
}
