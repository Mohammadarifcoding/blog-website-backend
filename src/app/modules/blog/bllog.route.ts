import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BlogControllers } from './blog.controller';
import { BlogValidation } from './blog.validation';

const router = express.Router();

router.get('/', BlogControllers.getAllBlog);

router.get('/:id',  BlogControllers.getSingleBlog);
router.post(
  '/',
  auth('user', 'admin'),
  validateRequest(BlogValidation.blogValidationSchema),
  BlogControllers.createBlog,
);
router.patch(
  '/:id',
  auth('user', 'admin'),
  validateRequest(BlogValidation.UpdateBlogValidation),
  BlogControllers.updateBlog,
);
router.delete('/:id',auth('user', 'admin'),  BlogControllers.deleteBlog);


export const BlogRoutes = router;
