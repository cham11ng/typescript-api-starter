import { NextFunction, Request, Response } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';

import config from '../config/config';
import BadRequestError from '../exceptions/BadRequestError';
import UnauthorizedError from '../exceptions/UnauthorizedError';
import { tokenErrorMessageMap } from '../resources/constants/maps';
import * as jwt from '../utils/jwt';
import logger from '../utils/logger';
import { JWTErrorType } from './../resources/enums/ErrorType';

const { errors } = config;

const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    res.locals.accessToken = String(req.headers.authorization).replace('Bearer ', '');

    if (!req.headers.authorization || !res.locals.accessToken) {
      throw new BadRequestError(errors.noToken);
    }

    logger.log('info', 'JWT: Verifying token - %s', res.locals.accessToken);
    const response: any = jwt.verifyAccessToken(res.locals.accessToken);

    res.locals.loggedInPayload = response.data;

    logger.log('debug', 'JWT: Authentication verified -', res.locals.loggedInPayload);

    next();
  } catch (err) {
    if (err instanceof JsonWebTokenError) {
      const tokenErrorMessage = tokenErrorMessageMap[err.name as JWTErrorType];
      logger.log('error', 'JWT: Authentication failed - %s', err.message);

      if (tokenErrorMessage) {
        logger.log('error', 'JWT: Token error - %s', tokenErrorMessage);

        next(new UnauthorizedError(tokenErrorMessage));

        return;
      }
    }

    next(err);
  }
};

export default authenticate;
