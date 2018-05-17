/**
 * UserSessionDetail interface.
 */
interface UserSessionDetail {
  id: number;
  token: string;
  userId: number;
  isActive: boolean;
  updatedBy?: string;
  createdBy?: string;
}

export default UserSessionDetail;
