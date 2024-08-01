import { z } from 'zod';

// Blog validation schema
const LikeValidationSchema = z.object({
  body: z.object({
    blogId:z.string(),
    userId:z.string()
  }),
});


export const LikeValidation = { LikeValidationSchema };
