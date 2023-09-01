import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { BookRoutes } from '../modules/book/book.route';
import { CategoryRoutes } from '../modules/category/category.route';
import { OrderRoutes } from '../modules/order/order.route';
import { ProfileRoutes } from '../modules/profile/profile.route';
import { UserRoutes } from '../modules/user/user.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    routes: AuthRoutes,
  },
  {
    path: '/users',
    routes: UserRoutes,
  },
  {
    path: '/profile',
    routes: ProfileRoutes,
  },
  {
    path: '/categories',
    routes: CategoryRoutes,
  },
  {
    path: '/books',
    routes: BookRoutes,
  },
  {
    path: '/orders',
    routes: OrderRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
