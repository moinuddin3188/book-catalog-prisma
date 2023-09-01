import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';

const getAllUser = async (): Promise<Omit<User, 'password'>[]> => {
  const allUsers = await prisma.user.findMany({
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

  return allUsers;
};

const getSingleUser = async (
  id: string
): Promise<Omit<User, 'password'> | null> => {
  const singleUser = await prisma.user.findUnique({
    where: {
      id,
    },
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

  return singleUser;
};

export const UserService = {
  getAllUser,
  getSingleUser,
};
