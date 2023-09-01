import { z } from 'zod';

const createOrder = z.object({
  body: z.object({
    orderedBooks: z.array(
      z.object(
        {
          bookId: z.string({
            required_error: 'Book id required',
          }),
          quantity: z.number({
            required_error: 'Quantity is required',
          }),
        },
        {
          required_error: 'Ordered books is required',
        }
      )
    ),
  }),
});

export const OrderValidation = {
  createOrder,
};
