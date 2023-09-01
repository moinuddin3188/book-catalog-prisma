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
    include: {
      books: true,
    },
  });

  return singleCategory;
};

const updateCategory = async (
  id: string,
  payload: Partial<Category>
): Promise<Category> => {
  const updatedCategory = await prisma.category.update({
    where: {
      id,
    },
    data: payload,
  });

  return updatedCategory;
};

const deleteCategory = async (id: string): Promise<Category> => {
  const deletedCategory = await prisma.category.delete({
    where: {
      id,
    },
  });

  return deletedCategory;
};

export const CategoryService = {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
