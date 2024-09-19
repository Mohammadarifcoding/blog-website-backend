import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { LikeModel } from '../like/like.model';
import { ReviewModel } from '../review/review.model';
import { TBlog } from './blog.interface';
import { BlogModel } from './blog.model';
import mongoose from 'mongoose';
// @ts-ignore
const createBlogIntoDB = async (payload: TBlog, user) => {
  const { role } = user;
  const result = await BlogModel.create({
    ...payload,
    status: role == 'admin' ? 'approved' : 'pending',
    author: user._id,
    postType: role == 'admin' ? 'admin' : 'guest',
  });
  return result;
};

const getBlogFromDb = async (query: Partial<TBlog>) => {
  console.log(query);
  const title = ['title', 'content'];
  const blogQuery = new QueryBuilder(
    BlogModel.find({ status: 'approved' })
      .populate('author')
      .populate('reviews'),
    query,
  )
    .search(title)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await blogQuery.modelQuery;
  const newData = new QueryBuilder(
    BlogModel.find({ status: 'approved' })
      .populate('author')
      .populate('reviews'),
    query,
  )
    .search(title)
    .filter()
    .sort()
    .fields();
  const data = await newData.modelQuery;
  return { result: [...result], totalBlog: data.length };
};

const getSingleBlogFromDb = async (id: string) => {
  const result = await BlogModel.findOne({ _id: id }).populate('author');
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Coludn't found the item");
  } else {
    const Like = await LikeModel.find({
      blogId: id,
    });
    const review = await ReviewModel.find({
      blogId: id,
    }).populate('userId');
    // const data = {result[0]}t
    console.log({ ...result, ...Like });
    const relatedBlogs = await BlogModel.find({
      _id: { $ne: result._id },
      category: result.category,
    });
    return { blog: result, Like: Like.length, review: review, relatedBlogs };
  }
};

const updateBlogFromDb = async (id: string, payload: Partial<TBlog>) => {
  console.log(id);
  console.log(payload);
  const findData = await BlogModel.findById(id);
  if (!findData) {
    throw new AppError(httpStatus.NOT_FOUND, "Clound't find the data");
  }
  const result = await BlogModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deleteBlogFromDb = async (id: string) => {
  const findData = await BlogModel.findById(id);
  if (!findData) {
    throw new AppError(httpStatus.NOT_FOUND, "Coludn't found the data");
  }
  const result = await BlogModel.deleteOne({ _id: id });
  return result;
};

const GiveLikeToBlogToDb = async (id: string) => {
  const findData = await BlogModel.findById(id);
  if (!findData) {
    throw new AppError(httpStatus.NOT_FOUND, "Coludn't found the data");
  }
  const result = await BlogModel.findOneAndUpdate(
    { _id: id },
    { $inc: { likes: 1 } },
    { new: true },
  );
  return result;
};
const RemoveLikeToBlogToDb = async (id: string) => {
  const findData = await BlogModel.findById(id);
  if (!findData) {
    throw new AppError(httpStatus.NOT_FOUND, "Coludn't found the data");
  }
  const result = await BlogModel.findOneAndUpdate(
    { _id: id },
    { $inc: { likes: -1 } },
    { new: true },
  );
  return result;
};

const GetUserBlogFromDb = async (id: string) => {
  // const title = ['title', 'content', 'tags', 'category'];
  // const blogQuery = new QueryBuilder(
  //   BlogModel.find({ author: id }).populate('author').populate('reviews'),
  //   query,
  // )
  //   .search(title)
  //   .filter()
  //   .sort()
  //   .paginate()
  //   .fields();
  // const result = await blogQuery.modelQuery;
  // const totalBlog = await BlogModel.find({ author: id });
  // return { result: [...result], totalBlog: totalBlog.length };
  console.log(id)
  const result = await BlogModel.find({ author: new mongoose.Types.ObjectId(id) })
    .populate('author')
    .populate('reviews');
  return result;
};

const GetAllBlogIncludingPendingApprovedFromDb = async (
  query: Partial<TBlog>,
) => {
  const title = ['title', 'content', 'tags', 'category'];
  const blogQuery = new QueryBuilder(
    BlogModel.find().populate('author').populate('reviews'),
    query,
  )
    .search(title)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await blogQuery.modelQuery;
  return result;
};
export const BlogServices = {
  createBlogIntoDB,
  getBlogFromDb,
  updateBlogFromDb,
  deleteBlogFromDb,
  GetAllBlogIncludingPendingApprovedFromDb,
  getSingleBlogFromDb,
  GiveLikeToBlogToDb,
  RemoveLikeToBlogToDb,
  GetUserBlogFromDb,
};
