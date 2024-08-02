import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TBlog } from './blog.interface';
import { BlogModel } from './blog.model';
import { LikeModel } from '../like/like.model';
import { UserModel } from '../user/user.model';
// @ts-ignore
const createBlogIntoDB = async (payload: TBlog, user) => {
  const { role } = user;
  const findUser = await UserModel.findById(payload.author);
  if (!findUser) {
    throw new AppError(httpStatus.NOT_FOUND, "Cloudn't find the user");
  }
  const result = await BlogModel.create({
    ...payload,
    status: role == 'admin' ? 'approved' : 'pending',
  });
  return result;
};

const getBlogFromDb = async (query: Partial<TBlog>) => {
  console.log(query);
  const result = await BlogModel.find(query).populate('author');
  return result;
};
const getSingleBlogFromDb = async (id: string) => {
  const result = await BlogModel.findOne({ _id: id }).populate('author');
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Coludn't found the item");
  } else {
    
    const Like = await LikeModel.find({
      blogId: id,
      // @ts-ignore
      userId: result?.author._id,
    });
    // const data = {result[0]}
    console.log({ ...result, ...Like });
    return { blog: result, Like: Like.length };
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
export const BlogServices = {
  createBlogIntoDB,
  getBlogFromDb,
  updateBlogFromDb,
  deleteBlogFromDb,
  getSingleBlogFromDb,
  GiveLikeToBlogToDb,
  RemoveLikeToBlogToDb,
};
