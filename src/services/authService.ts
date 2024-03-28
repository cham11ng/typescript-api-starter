import config from '../config/config';
import JWTPayload from '../domain/misc/JWTPayload';
import LoginPayload from '../domain/requests/LoginPayload';
import TokenResponse from '../domain/responses/TokenResponse';
import ForbiddenError from '../exceptions/ForbiddenError';
import UnauthorizedError from '../exceptions/UnauthorizedError';
import User from '../models/User';
import UserSession from '../models/UserSession';
import * as sessionService from '../services/sessionService';
import * as bcrypt from '../utils/bcrypt';
import * as jwt from '../utils/jwt';
import logger from '../utils/logger';

const { errors } = config;

/**
 * Create user session for valid user login.
 *
 * @param {LoginPayload} loginPayload - Login payload.
 * @returns {Promise<TokenResponse>}
 */
export async function login(loginPayload: LoginPayload): Promise<TokenResponse> {
  const { email, password } = loginPayload;

  logger.log('info', 'Checking email: %s', email);
  const user = await User.query().findOne({ email });

  if (user) {
    logger.log('debug', 'Login: Fetched user by email -', user);
    logger.log('debug', 'Login: Comparing password');

    const isSame = await bcrypt.compare(password, user.password);

    logger.log('debug', 'Login: Password match status - %s', isSame);

    if (isSame) {
      const { name, roleId, id: userId } = user;
      const loggedInUser = { name, email, userId, roleId };
      const refreshToken = jwt.generateRefreshToken(loggedInUser);
      const userSessionPayload = { userId, token: refreshToken };
      const session = await sessionService.create(userSessionPayload);
      const accessToken = jwt.generateAccessToken({
        ...loggedInUser,
        sessionId: session.id
      });

      return { refreshToken, accessToken };
    }
  }

  throw new UnauthorizedError(errors.invalidCredentials);
}

/**
 * Refresh new access token.
 *
 * @param {string} token - Refresh token.
 * @param {jwtPayload} jwtPayload - JWT payload.
 * @returns {Promise<TokenResponse>}
 */
export async function refresh(token: string, jwtPayload: JWTPayload): Promise<TokenResponse> {
  logger.log('info', 'User Session: Fetching session of token - %s', token);

  const session = await UserSession.query().findOne({
    token,
    isActive: true
  });
  if (!session) {
    throw new ForbiddenError(errors.sessionNotMaintained);
  }

  logger.log('debug', 'User Session: Fetched session -', session);
  logger.log('info', 'JWT: Generating new access token');

  const accessToken = jwt.generateAccessToken({
    ...jwtPayload,
    sessionId: session.id
  });

  return {
    accessToken
  };
}

/**
 * Remove user session.
 *
 * @param {string} token - Session token.
 * @returns {Promise<void>}
 */
export async function logout(token: string): Promise<void> {
  logger.log('info', 'Logout: Logging out user session - %s', token);

  const session = await sessionService.remove(token);

  if (!session) {
    throw new ForbiddenError(errors.sessionNotMaintained);
  }
}
