import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';

const getUserProfile = async (id: string): Promise<User | null> => {
  const singleUser = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return singleUser;
};

export const ProfileService = {
  getUserProfile,
};
