import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ReviewValidation } from './review.validation';
import { ReviewController } from './review.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(ReviewValidation.ReviewValidationSchema),
  ReviewController.CreateReview,
);

export const ReviewRoutes = router;
