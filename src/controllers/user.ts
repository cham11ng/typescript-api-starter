import * as HttpStatus from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

import UserDetail from '../domain/entities/UserDetail';
import * as userService from '../services/userService';

export function index(req: Request, res: Response, next: NextFunction) {
  userService
    .fetchAll()
    .then((data: UserDetail[]) => {
      res.status(HttpStatus.OK).json({ data });
    })
    .catch((err: Error) => next(err));
}
