import JWTPayload from './JWTPayload';

/**
 * LoggedInUser interface.
 */
interface LoggedInUser extends JWTPayload {
  sessionId: number;
}

export default LoggedInUser;
