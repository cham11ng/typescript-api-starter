import validate from './../utils/validate';
import { Request, Response, NextFunction } from 'express';

import * as userSchemas from './schemas/userSchema';

/**
 * Validate user post request.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function validateUserRequest(req: Request, res: Response, next: NextFunction) {
  try {
    await validate(req.body, userSchemas.userSchema);

    next();
  } catch (err) {
    next(err);
  }
}
