import { Router } from 'express';

import * as authController from './controllers/auth';
import * as homeController from './controllers/home';
import * as userController from './controllers/user';
import authenticate from './middlewares/authenticate';
import validate from './middlewares/validate';
import validateRefreshToken from './middlewares/validateRefreshToken';
import { loginSchema } from './validators/loginRequest';
import { userPOSTSchema } from './validators/userRequest';

const router: Router = Router();

router.get('/', homeController.index);

router.post('/login', validate(loginSchema), authController.login);
router.post('/refresh', validateRefreshToken, authController.refresh);
router.post('/logout', validateRefreshToken, authController.logout);

router.get('/users', authenticate, userController.index);
router.post('/users', authenticate, validate(userPOSTSchema), userController.store);

export default router;
