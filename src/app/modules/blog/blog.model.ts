import { Schema, model } from 'mongoose';
import { TBlog, TImage } from './blog.interface';

// const imageSchema = new Schema<TImage>({
//   url: { type: String, required: true },
// });
const BlogSchema = new Schema<TBlog>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: { type: [String], default: [] },
    category: { type: String, required: true },
    images: { type: String, default: [] },
    author: { type: String, required: true, ref: 'User' },
    featured: { type: Boolean, default: false },
    status: { type: String, enum: ['pending', 'approved'], default: 'pending' },
    postType: { type: String, enum: ['admin', 'guest'] },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);
BlogSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'blogId',
});

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
