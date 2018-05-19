/**
 * List of ErrorType.
 */
enum ErrorType {
  INVALID = 'JsonWebTokenError',
  EXPIRED = 'TokenExpiredError',
  NO_ROWS_UPDATED_ERROR = 'No Rows Updated'
}

export default ErrorType;
