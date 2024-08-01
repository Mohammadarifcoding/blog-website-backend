import { Router } from 'express';

import { AuthRoutes } from '../modules/user/user.route';
import { BlogRoutes } from '../modules/blog/bllog.route';
import { LikeRoutes } from '../modules/like/like.route';


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
  ,
  {
    path:'/like',
    route:LikeRoutes
  }

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
