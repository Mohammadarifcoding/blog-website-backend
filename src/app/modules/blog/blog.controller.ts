import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BlogServices } from './blog.service';
import { RequestHandler } from 'express';

const getSingleBlog: RequestHandler = catchAsync(async (req, res) => {
  const result = await BlogServices.getBlogFromDb(req.params);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog is retrieved succesfully',
    data: result,
  });
});

const updateBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { Blog } = req.body;
  const result = await BlogServices.updateBlogFromDb(id, Blog);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog is updated succesfully',
    data: result,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BlogServices.deleteBlogFromDb(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog is deleted succesfully',
    data: result,
  });
});

export const BlogControllers = {
  getSingleBlog,
  deleteBlog,
  updateBlog,
};
