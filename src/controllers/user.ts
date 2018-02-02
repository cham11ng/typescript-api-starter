import * as HttpStatus from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

import { fetchUsers } from '../services/userService';

export function index(req: Request, res: Response, next: NextFunction) {
  fetchUsers()
    .then(data => {
      res.status(HttpStatus.OK).json({ data });
    })
    .catch((err: Error) => next(err));
}
