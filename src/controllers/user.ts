import * as HttpStatus from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

import * as userService from '../services/userService';
import UserDetail from '../resources/domain/UserDetail';

export function index(req: Request, res: Response, next: NextFunction) {
  userService
    .fetchAll()
    .then((data: UserDetail[]) => {
      res.status(HttpStatus.OK).json({ data });
    })
    .catch((err: Error) => next(err));
}
