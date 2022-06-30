import logger from '../utils/logger';
import config from '../config/config';
import UserSession from '../models/UserSession';
import ErrorType from '../resources/enums/ErrorType';
import ForbiddenError from '../exceptions/ForbiddenError';
import UserSessionDetail from '../domain/entities/UserSessionDetail';
import UserSessionPayload from '../domain/requests/UserSessionPayload';

const { errors } = config;

/**
 * Insert user from given user payload.
 *
 * @param {UserSessionPayload} params
 * @returns {Promise<UserSessionDetail>}
 */
export async function create(
  params: UserSessionPayload
): Promise<UserSessionDetail> {
  logger.log('info', 'User Session: Creating session -', params);

  const session = await UserSession.query().insert(params).returning('*');

  logger.log('debug', 'User Session: Session created successfully -', session);

  return session;
}

/**
 * Deactivate user session.
 *
 * @param {string} token
 * @returns {Promise<UserSessionDetail>}
 */
export async function remove(token: string): Promise<UserSessionDetail> {
  try {
    logger.log('info', 'User Session: Deactivating token - %s', token);

    const [session] = await UserSession.query()
      .update({ isActive: false })
      .where('token', token)
      .where('isActive', true)
      .returning('*');
    logger.log('debug', 'User Session: Deactivated session -', session);

    return session;
  } catch (err: any) {
    if (err.message === ErrorType.NO_ROWS_UPDATED_ERROR) {
      throw new ForbiddenError(errors.sessionNotMaintained);
    }

    throw err;
  }
}
