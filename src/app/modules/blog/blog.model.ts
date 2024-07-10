import { Schema, model } from 'mongoose';
import { TBlog, TImage } from './blog.interface';

const imageSchema = new Schema<TImage>({
  url: { type: String, required: true },
});

const BlogSchema = new Schema<TBlog>(
  {
    title: { type: String, required: true },
    content: { type: [String], required: true },
    author: { type: String, required: true },
    tags: { type: [String], default: [] },
    category: { type: String, required: true },
    images: { type: [imageSchema], default: [] },
    postType: { type: String, enum: ['guest', 'admin'], required: true },
    userId: { type: String, required: true },
    likes: { type: Number, default: 0 },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

BlogSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

BlogSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

BlogSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

export const BlogModel = model<TBlog>('Blog', BlogSchema);
