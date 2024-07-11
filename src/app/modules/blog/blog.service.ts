import httpStatus, { REQUEST_URI_TOO_LONG } from 'http-status';
import AppError from '../../errors/AppError';
import { TBlog } from './blog.interface';
import { BlogModel } from './blog.model';

const createBlogIntoDB = async (payload: TBlog) => {
  const result = await BlogModel.create(payload);
  return result;
};

const getBlogFromDb = async (query: Partial<TBlog>) => {
  const result = await BlogModel.find(query);
  return result;
};
const getSingleBlogFromDb = async(id:string)=>{
    const result = await BlogModel.find({_id:id})
    return result
}

const updateBlogFromDb = async (id: string, payload: Partial<TBlog>) => {
  const result = await BlogModel.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteBlogFromDb = async (id: string) => {
  const result = await BlogModel.deleteOne({ _id: id });
  return result;
};

export const BlogServices = {
  createBlogIntoDB,
  getBlogFromDb,
  updateBlogFromDb,
  deleteBlogFromDb,
  getSingleBlogFromDb
};
