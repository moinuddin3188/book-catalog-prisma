import express from 'express';
import { BookController } from './book.controller';

const router = express.Router();

router.post('/create-book', BookController.createBook);

router.get('/', BookController.getAllBook);

router.get('/:id', BookController.getSingleBook);

router.patch('/:id', BookController.updateBook);

router.delete('/:id', BookController.deleteBook);

router.get('/:categoryId', BookController.deleteBook);

export const BookRoutes = router;
