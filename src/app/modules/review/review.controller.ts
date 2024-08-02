import { RequestHandler } from "express"
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import httpStatus from "http-status"
import { reviewService } from "./review.service"

const CreateReview:RequestHandler = catchAsync(async(req,res)=>{
    const result = await reviewService.createReviewIntoDB(req.body)
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: 'Created Review',
        data: result,
    })
})


export const ReviewController = {
    CreateReview
}