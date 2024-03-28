/**
 * API Response Interface.
 */
interface APIResponse<Data> {
  code: number;
  message: string;
  data?: Data;
}

export default APIResponse;
