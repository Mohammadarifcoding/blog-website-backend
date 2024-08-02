import { Router } from 'express';

import { AuthRoutes } from '../modules/user/user.route';
import { BlogRoutes } from '../modules/blog/bllog.route';
import { LikeRoutes } from '../modules/like/like.route';
import { ReviewRoutes } from '../modules/review/review.route';


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
  },
  {
    path:'/review',
    route:ReviewRoutes
  }

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
