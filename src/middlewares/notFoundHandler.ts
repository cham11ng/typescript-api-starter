import { NextFunction, Request, Response } from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';

const notFoundError = (
  _: Request,
  res: Response,
  // TODO: Remove this
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  __: NextFunction
): void => {
  res.status(StatusCodes.NOT_FOUND).json({
    error: {
      code: StatusCodes.NOT_FOUND,
      message: getReasonPhrase(StatusCodes.NOT_FOUND)
    }
  });
};

export default notFoundError;
