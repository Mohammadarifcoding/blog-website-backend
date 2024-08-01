
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TBlog } from './blog.interface';
import { BlogModel } from './blog.model';
import { LikeModel } from '../like/like.model';

const createBlogIntoDB = async (payload: TBlog) => {
  const result = await BlogModel.create(payload);
  
  return result;
};

const getBlogFromDb = async (query: Partial<TBlog>) => {
  console.log(query)
  const result = await BlogModel.find(query).populate('userId');
  return result;
};
const getSingleBlogFromDb = async(id:string)=>{
    const result = await BlogModel.findOne({_id:id}).populate('userId')
    const Like = await LikeModel.find({blogId:id,userId:result?.author})
    if(!result){
      throw new AppError(httpStatus.NOT_FOUND,"Coludn't found the item")
    }
    else{
      return {...result ,like: Like.length}
    }
    
}

const updateBlogFromDb = async (id: string, payload: Partial<TBlog>) => {
  console.log(id)
  console.log(payload)
  const findData = await BlogModel.findById(id)
  if(!findData){
    throw new AppError(httpStatus.NOT_FOUND,"Clound't find the data")
  }
  const result = await BlogModel.findByIdAndUpdate( id , payload, {
    new: true,
  });
  return result;
};

const deleteBlogFromDb = async (id: string) => {
  const findData = await BlogModel.findById(id)
  if(!findData){
    throw new AppError(httpStatus.NOT_FOUND,"Coludn't found the data")
  }
  const result = await BlogModel.deleteOne({ _id: id });
  return result;
};

const GiveLikeToBlogToDb = async(id:string)=>{
  const findData = await BlogModel.findById(id)
  if(!findData){
    throw new AppError(httpStatus.NOT_FOUND,"Coludn't found the data")
  }
  const result = await BlogModel.findOneAndUpdate({_id:id},{$inc: {likes: 1}},{new:true})
  return result

}
const RemoveLikeToBlogToDb = async(id:string)=>{
  const findData = await BlogModel.findById(id)
  if(!findData){
    throw new AppError(httpStatus.NOT_FOUND,"Coludn't found the data")
  }
  const result = await BlogModel.findOneAndUpdate({_id:id},{$inc: {likes: -1}},{new:true})
  return result

}
export const BlogServices = {
  createBlogIntoDB,
  getBlogFromDb,
  updateBlogFromDb,
  deleteBlogFromDb,
  getSingleBlogFromDb,GiveLikeToBlogToDb,RemoveLikeToBlogToDb
};
