import { Book, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { bookSearchableFields } from './book.constant';
import { IBookFilters } from './book.interface';

const createBook = async (data: Book): Promise<Book> => {
  const newBook = await prisma.book.create({
    data,
  });

  if (!newBook) {
    throw new ApiError(httpStatus.OK, 'Book created Successfully!');
  }

  return newBook;
};

const getAllBook = async (
  filters: IBookFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Book[]>> => {
  const { size, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);
  const { search, ...filterData } = filters;

  const andConditions = [];

  if (search) {
    andConditions.push({
      OR: bookSearchableFields.map(field => ({
        [field]: {
          contains: search,
          mode: 'insensitive',
        },
      })),
    });
  }

  let categoryFilter = {};

  if (filterData.category) {
    categoryFilter = {
      category: {
        id: filterData.category,
      },
    };
  }

  let priceFilter = {};

  if (filterData.maxPrice || filterData.minPrice) {
    priceFilter = {
      price: {
        gte: filterData.minPrice,
        lte: filterData.maxPrice,
      },
    };
  }

  if (Object.keys(filterData).length) {
    andConditions.push({
      AND: [categoryFilter, priceFilter],
    });
  }

  const whereConditions: Prisma.BookWhereInput = andConditions.length
    ? { AND: andConditions }
    : {};

  const allBooks = await prisma.book.findMany({
    where: whereConditions,
    include: {
      category: true,
    },
    skip,
    take: size,
    orderBy:
      sortBy && sortOrder
        ? { [sortBy]: sortOrder }
        : {
            createdAt: 'desc',
          },
  });

  const total = await prisma.book.count({
    where: whereConditions,
  });

  const totalPage = paginationHelpers.calculateTotalPage(total, size);

  return {
    meta: {
      total,
      page,
      size,
      totalPage,
    },
    data: allBooks,
  };
};

const getSingleBook = async (id: string): Promise<Book | null> => {
  const singleBook = await prisma.book.findUnique({
    where: {
      id,
    },
  });

  return singleBook;
};

const updateBook = async (
  id: string,
  payload: Partial<Book>
): Promise<Book> => {
  const updatedBook = await prisma.book.update({
    where: {
      id,
    },
    data: payload,
  });

  return updatedBook;
};

export const BookService = {
  createBook,
  getAllBook,
  getSingleBook,
  updateBook,
};
