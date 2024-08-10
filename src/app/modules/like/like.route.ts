import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { LikeController } from './like.controller';
import { LikeValidation } from './like.validation';
import auth from '../../middlewares/auth';

const router = express.Router();

router.patch(
  '/',
  auth('user','admin'),
  validateRequest(LikeValidation.LikeValidationSchema),
  LikeController.DoInteractionToBlog,
);
router.get('/check',auth('user','admin'),validateRequest(LikeValidation.LikeValidationSchema),LikeController.CheckInteraction)

export const LikeRoutes = router;
