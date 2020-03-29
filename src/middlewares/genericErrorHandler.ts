import * as HttpStatus from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

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
      code: HttpStatus.BAD_REQUEST,
      message: HttpStatus.getStatusText(HttpStatus.BAD_REQUEST),
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
    code: HttpStatus.INTERNAL_SERVER_ERROR,
    message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)
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
