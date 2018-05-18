import logger from '../utils/logger';
import config from '../config/config';
import * as object from '../utils/object';
import UserSession from '../models/UserSession';
import ForbiddenError from '../exceptions/ForbiddenError';
import UserSessionDetail from '../domain/entities/UserSessionDetail';
import UserSessionPayload from '../domain/requests/UserSessionPayload';

const { messages } = config;

/**
 * Insert user from given user payload.
 *
 * @param {UserSessionPayload} params
 * @returns {Promise<UserSessionDetail>}
 */
export async function create(params: UserSessionPayload): Promise<UserSessionDetail> {
  logger.debug('User Session: Creating session - ', JSON.stringify(params, null, 2));
  const session = await new UserSession(params).save();
  logger.debug('User Session: Session created successfully - ', JSON.stringify(session, null, 2));

  return object.camelize(session.serialize());
}

/**
 * Deactivate user session.
 *
 * @param {string} token
 * @returns {Promise<UserSessionDetail>}
 */
export async function remove(token: string): Promise<UserSessionDetail> {
  logger.debug('User Session: Deactivating token - ', token);
  const session = await new UserSession().where({ token }).save({ isActive: false }, { patch: true, require: false });

  if (session) {
    logger.debug('User Session: Deactivated user session', JSON.stringify(session, null, 2));

    return object.camelize(session.serialize());
  }

  throw new ForbiddenError(messages.auth.logoutFailed);
}
