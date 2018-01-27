import { Router } from 'express';

import * as homeController from './controllers/home';

const router: Router = Router();

router.get('/', homeController.index);

export default router;
