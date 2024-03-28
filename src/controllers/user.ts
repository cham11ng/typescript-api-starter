import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import config from '../config/config';
import UserPayload from '../domain/requests/UserPayload';
import * as userService from '../services/userService';

const { messages } = config;

export const index = async (_: Request, res: Response, next: NextFunction): Promise<void> => {
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
};

export const store = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
};
