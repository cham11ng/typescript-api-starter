import { Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';

import config from '../config/config';

const { name, version } = config;

/**
 * Handle / GET request, responds API information.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {void}
 */
export function index(_: Request, res: Response): void {
  res.status(HttpStatus.OK).json({
    name,
    version
  });
}
