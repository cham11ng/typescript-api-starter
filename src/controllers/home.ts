import { Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';

/**
 * Handle / GET request, responds API information.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {void}
 */
export function index(req: Request, res: Response): void {
  res.status(HttpStatus.OK).json({
    name: req.app.locals.name,
    version: req.app.locals.version
  });
}
