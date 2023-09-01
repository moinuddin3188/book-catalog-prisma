import { User } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';

const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAllUser();

  sendResponse<Omit<User, 'password'>[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users retrieved successfully!',
    data: result,
  });
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await UserService.getSingleUser(id);

  sendResponse<Omit<User, 'password'> | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully!',
    data: result,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const { ...data } = req.body;

  const result = await UserService.updateUser(id, data);

  sendResponse<Omit<User, 'password'>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users updated successfully!',
    data: result,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await UserService.deleteUser(id);

  sendResponse<Omit<User, 'password'>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted successfully!',
    data: result,
  });
});

export const UserController = {
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
};
