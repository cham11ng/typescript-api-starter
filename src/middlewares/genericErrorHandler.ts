import { Request, Response, NextFunction } from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';

import logger from '../utils/logger';
import APIResponseInterface from '../domain/responses/APIResponse';

/**
 * Build error response for validation errors.
 *
 * @param  {Error} err
 * @return {Object}
 */
function buildError(err: any): APIResponseInterface {
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
}

/**
 * Generic error response middleware for internal server errors.
 *
 * @param  {any} err
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 * @returns void
 */
export default function genericErrorHandler(
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  err: any,
  _: Request,
  res: Response,
  // TODO: Remove this.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  __: NextFunction
): void {
  const error = buildError(err);

  logger.log('error', 'Error: %s', err.stack || err.message);

  res.status(error.code).json(error);
}
