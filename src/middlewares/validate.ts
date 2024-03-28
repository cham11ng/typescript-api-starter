import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

import logger from '../utils/logger';

/**
 * A middleware to validate schema.
 *
 * @param {Joi.Schema} schema - Joi schema.
 * @returns {Function}
 */
export default function validate(schema: Joi.Schema) {
  return async (req: Request, _: Response, next: NextFunction): Promise<void> => {
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
