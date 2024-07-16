import { model, Schema } from 'mongoose';
import { TLike } from './like.interface';

const LikeSchema = new Schema<TLike>(
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
  },
  {
    timestamps: true,
  },
);

export const LikeModel = model<TLike>('Like', LikeSchema);
