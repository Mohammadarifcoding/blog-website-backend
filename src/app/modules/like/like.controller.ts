import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
  
import { LikeService } from "./like.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const DoInteractionToBlog:RequestHandler = catchAsync(async(req,res)=>{
    const {blogId,userId} = req.body
    const result = await LikeService.DoInteractionToBlogInDb(blogId,userId)
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: 'Done interaction with the Blog',
        data: result,
    })
})


const CheckInteraction:RequestHandler = catchAsync(async(req,res)=>{
    const {blogId,userId} = req.body
    const result = await LikeService.CheckInteractionByDb(blogId,userId)
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: 'Checked the interaction',
        data: result,
    })
})


export const LikeController = {
    DoInteractionToBlog,CheckInteraction
}