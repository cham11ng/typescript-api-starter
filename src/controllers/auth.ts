import * as HTTPStatus from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

import config from '../config/config';
import * as authService from '../services/authService';

const { messages } = config;

/**
 * Handle /login request.
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await authService.login(req.body);

    res.status(HTTPStatus.OK).json({
      data,
      code: HTTPStatus.OK,
      message: messages.auth.loginSuccess
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Handle /refresh request.
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function refresh(req: Request, res: Response, next: NextFunction) {
  try {
    const token = String(req.headers.authorization).replace('Bearer ', '');
    const data = await authService.refresh(token);

    res.status(HTTPStatus.OK).json({
      data,
      code: HTTPStatus.OK,
      message: messages.auth.accessTokenRefreshed
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Handle /logout request.
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    const token = String(req.headers.authorization).replace('Bearer ', '');
    const data = await authService.logout(token);

    res.status(HTTPStatus.OK).json({
      data,
      code: HTTPStatus.OK,
      message: messages.auth.logoutSuccess
    });
  } catch (error) {
    next(error);
  }
}
