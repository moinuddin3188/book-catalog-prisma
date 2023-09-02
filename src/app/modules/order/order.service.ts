import { Order } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { ICreateOrderRequest } from './order.Interface';

const createOrder = async (
  userId: string,
  data: ICreateOrderRequest
): Promise<Order> => {
  const newOrder = await prisma.order.create({
    data: {
      userId,
      orderedBooks: data.orderedBooks,
    },
  });

  return newOrder;
};

const getAllOrder = async (userId: string): Promise<Order[]> => {
  const allOrder = await prisma.order.findMany({
    where: {
      userId: userId,
    },
  });

  return allOrder;
};

const getAllOrderForAUser = async (userId: string): Promise<Order[]> => {
  const allOrder = await prisma.order.findMany({
    where: {
      userId,
    },
  });

  return allOrder;
};

const getSingleOrder = async (
  id: string,
  userId: string,
  role: string
): Promise<Order | null> => {
  const singleOrder = await prisma.order.findUnique({
    where: {
      id,
    },
  });

  if (role === 'customer' && singleOrder?.userId !== userId) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
  }

  return singleOrder;
};

export const OrderService = {
  createOrder,
  getAllOrder,
  getAllOrderForAUser,
  getSingleOrder,
};
