import { Category } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const createCategory = async (data: Category): Promise<Category> => {
  const newCategory = await prisma.category.create({
    data,
  });

  if (!newCategory) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Category!');
  }

  return newCategory;
};

const getAllCategories = async (): Promise<Category[]> => {
  const allCategories = await prisma.category.findMany();

  return allCategories;
};

const getSingleCategory = async (id: string): Promise<Category | null> => {
  const singleCategory = await prisma.category.findUnique({
    where: {
      id,
    },
  });

  return singleCategory;
};

export const CategoryService = {
  createCategory,
  getAllCategories,
  getSingleCategory,
};
