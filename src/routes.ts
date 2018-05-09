import { Router } from 'express';

import * as homeController from './controllers/home';
import * as userController from './controllers/user';
import * as routes from './resources/constants/endpoints';
import { validateUserRequest } from './validators/userValidator';

const router: Router = Router();

router.get(routes.home, homeController.index);

router.get(routes.users, userController.index);
router.post(routes.users, validateUserRequest, userController.store);

export default router;
