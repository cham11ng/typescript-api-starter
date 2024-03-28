import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import config from '../config/config';
import UserPayload from '../domain/requests/UserPayload';
import * as userService from '../services/userService';

const { messages } = config;

/**
 * Handle /users GET request.
 *
 * @param {Request} req
 * @param _
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function index(_: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const response = await userService.fetchAll();

    res.status(StatusCodes.OK).json({
      code: StatusCodes.OK,
      data: response,
      message: messages.users.fetchAll
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Handle /users POST request.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function store(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userPayload = req.body as UserPayload;

    const response = await userService.insert(userPayload);

    res.status(StatusCodes.OK).json({
      code: StatusCodes.OK,
      data: response,
      message: messages.users.insert
    });
  } catch (err) {
    next(err);
  }
}
