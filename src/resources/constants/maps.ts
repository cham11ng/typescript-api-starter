import config from '../../config/config';
import { JWTErrorType } from '../enums/ErrorType';

const { errors } = config;

export const tokenErrorMessageMap = {
  [JWTErrorType.INVALID]: errors.invalidToken,
  [JWTErrorType.EXPIRED]: errors.refreshTokenExpired
};
