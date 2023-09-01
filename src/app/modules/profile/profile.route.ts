import express from 'express';
import { ProfileController } from './profile.controller';

const router = express.Router();

router.get('/', ProfileController.getSingleUser);

export const ProfileRoutes = router;
