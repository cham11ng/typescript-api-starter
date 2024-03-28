import { StatusCodes } from 'http-status-codes';

import Error from './Error';

/**
 */
class BadRequestError extends Error {
  /**
   * Error message to be thrown.
   */
  message: string;

  /**
   * Creates an instance of BadRequestError.
   *
   * @param {string} message - Error message.
   */
  constructor(message: string) {
    super(message, StatusCodes.BAD_REQUEST);

    this.message = message;
  }
}

export default BadRequestError;
