import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';

const router = express.Router();

router.get('/', UserController.getAllUser);

router.get('/:id', UserController.getSingleUser);

router.patch(
  '/:id',
  validateRequest(UserValidation.updateUser),
  UserController.updateUser
);

router.delete('/:id', UserController.updateUser);

export const UserRoutes = router;
