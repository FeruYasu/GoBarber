import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthentication';
import NotificationsController from '../controllers/NotificationsController';

const notificationsRouter = Router();
const notificationsController = new NotificationsController();

notificationsRouter.use(ensureAuthenticated);

notificationsRouter.get('/', notificationsController.index);
notificationsRouter.put('/:id', notificationsController.update);

export default notificationsRouter;
