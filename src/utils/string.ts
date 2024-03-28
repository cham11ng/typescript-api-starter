/**
 * Capitalize the first letter of given word.
 *
 * @param {string} word - Word to capitalize.
 * @returns {string}
 */
export function capitalize(word: string): string {
  return `${word.slice(0, 1).toUpperCase()}${word.slice(1).toLowerCase()}`;
}

/**
 * Camel case given word or sentence, separator replaces to capital letters.
 * E.g. example_text => exampleText.
 *
 * @param {string} text - Text to camel case.
 * @param {string} [separator] - Separator to replace with capital letters.
 * @returns {string}
 */
export function camelcase(text: string, separator = '_'): string {
  if (!(typeof text === 'string')) {
    return text;
  }

  const words = text.split(separator);

  return [words[0], ...words.slice(1).map((word) => `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`)].join('');
}
