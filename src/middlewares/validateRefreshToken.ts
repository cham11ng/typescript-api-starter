import { NextFunction, Request, Response } from 'express';

import config from '../config/config';
import BadRequestError from '../exceptions/BadRequestError';
import UnauthorizedError from '../exceptions/UnauthorizedError';
import { tokenErrorMessageMap } from '../resources/constants/maps';
import { JWTErrorType } from '../resources/enums/ErrorType';
import * as jwt from '../utils/jwt';
import logger from '../utils/logger';

const { errors } = config;

const validateRefreshToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    res.locals.refreshToken = String(req.headers.authorization).replace('Bearer ', '');

    if (!req.headers.authorization || !res.locals.refreshToken) {
      throw new BadRequestError(errors.noToken);
    }

    logger.log('info', 'JWT: Verifying token - %s', res.locals.refreshToken);
    const response: any = jwt.verifyRefreshToken(res.locals.refreshToken);

    res.locals.jwtPayload = response.data;

    logger.log('debug', 'JWT: Authentication verified -', res.locals.jwtPayload);

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
};

export default validateRefreshToken;
