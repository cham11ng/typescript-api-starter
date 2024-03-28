import { rateLimit } from 'express-rate-limit';

// write express rateLimit best practices
const rateLimitMiddleware = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes',
  headers: true
});

export default rateLimitMiddleware;
