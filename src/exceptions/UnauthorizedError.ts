import * as HttpStatus from 'http-status-codes';

import Error from './Error';

/**
 * @class UnauthorizedError
 * @extends {Error}
 */
class UnauthorizedError extends Error {
  /**
   * Error message to be thrown.
   *
   * @type {string}
   * @memberof UnauthorizedError
   */
  message: string;

  /**
   * Creates an instance of UnauthorizedError.
   *
   * @param {string} message
   * @memberof UnauthorizedError
   */
  constructor(message: string) {
    super(message, HttpStatus.UNAUTHORIZED);

    this.message = message;
  }
}

export default UnauthorizedError;
