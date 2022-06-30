import jwbt from 'jsonwebtoken';

import logger from './logger';
import config from '../config/config';
import JWTPayload from '../domain/misc/JWTPayload';
import LoggedInUser from '../domain/misc/LoggedInUser';

const {
  accessTokenDuration,
  accessTokenSecretKey,
  refreshTokenDuration,
  refreshTokenSecretKey
} = config.auth;

if (!refreshTokenSecretKey || !accessTokenSecretKey) {
  throw new Error('Auth refresh and access token secrets cannot be empty.');
}

/**
 * Generate access token from given data
 *
 * @param {LoggedInUser} data
 * @returns {string}
 */
export function generateAccessToken(data: LoggedInUser): string {
  logger.log('info', 'JWT: Generating access token -', {
    data,
    expiresIn: accessTokenDuration
  });

  return jwbt.sign({ data }, accessTokenSecretKey, {
    expiresIn: accessTokenDuration
  });
}

/**
 * Generate refresh token from given data
 *
 * @param {JWTPayload} data
 * @returns {string}
 */
export function generateRefreshToken(data: JWTPayload): string {
  logger.log('info', 'JWT: Generating refresh token -', {
    data,
    expiresIn: refreshTokenDuration
  });

  return jwbt.sign({ data }, refreshTokenSecretKey, {
    expiresIn: refreshTokenDuration
  });
}

/**
 * Verify access token.
 *
 * @param {string} token
 * @returns {object | string}
 */
export function verifyAccessToken(token: string): jwbt.JwtPayload | string {
  return jwbt.verify(token, accessTokenSecretKey);
}

/**
 * Verify refresh token.
 *
 * @param {string} token
 * @returns {object | string}
 */
export function verifyRefreshToken(token: string): jwbt.JwtPayload | string {
  return jwbt.verify(token, refreshTokenSecretKey);
}
