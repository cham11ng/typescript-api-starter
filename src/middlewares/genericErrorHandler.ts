import { NextFunction, Request, Response } from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';

import APIResponseInterface from '../domain/responses/APIResponse';
import logger from '../utils/logger';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const buildError = (err: any): APIResponseInterface<{ code: number; message: string; data?: any }> => {
  if (err.isJoi) {
    return {
      code: StatusCodes.BAD_REQUEST,
      message: getReasonPhrase(StatusCodes.BAD_REQUEST),
      data:
        err.details &&
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        err.details.map((error: any) => ({
          param: error.path.join('.'),
          message: error.message
        }))
    };
  }

  if (err.isBoom) {
    return {
      code: err.output.statusCode,
      message: err.output.payload.message || err.output.payload.error
    };
  }

  if (err.isCustom) {
    return {
      code: err.statusCode,
      message: err.message
    };
  }

  return {
    code: StatusCodes.INTERNAL_SERVER_ERROR,
    message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)
  };
};

const genericErrorHandler = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err: any,
  _: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  __: NextFunction
): void => {
  const error = buildError(err);

  logger.log('error', 'Error: %s', err.stack || err.message);

  res.status(error.code).json(error);
};

export default genericErrorHandler;
