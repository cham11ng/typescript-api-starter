import { Router } from 'express';

import * as homeController from './controllers/home';
import * as userController from './controllers/user';
import { validateUserRequest } from './validators/userValidator';

const router: Router = Router();

router.get('/', homeController.index);

router.get('/users', userController.index);
router.post('/users', validateUserRequest, userController.store);

export default router;
