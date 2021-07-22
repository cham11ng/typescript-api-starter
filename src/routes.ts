import { Router } from 'express';

import * as validate from './middlewares/validate';
import * as homeController from './controllers/home';
import * as userController from './controllers/user';
import * as authController from './controllers/auth';
import authenticate from './middlewares/authenticate';
import { loginSchema } from './validators/loginRequest';
import { userPOSTSchema } from './validators/userRequest';
import validateRefreshToken from './middlewares/validateRefreshToken';

const router: Router = Router();

router.get('/', homeController.index);

router.post('/login', validate.schema(loginSchema), authController.login);
router.post('/refresh', validateRefreshToken, authController.refresh);
router.post('/logout', validateRefreshToken, authController.logout);

router.get('/users', authenticate, userController.index);
router.post(
  '/users',
  authenticate,
  validate.schema(userPOSTSchema),
  userController.store
);

export default router;
