import { Request, Response, NextFunction } from 'express';

import * as jwt from '../utils/jwt';
import logger from '../utils/logger';
import config from '../config/config';
import ErrorType from './../resources/enums/ErrorType';
import BadRequestError from '../exceptions/BadRequestError';
import UnauthorizedError from '../exceptions/UnauthorizedError';

const { errors } = config;

const tokenErrorMessageMap: any = {
  [ErrorType.INVALID]: errors.invalidToken,
  [ErrorType.EXPIRED]: errors.refreshTokenExpired
};

/**
 * A middleware to validateRefershToken the authorization token i.e. refresh token.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
async function validateRefreshToken(req: Request, res: Response, next: NextFunction) {
  try {
    res.locals.refreshToken = String(req.headers.authorization).replace('Bearer ', '');

    if (!req.headers.authorization || !res.locals.refreshToken) {
      throw new BadRequestError(errors.noToken);
    }

    logger.log('debug', 'JWT: Verifying token - ', res.locals.refreshToken);
    const response: any = jwt.verifyRefreshToken(res.locals.refreshToken);
    res.locals.jwtPayload = response.encryptedData;
    logger.log('debug', 'JWT: Authentication verified - ', res.locals.jwtPayload);

    next();
  } catch (err) {
    const tokenErrorMessage = tokenErrorMessageMap[err.name];
    logger.log('error', 'JWT: Authentication failed -', err.message);

    if (tokenErrorMessage) {
      logger.log('error', 'JWT: Token error -', tokenErrorMessage);

      next(new UnauthorizedError(tokenErrorMessage));
    } else {
      next(err);
    }
  }
}

export default validateRefreshToken;
