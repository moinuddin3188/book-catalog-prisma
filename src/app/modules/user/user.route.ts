import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.get('/', UserController.getAllUser);

router.get('/:id', UserController.getSingleUser);

router.get('/:id', UserController.updateUser);

export const UserRoutes = router;
