import { NextFunction, Request, Response } from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';

import APIResponseInterface from '../domain/responses/APIResponse';
import logger from '../utils/logger';

export const buildError = (err: any): APIResponseInterface => {
  if (err.isJoi) {
    return {
      code: StatusCodes.BAD_REQUEST,
      message: getReasonPhrase(StatusCodes.BAD_REQUEST),
      data:
        err.details &&
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

export const genericErrorHandler = (
  err: any,
  _: Request,
  res: Response,
  // TODO: Remove this.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  __: NextFunction
): void => {
  const error = buildError(err);

  logger.log('error', 'Error: %s', err.stack || err.message);

  res.status(error.code).json(error);
};
