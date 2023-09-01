import { User } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ProfileService } from './profile.service';

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  const result = await ProfileService.getUserProfile(user?.id);

  sendResponse<User | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully!',
    data: result,
  });
});

export const ProfileController = {
  getSingleUser,
};
