import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BlogControllers } from './blog.controller';

const router = express.Router();

router.get('/', auth('admin', 'user'), BlogControllers.getAllBlog);

router.get('/:id', auth('admin', 'user'), BlogControllers.getSingleBlog);
router.post('/', auth('admin', 'user'), BlogControllers.createBlog);
router.patch('/:id', auth('admin', 'user'), BlogControllers.updateBlog);
router.delete('/:id', auth('admin','user'),BlogControllers.deleteBlog);


export const BlogRoutes = router;
