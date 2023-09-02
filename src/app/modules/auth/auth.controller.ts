import { User } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AuthService } from './auth.service';

const userSignUp = catchAsync(async (req: Request, res: Response) => {
  const { ...user } = req.body;

  const result = await AuthService.userSignUp(user);

  sendResponse<Omit<User, 'password'>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User signed up successfully!',
    data: result,
  });
});

const userLogin = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;

  const result = await AuthService.userLogin(loginData);

  res.send({
    statusCode: httpStatus.OK,
    success: true,
    message: 'User signed up successfully!',
    token: result
  });
});

export const AuthController = {
  userSignUp,
  userLogin,
};
