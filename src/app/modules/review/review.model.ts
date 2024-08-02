import { model, Schema } from 'mongoose';
import { TReview } from './review.interface';


const ReviewSchema = new Schema<TReview>(
  {
    blogId: {
      type: String,
      required: true,
      ref: 'Blog',
    },
    userId: {
      type: String,
      required: true,
      ref: 'User',
    },
    review:{
        type:'String',
        required:true
    }
  },
  {
    timestamps: true,
  },
);

export const ReviewModel = model<TReview>('Review', ReviewSchema);
