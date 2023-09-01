import { User } from '@prisma/client';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';
import { ILoginUser, ILoginUserResponse } from './auth.interface';

const userSignUp = async (userData: User): Promise<Omit<User, 'password'>> => {
  const newUser = await prisma.user.create({
    data: userData,
    select: {
      id: true,
      name: true,
      email: true,
      contactNo: true,
      address: true,
      role: true,
      createdAt: true,
      updatedAt: true,
      profileImg: true,
    },
  });

  if (!newUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to sign up!');
  }

  return newUser;
};

const userLogin = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { email: userEmail, password } = payload;

  const isUserExist = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User doesn't exist");
  }

  if (isUserExist.password && password !== isUserExist.password) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'Password or email is not correct'
    );
  }

  // create access token and refresh token
  const { email, role } = isUserExist;

  const accessToken = jwtHelpers.createToken(
    {
      email,
      role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    {
      email,
      role,
    },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const AuthService = {
  userSignUp,
  userLogin,
};
