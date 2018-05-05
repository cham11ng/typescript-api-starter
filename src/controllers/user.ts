import * as HttpStatus from 'http-status-codes';
import messages from '../resources/lang/responses.json';
import { Request, Response, NextFunction } from 'express';

import * as userService from '../services/userService';

export async function index(req: Request, res: Response, next: NextFunction) {
  try {
    const response = await userService.fetchAll();

    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: response,
      message: messages.users.fetchAll
    });
  } catch (err) {
    next(err);
  }
}
