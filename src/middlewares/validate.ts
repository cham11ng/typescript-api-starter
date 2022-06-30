import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

import logger from '../utils/logger';

/**
 * A middleware to validate schema.
 *
 * @param {Joi.Schema} schema
 */
export default function validate(schema: Joi.Schema) {
  return async (
    req: Request,
    _: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      logger.log('info', 'Validating schema');

      logger.log('debug', 'Validation Payload', req.body);
      const value = await schema.validateAsync(req.body);
      logger.log('debug', 'Validation Response:', value);

      next();
    } catch (err) {
      next(err);
    }
  };
}
