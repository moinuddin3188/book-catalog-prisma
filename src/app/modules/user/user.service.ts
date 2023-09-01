import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';

const getAllUser = async (): Promise<Omit<User, 'password'>[]> => {
  const allUsers = await prisma.user.findMany();

  return allUsers;
};

export const UserService = {
  getAllUser,
};
