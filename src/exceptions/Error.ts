/**
 * Override the default Error interface to throw custom error messages.
 *
 */
class Error {
  /**
   * Error message to be thrown.
   */
  message: string;

  /**
   * The type of error message. Similar to isBoom, isJoi etc.
   */
  isCustom: boolean;

  /**
   * HTTP Status code to be sent as response status.
   */
  statusCode: number;

  /**
   * Creates an instance of Error.
   *
   * @param {string} message - Error message.
   * @param {number} statusCode - HTTP Status code.
   */
  constructor(message: string, statusCode: number) {
    this.isCustom = true;
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default Error;
