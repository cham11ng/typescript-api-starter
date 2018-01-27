import { Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';

export function index(req: Request, res: Response) {
  res.status(HttpStatus.OK).json({
    name: req.app.locals.name,
    version: req.app.locals.version
  });
}
