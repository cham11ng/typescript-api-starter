import { Router } from 'express';

import * as homeController from './controllers/home';
import * as userController from './controllers/user';
import * as authController from './controllers/auth';
import authenticate from './middlewares/authenticate';
import { validateUserRequest } from './validators/userValidator';
import { validateLoginRequest } from './validators/loginValidator';
import validateRefreshToken from './middlewares/validateRefreshToken';

const router: Router = Router();

router.get('/', homeController.index);

router.post('/login', validateLoginRequest, authController.login);
router.post('/refresh', validateRefreshToken, authController.refresh);
router.post('/logout', validateRefreshToken, authController.logout);

router.get('/users', userController.index);
router.post('/users', authenticate, validateUserRequest, userController.store);

export default router;
