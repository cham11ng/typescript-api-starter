import User from '../models/User';
import * as jwt from '../utils/jwt';
import logger from '../utils/logger';
import config from '../config/config';
import * as bcrypt from '../utils/bcrypt';
import UserSession from '../models/UserSession';
import JWTPayload from '../domain/misc/JWTPayload';
import ForbiddenError from '../exceptions/ForbiddenError';
import LoginPayload from '../domain/requests/LoginPayload';
import * as sessionService from '../services/sessionService';
import UnauthorizedError from '../exceptions/UnauthorizedError';

const { errors } = config;

/**
 * Create user session for valid user login.
 *
 * @param {LoginPayload} loginPayload
 * @returns {object}
 */
export async function login(loginPayload: LoginPayload) {
  const { email, password } = loginPayload;

  const user = await new User({ email }).fetch();
  logger.debug('Login: Fetched user by email - ', user);

  if (user) {
    logger.debug(`Login: Comparing request password - ${password} and hashed password - ${user.attributes.password}`);

    const isSame = await bcrypt.compare(password, user.attributes.password);

    logger.debug('Login: Password match status -', isSame);

    if (isSame) {
      const { name, roleId, id: userId } = user.attributes;
      const loggedInUser = { name, email, userId, roleId };
      const refreshToken = jwt.generateRefreshToken(loggedInUser);
      const userSessionPayload = { userId, token: refreshToken };
      const session = await sessionService.create(userSessionPayload);
      const accessToken = jwt.generateAccessToken({ ...loggedInUser, sessionId: session.id });

      return { refreshToken, accessToken };
    }
  }

  throw new UnauthorizedError(errors.invalidCredentials);
}

/**
 * Refresh new access token.
 *
 * @param {string} token
 * @param {jwtPayload} jwtPayload
 * @returns {string}
 */
export async function refresh(token: string, jwtPayload: JWTPayload) {
  logger.debug('User Session: Fetching session of token -', token);

  const session = await new UserSession({ token, isActive: true }).fetch();

  logger.debug('User Session: fetched session -', JSON.stringify(session, null, 2));

  if (!session) {
    throw new ForbiddenError(errors.sessionNotMaintained);
  }

  const accessToken = jwt.generateAccessToken({ ...jwtPayload, sessionId: session.id });
  logger.debug('JWT: New access token generated -', accessToken);

  return {
    accessToken
  };
}

/**
 * Remove user session.
 *
 * @param {string} token
 */
export async function logout(token: string) {
  const session = await sessionService.remove(token);

  if (!session) {
    throw new ForbiddenError(errors.sessionNotMaintained);
  }
}
