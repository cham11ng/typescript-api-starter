import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

import config from '../config/config';
import JWTPayload from '../domain/misc/JWTPayload';
import * as authService from '../services/authService';

const { messages } = config;

/**
 * Handle /login request.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function login(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await authService.login(req.body);

    res.status(StatusCodes.OK).json({
      data,
      code: StatusCodes.OK,
      message: messages.auth.loginSuccess
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Handle /refresh request.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function refresh(
  _: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const token = String(res.locals.refreshToken);
    const jwtPayload = res.locals.jwtPayload as JWTPayload;
    const data = await authService.refresh(token, jwtPayload);

    res.status(StatusCodes.OK).json({
      data,
      code: StatusCodes.OK,
      message: messages.auth.accessTokenRefreshed
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Handle /logout request.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function logout(
  _: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const token = String(res.locals.refreshToken);
    await authService.logout(token);

    res.status(StatusCodes.OK).json({
      code: StatusCodes.OK,
      message: messages.auth.logoutSuccess
    });
  } catch (error) {
    next(error);
  }
}
