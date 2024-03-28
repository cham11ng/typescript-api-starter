import { StatusCodes } from 'http-status-codes';

import Error from './Error';

/**
 */
class ForbiddenError extends Error {
  /**
   * Error message to be thrown.
   *
   */
  message: string;

  /**
   * Creates an instance of ForbiddenError.
   *
   * @param {string} message - Error message.
   */
  constructor(message: string) {
    super(message, StatusCodes.FORBIDDEN);

    this.message = message;
  }
}

export default ForbiddenError;
