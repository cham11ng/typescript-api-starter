import { Router } from 'express';

import * as homeController from './controllers/home';
import * as userController from './controllers/user';
import * as authController from './controllers/auth';
import { validateUserRequest } from './validators/userValidator';
import { validateLoginRequest } from './validators/loginValidator';

const router: Router = Router();

router.get('/', homeController.index);

router.post('/login', validateLoginRequest, authController.login);
router.post('/refresh', authController.refresh);
router.post('/logout', authController.logout);

router.get('/users', userController.index);
router.post('/users', validateUserRequest, userController.store);

export default router;
