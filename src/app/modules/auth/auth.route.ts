import express from 'express';
import { AuthController } from './auth.controller';

const router = express.Router();

router.post('/signup', AuthController.userSignUp);

router.post('/signin', AuthController.userLogin);

export const AuthRoutes = router;
