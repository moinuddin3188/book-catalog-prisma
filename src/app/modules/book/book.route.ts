import express from 'express';
import { BookController } from './book.controller';

const router = express.Router();

router.post('/create-book', BookController.createBook);

router.get('/', BookController.getAllBook);

router.get('/:id', BookController.getSingleBook);

export const BookRoutes = router;
