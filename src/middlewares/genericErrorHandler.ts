import * as HttpStatus from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

import logger from '../utils/logger';

/**
 * Generic error response middleware for internal server errors.
 *
 * @param  {any} err
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 * @returns <void>
 */
export default function genericErrorHandler(err: any, req: Request, res: Response, next: NextFunction): void {
  logger.error(err);

  // Joi Validation errors
  if (err.isJoi) {
    res.status(err.output.statusCode).json({
      code: HttpStatus.BAD_REQUEST,
      message: HttpStatus.getStatusText(HttpStatus.BAD_REQUEST),
      details:
        err.details &&
        err.details.map((error: any) => {
          return {
            message: error.message,
            param: error.path.join('.')
          };
        })
    });
  }

  if (err.isBoom) {
    res.status(err.output.statusCode).json({
      error: {
        code: err.output.statusCode,
        message: err.output.payload.message || err.output.payload.error
      }
    });
  }

  res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    error: {
      code: HttpStatus.INTERNAL_SERVER_ERROR,
      message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)
    }
  });
}
