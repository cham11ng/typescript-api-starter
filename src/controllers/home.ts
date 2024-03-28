import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import config from '../config/config';

const { name, version } = config;

export const index = (_: Request, res: Response): void => {
  res.status(StatusCodes.OK).json({
    name,
    version
  });
};
