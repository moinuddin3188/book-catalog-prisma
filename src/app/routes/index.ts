import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { BookRoutes } from '../modules/book/book.route';
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
    path: '/categories',
    routes: UserRoutes,
  },
  {
    path: '/books',
    routes: BookRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
