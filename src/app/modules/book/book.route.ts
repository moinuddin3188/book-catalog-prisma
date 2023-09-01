import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BookController } from './book.controller';
import { BookValidation } from './book.validation';

const router = express.Router();

router.post(
  '/create-book',
  validateRequest(BookValidation.createBook),
  BookController.createBook
);

router.get('/', BookController.getAllBook);

router.get('/:id', BookController.getSingleBook);

router.patch(
  '/:id',
  validateRequest(BookValidation.updateBook),
  BookController.updateBook
);

router.delete('/:id', BookController.deleteBook);

router.get('/:categoryId', BookController.deleteBook);

export const BookRoutes = router;
