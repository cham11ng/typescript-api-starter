import * as HttpStatus from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

import * as userService from '../services/userService';

export async function index(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await userService.fetchAll();

    res.status(HttpStatus.OK).json({ data });
  } catch (err) {
    next(err);
  }
}
