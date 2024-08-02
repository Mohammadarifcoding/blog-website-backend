import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { LikeController } from './like.controller';
import { LikeValidation } from './like.validation';

const router = express.Router();

router.patch(
  '/',
  validateRequest(LikeValidation.LikeValidationSchema),
  LikeController.DoInteractionToBlog,
);
router.get('/check',validateRequest(LikeValidation.LikeValidationSchema),LikeController.CheckInteraction)

export const LikeRoutes = router;
