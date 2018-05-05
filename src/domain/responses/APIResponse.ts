/**
 * API Response Interface.
 */
interface APIResponse {
  code: number;
  message: string;
  data?: any;
}

export default APIResponse;
