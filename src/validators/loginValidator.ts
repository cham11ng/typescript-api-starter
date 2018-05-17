import validate from './../utils/validate';
import { Request, Response, NextFunction } from 'express';

import * as authSchemas from './schemas/authSchema';

/**
 * Validate login post request.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function validateLoginRequest(req: Request, res: Response, next: NextFunction) {
  try {
    await validate(req.body, authSchemas.loginSchema);

    next();
  } catch (err) {
    next(err);
  }
}
