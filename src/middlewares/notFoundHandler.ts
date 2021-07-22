import { Request, Response, NextFunction } from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';

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
  res.status(StatusCodes.NOT_FOUND).json({
    error: {
      code: StatusCodes.NOT_FOUND,
      message: getReasonPhrase(StatusCodes.NOT_FOUND)
    }
  });
}
