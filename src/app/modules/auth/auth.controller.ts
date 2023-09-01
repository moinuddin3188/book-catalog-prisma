import { User } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AuthService } from './auth.service';

const userSignUp = catchAsync(async (req: Request, res: Response) => {
  const { ...user } = req.body;

  const result = await AuthService.userSignUp(user);

  sendResponse<User>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User signed up successfully!',
    data: result,
  });
});

export const AuthController = {
  userSignUp,
};
