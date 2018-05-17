import logger from '../utils/logger';
import * as object from '../utils/object';
import UserSession from '../models/UserSession';
import UserSessionDetail from '../domain/entities/UserSessionDetail';
import UserSessionPayload from '../domain/requests/UserSessionPayload';

/**
 * Insert user from given user payload.
 *
 * @param {UserSessionPayload} params
 * @returns {Promise<UserSessionDetail>}
 */
export async function create(params: UserSessionPayload): Promise<UserSessionDetail> {
  logger.debug('User Session: Creating session - ', JSON.stringify(params, null, 2));
  const user = await new UserSession(params).save();
  logger.debug('User Session: Session created successfully - ', JSON.stringify(user, null, 2));

  return object.camelize(user.serialize());
}
