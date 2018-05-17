import User from '../models/User';
import * as jwt from '../utils/jwt';
import logger from '../utils/logger';
import config from '../config/config';
import * as bcrypt from '../utils/bcrypt';
import LoginPayload from '../domain/requests/LoginPayload';

import * as sessionService from '../services/sessionService';
import UnauthorizedError from '../exceptions/UnauthorizedError';

const { messages } = config;

/**
 * Create user session for valid user login.
 *
 * @export
 * @param {LoginPayload} loginPayload
 * @returns {object}
 */
export async function login(loginPayload: LoginPayload) {
  try {
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

    throw new UnauthorizedError(messages.auth.invalidCredentials);
  } catch (err) {
    throw err;
  }
}

/**
 * Generate new access token for valid refresh token
 *
 * @export
 * @param {string} token
 * @returns {string}
 */
export async function refresh(token: string) {
  return;
}

/**
 * Remove refresh token of the user if it exists and respond accordingly.
 *
 * @export
 * @param {string} token
 * @returns {object}
 * @throws {error}
 */
export async function logout(token: string) {
  return;
}
