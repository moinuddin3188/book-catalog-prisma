import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from '../user/user.validation';
import { AuthController } from './auth.controller';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(UserValidation.userSignUp),
  AuthController.userSignUp
);

router.post(
  '/signin',
  validateRequest(UserValidation.userSignIn),
  AuthController.userLogin
);

export const AuthRoutes = router;
