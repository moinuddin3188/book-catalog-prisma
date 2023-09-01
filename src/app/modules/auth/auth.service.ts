import { User } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const userSignUp = async (userData: User): Promise<User> => {
  const newUser = await prisma.user.create({
    data: userData,
  });

  if (!newUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to sign up!');
  }

  return newUser;
};

export const AuthService = {
  userSignUp,
};
