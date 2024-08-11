import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { BlogModel } from '../blog/blog.model';
import { TReview } from './review.interface';
import { ReviewModel } from './review.model';

const createReviewIntoDB = async (payload: TReview) => {
  const checkData = await BlogModel.find({ _id: payload.blogId });
  if (!checkData) {
    throw new AppError(httpStatus.NOT_FOUND, "This blog doesn't exits");
  }
  const result = await ReviewModel.create(payload);
  return result;
};

export const reviewService = {
  createReviewIntoDB,
};
