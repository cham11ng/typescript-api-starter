import { Request, Response, NextFunction } from 'express';

import * as jwt from '../utils/jwt';
import logger from '../utils/logger';
import config from '../config/config';
import BadRequestError from '../exceptions/BadRequestError';
import { JWTErrorType } from '../resources/enums/ErrorType';
import UnauthorizedError from '../exceptions/UnauthorizedError';
import { tokenErrorMessageMap } from '../resources/constants/maps';

const { errors } = config;

/**
 * A middleware to validateRefershToken the authorization token i.e. refresh token.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
async function validateRefreshToken(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    res.locals.refreshToken = String(req.headers.authorization).replace(
      'Bearer ',
      ''
    );

    if (!req.headers.authorization || !res.locals.refreshToken) {
      throw new BadRequestError(errors.noToken);
    }

    logger.log('info', 'JWT: Verifying token - %s', res.locals.refreshToken);
    const response: any = jwt.verifyRefreshToken(res.locals.refreshToken);

    res.locals.jwtPayload = response.data;

    logger.log(
      'debug',
      'JWT: Authentication verified -',
      res.locals.jwtPayload
    );

    next();
  } catch (err: any) {
    const tokenErrorMessage = tokenErrorMessageMap[err.name as JWTErrorType];
    logger.log('error', 'JWT: Authentication failed - %s', err.message);

    if (tokenErrorMessage) {
      logger.log('error', 'JWT: Token error - %s', tokenErrorMessage);

      next(new UnauthorizedError(tokenErrorMessage));
    } else {
      next(err);
    }
  }
}

export default validateRefreshToken;
