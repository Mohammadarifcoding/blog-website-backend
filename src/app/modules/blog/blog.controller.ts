import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BlogServices } from './blog.service';
import { RequestHandler } from 'express';

const createBlog: RequestHandler = catchAsync(async (req, res) => {
  // @ts-ignore
  const result = await BlogServices.createBlogIntoDB(req.body,req.user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog is created succesfully',
    data: result,
  });
});

const getAllBlog: RequestHandler = catchAsync(async (req, res) => {
  const result = await BlogServices.getBlogFromDb(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog is retrieved succesfully',
    data: result,
  });
});

const getSingleBlog: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BlogServices.getSingleBlogFromDb(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog is retrieved succesfully',
    data: {...result},
  });
});

const updateBlog = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await BlogServices.updateBlogFromDb(id, req.body);

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

const SearchBlog = catchAsync(async (req, res) => {
  const {search} = req.query
  const result = await BlogServices.SearchBlogFromDb(search as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog fetched succesfully',
    data: result,
  });
});
// const GiveLikeToBlog = catchAsync(async (req, res) => {
//   const { id } = req.params;
//   const result = await BlogServices.GiveLikeToBlogToDb(id);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Give like to Blog',
//     data: result,
//   });
// });
const RemoveLikeToBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BlogServices.RemoveLikeToBlogToDb(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Remove like from Blog',
    data: result,
  });
});

export const BlogControllers = {
  getSingleBlog,
  deleteBlog,
  updateBlog,
  createBlog,RemoveLikeToBlog,
  getAllBlog,SearchBlog
};
