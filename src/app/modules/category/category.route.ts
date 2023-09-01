import express from 'express';
import { CategoryController } from './category.controller';

const router = express.Router();

router.post('/create-category', CategoryController.createCategory);

router.post('/', CategoryController.getAllCategories);

export const CategoryRoutes = router;
