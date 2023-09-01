import { Order } from '@prisma/client';
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

const getAllOrder = async (): Promise<Order[]> => {
  const allOrder = await prisma.order.findMany();

  return allOrder;
};

export const OrderService = {
  createOrder,
  getAllOrder,
};
