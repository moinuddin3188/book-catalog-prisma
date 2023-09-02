import { Book } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { bookFilterableFields } from './book.constant';
import { BookService } from './book.service';

const createBook = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body;

  const result = await BookService.createBook(data);

  sendResponse<Book>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book created Successfully!',
    data: result,
  });
});

const getAllBook = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, bookFilterableFields);
  const options = pick(req.query, paginationFields);

  const result = await BookService.getAllBook(filters, options);

  sendResponse<Book[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book retrieved Successfully!',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await BookService.getSingleBook(id);

  sendResponse<Book | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book retrieved Successfully!',
    data: result,
  });
});

const getBookByCategoryId = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.categoryId;
  const options = pick(req.query, paginationFields);

  const result = await BookService.getBookByCategoryId(id, options);

  sendResponse<Book[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book retrieved Successfully!',
    meta: result.meta,
    data: result.data,
  });
});

const updateBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const { ...data } = req.body;

  const result = await BookService.updateBook(id, data);

  sendResponse<Book | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book updated Successfully!',
    data: result,
  });
});

const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await BookService.deleteBook(id);

  sendResponse<Book>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book deleted Successfully!',
    data: result,
  });
});

export const BookController = {
  createBook,
  getAllBook,
  getBookByCategoryId,
  getSingleBook,
  updateBook,
  deleteBook,
};
