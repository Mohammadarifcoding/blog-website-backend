import { z } from 'zod';

// Image validation schema
const imageValidationSchema = z.object({
  url: z.string().url("Invalid URL"),
  alt: z.string(),
});

// Blog validation schema
const blogValidationSchema = z.object({
  title: z.string(),
  content: z.array(z.string()).nonempty("Content is required"),
  author: z.string(),
  tags: z.array(z.string()).optional(),
  category: z.string(),
  images: z.array(imageValidationSchema).optional(),
  postType: z.enum(['guest', 'admin']).default('admin'),
  userId: z.string(),
  likes: z.number().default(0).optional(),
  isDeleted: z.boolean().default(false).optional(),
});


export const BlogValidation = {blogValidationSchema}
