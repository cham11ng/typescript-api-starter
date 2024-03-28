import { StatusCodes } from 'http-status-codes';

import Error from './Error';

/**
 */
class UnauthorizedError extends Error {
  /**
   * Error message to be thrown.
   *
   */
  message: string;

  /**
   * Creates an instance of UnauthorizedError.
   *
   * @param {string} message - Error message.
   */
  constructor(message: string) {
    super(message, StatusCodes.UNAUTHORIZED);

    this.message = message;
  }
}

export default UnauthorizedError;
