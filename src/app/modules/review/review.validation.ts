import { z } from 'zod';

// Blog validation schema
const ReviewValidationSchema = z.object({
  body: z.object({
    blogId:z.string(),
    userId:z.string(),
    review:z.string()
  }),
});


export const ReviewValidation = { ReviewValidationSchema };
