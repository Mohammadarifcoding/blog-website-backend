import { LikeModel } from "./like.model"

const DoInteractionToBlogInDb = async(blogId:string,userId:string)=>{
    const findLike = await LikeModel.find({blogId:blogId,userId:userId})
    if(findLike){
        const deleteLike = await LikeModel.deleteOne({blogId:blogId,userId:userId})
        return deleteLike
    }
    const addLike = await LikeModel.create({blogId:blogId,userId:userId})
    return addLike
}

const CheckInteractionByDb = async(blogId:string,userId:string)=>{
  let result = false
  const findLike = await LikeModel.find({blogId:blogId,userId:userId})
  if(findLike){
    result = true
  }
  return result

}
export const LikeService = {
    DoInteractionToBlogInDb,CheckInteractionByDb
}