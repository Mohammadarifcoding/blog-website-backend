import { Router } from 'express';

import { AuthRoutes } from '../modules/user/user.route';
import { BlogRoutes } from '../modules/blog/bllog.route';


const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path:'/blog',
    route:BlogRoutes
  }

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
