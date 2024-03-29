import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BookController } from './book.controller';
import { BookValidation } from './book.validation';

const router = express.Router();

router.post(
  '/create-book',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(BookValidation.createBook),
  BookController.createBook
);

router.get('/', BookController.getAllBook);

router.get('/:id', BookController.getSingleBook);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(BookValidation.updateBook),
  BookController.updateBook
);

router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), BookController.deleteBook);

router.get('/:categoryId/category', BookController.getBookByCategoryId);

export const BookRoutes = router;
