import * as HttpStatus from 'http-status-codes';

import Error from './Error';

/**
 * @class BadRequestError
 * @extends {Error}
 */
class BadRequestError extends Error {
  /**
   * Error message to be thrown.
   *
   * @type {string}
   * @memberof UnauthorizedError
   */
  message: string;

  /**
   * Creates an instance of BadRequestError.
   *
   * @param {string} message
   * @memberof ForbiddenError
   */
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST);

    this.message = message;
  }
}

export default BadRequestError;
