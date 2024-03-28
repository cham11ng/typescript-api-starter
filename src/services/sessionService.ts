import config from '../config/config';
import UserSessionDetail from '../domain/entities/UserSessionDetail';
import UserSessionPayload from '../domain/requests/UserSessionPayload';
import ForbiddenError from '../exceptions/ForbiddenError';
import UserSession from '../models/UserSession';
import logger from '../utils/logger';

const { errors } = config;

/**
 * Insert user from given user payload.
 *
 * @param {UserSessionPayload} params - User payload.
 * @returns {Promise<UserSessionDetail>}
 */
export async function create(params: UserSessionPayload): Promise<UserSessionDetail> {
  logger.log('info', 'User Session: Creating session -', params);

  const session = await UserSession.query().insert(params).returning('*');

  logger.log('debug', 'User Session: Session created successfully -', session);

  return session;
}

/**
 * Deactivate user session.
 *
 * @param {string} token - Session token.
 * @returns {Promise<UserSessionDetail>}
 */
export async function remove(token: string): Promise<UserSessionDetail> {
  logger.log('info', 'User Session: Deactivating token - %s', token);

  const session = await UserSession.query().findOne({
    token,
    isActive: true
  });

  if (!session) {
    throw new ForbiddenError(errors.sessionNotMaintained);
  }

  const updatedSession = await session.$query().updateAndFetch({ isActive: false });
  logger.log('debug', 'User Session: Deactivated session -', updatedSession);

  return updatedSession;
}
