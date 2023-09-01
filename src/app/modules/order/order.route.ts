import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { OrderController } from './order.controller';
import { OrderValidation } from './order.validation';

const router = express.Router();

router.post(
  '/create-order',
  validateRequest(OrderValidation.createOrder),
  OrderController.createOrder
);

router.get('/', OrderController.getAllOrder);

router.get('/:id', OrderController.getSingleOrder);

export const OrderRoutes = router;
