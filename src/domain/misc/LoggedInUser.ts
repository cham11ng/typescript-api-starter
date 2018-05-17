import JWTPayload from './JWTPayload';

/**
 * LoggedInUser Interface.
 */
interface LoggedInUser extends JWTPayload {
  sessionId: number;
}

export default LoggedInUser;
