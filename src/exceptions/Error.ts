/**
 * Override the default Error interface to throw custom error messages.
 *
 * @class Error
 * @extends {Error}
 */
class Error {
  /**
   * Error message to be thrown.
   *
   * @type {string}
   * @memberof Error
   */
  message: string;

  /**
   * The type of error message. Similar to isBoom, isJoi etc.
   *
   * @type {boolean}
   * @memberof Error
   */
  isCustom: boolean;

  /**
   * HTTP Status code to be sent as response status.
   *
   * @type {number}
   * @memberof Error
   */
  statusCode: number;

  /**
   * Creates an instance of Error.
   *
   * @param {string} message
   * @param {number} statusCode
   * @memberof Error
   */
  constructor(message: string, statusCode: number) {
    this.isCustom = true;
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default Error;
