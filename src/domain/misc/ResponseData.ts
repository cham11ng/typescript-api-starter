import JWTPayload from './JWTPayload';

type ResponseData = Request & { data: JWTPayload };

export default ResponseData;
