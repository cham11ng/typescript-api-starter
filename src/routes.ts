import { Router } from 'express';

import * as homeController from './controllers/home';
import * as userController from './controllers/user';

const router: Router = Router();

router.get('/', homeController.index);

router.get('/users', userController.index);
router.post('/users', userController.store);

export default router;
