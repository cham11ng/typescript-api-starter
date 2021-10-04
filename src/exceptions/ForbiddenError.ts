import { StatusCodes } from 'http-status-codes';

import Error from './Error';

/**
 * @class ForbiddenError
 * @extends {Error}
 */
class ForbiddenError extends Error {
  /**
   * Error message to be thrown.
   *
   * @type {string}
   * @memberof UnauthorizedError
   */
  message: string;

  /**
   * Creates an instance of ForbiddenError.
   *
   * @param {string} message
   * @memberof ForbiddenError
   */
  constructor(message: string) {
    super(message, StatusCodes.FORBIDDEN);

    this.message = message;
  }
}

export default ForbiddenError;
