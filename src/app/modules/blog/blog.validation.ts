import { z } from 'zod';

// Image validation schema
const imageValidationSchema = z.object({
  url: z.string().url('Invalid URL'),
});

// Blog validation schema
const blogValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    content: z.string(),
    // author: z.string(),
    tags: z.array(z.string()).optional(),
    category: z.string(),
    images: z.string(),
    isDeleted: z.boolean().default(false).optional(),
    featured:z.boolean().default(false),
    status:z.enum(['pending','approved']).default('pending')
  }),
});

const UpdateBlogValidation = z.object({
  body: z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    // author: z.string().optional(),
    tags: z.array(z.string()).optional(),
    category: z.string().optional(),
    images: z.string().optional(),
    isDeleted: z.boolean().default(false).optional(),
    featured:z.boolean().default(false).optional(),
    status:z.enum(['pending','approved']).default('pending').optional()
  }),
});

export const BlogValidation = { blogValidationSchema, UpdateBlogValidation };
