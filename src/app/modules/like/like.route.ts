import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BlogControllers } from './blog.controller';
import { BlogValidation } from './blog.validation';

const router = express.Router();

router.get('/',  BlogControllers.getAllBlog);

router.get('/:id',  BlogControllers.getSingleBlog);
router.post(
  '/',
  
  validateRequest(BlogValidation.blogValidationSchema),
  BlogControllers.createBlog,
);
router.patch(
  '/:id',
  
  validateRequest(BlogValidation.UpdateBlogValidation),
  BlogControllers.updateBlog,
);
router.delete('/:id',  BlogControllers.deleteBlog);

export const BlogRoutes = router;
