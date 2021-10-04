import * as HttpStatus from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

/**
 * Error response middleware for 404 not found.
 *
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 * @returns <void>
 */
export default function notFoundError(
  _: Request,
  res: Response,
  // TODO: Remove this
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  __: NextFunction
): void {
  res.status(HttpStatus.NOT_FOUND).json({
    error: {
      code: HttpStatus.NOT_FOUND,
      message: HttpStatus.getStatusText(HttpStatus.NOT_FOUND)
    }
  });
}
