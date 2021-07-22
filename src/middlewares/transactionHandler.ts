import { v4 as uuidv4 } from 'uuid';
import { NextFunction, Request, Response } from 'express';

import context from '../utils/context';

/**
 * Transaction Handler middleware.
 *
 * @param  {Request} req
 * @param  {Response} _
 * @param  {NextFunction} next
 * @returns {void}
 */
function transactionHandler(
  req: Request,
  _: Response,
  next: NextFunction
): void {
  // The first asyncLocalStorage.run argument is the initialization of the store state, the second argument is the function that has access to that store
  context.run(new Map(), () => {
    // Try to extract the TransactionId from the request header, or generate a new one if it doesn't exist
    const transactionId = req.headers['transactionId'] || uuidv4();

    // Set the TransactionId inside the store
    context.getStore().set('transactionId', transactionId);

    next();
  });
}

export default transactionHandler;
