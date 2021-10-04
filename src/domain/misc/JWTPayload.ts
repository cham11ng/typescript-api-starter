/**
 * JWTPayload Interface.
 */
interface JWTPayload {
  name: string;
  email: string;
  userId: number;
  roleId: number;
}

export default JWTPayload;
