import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BlogServices } from './blog.service';

const createBlog: RequestHandler = catchAsync(async (req, res) => {
  // @ts-ignore
  const result = await BlogServices.createBlogIntoDB(req.body, req.user);
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
    data: { ...result },
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
const GetUserBlog = catchAsync(async (req, res) => {
  // @ts-ignore
  const { _id } = req.user;

  const result = await BlogServices.GetUserBlogFromDb(_id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Fetched user blog from db',
    data: result,
  });
});
const getAllPendingApprovedBlog: RequestHandler = catchAsync(
  async (req, res) => {
    const result = await BlogServices.GetAllBlogIncludingPendingApprovedFromDb(
      req.query,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All type of blog retrieved successfully',
      data: result,
    });
  },
);

export const BlogControllers = {
  getSingleBlog,
  deleteBlog,
  updateBlog,
  createBlog,
  RemoveLikeToBlog,
  getAllPendingApprovedBlog,
  getAllBlog,
  GetUserBlog,
};
