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

export const OrderService = {
  createOrder,
};
