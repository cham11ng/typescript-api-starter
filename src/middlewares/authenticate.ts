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
  [ErrorType.EXPIRED]: errors.accessTokenExpired
};

/**
 * A middleware to authenticate the authorization token i.e. access token.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
async function authenticate(req: Request, res: Response, next: NextFunction) {
  try {
    res.locals.accessToken = String(req.headers.authorization).replace('Bearer ', '');

    if (!req.headers.authorization || !res.locals.accessToken) {
      throw new BadRequestError(errors.noToken);
    }

    logger.debug('JWT: Verifying token - ', req.headers.authorization, res.locals.accessToken);
    const response: any = jwt.verifyAccessToken(res.locals.accessToken);
    res.locals.loggedInPayload = response.encryptedData;
    logger.debug('JWT: Authentication verified - ', JSON.stringify(res.locals.loggedInPayload, null, 2));

    next();
  } catch (err) {
    const tokenErrorMessage = tokenErrorMessageMap[err.name];
    logger.error('JWT: Authentication failed -', err.message);

    if (tokenErrorMessage) {
      logger.error('JWT: Token error -', tokenErrorMessage);

      next(new UnauthorizedError(tokenErrorMessage));
    } else {
      next(err);
    }
  }
}

export default authenticate;
