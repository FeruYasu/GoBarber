import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import { celebrate, Segments, Joi } from 'celebrate';

import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';
import UserThemeController from '../controllers/UserThemeController';

import ensureAuthentication from '../middlewares/ensureAuthentication';

const usersRouter = Router();
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();
const userThemeController = new UserThemeController();

const upload = multer(uploadConfig.multer);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

usersRouter.patch(
  '/avatar',
  ensureAuthentication,
  upload.single('avatar'),
  userAvatarController.update,
);

usersRouter.patch('/theme', ensureAuthentication, userThemeController.update);

export default usersRouter;
