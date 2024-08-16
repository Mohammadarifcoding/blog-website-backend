import { LikeModel } from "./like.model"

const DoInteractionToBlogInDb = async(blogId:string,userId:string)=>{
    const findLike = await LikeModel.find({blogId:blogId,userId:userId})
    if(findLike.length){
        const deleteLike = await LikeModel.deleteOne({blogId:blogId,userId:userId})
        return deleteLike
    }
    const addLike = await LikeModel.create({blogId:blogId,userId:userId})
    return addLike
}

const CheckInteractionByDb = async(blogId:string,userId:string)=>{
  let result = false
  const findLike = await LikeModel.findOne({blogId:blogId,userId:userId})
  if(findLike){
    result = true
  }
  else{
    result = false
  }
  return result

}


const CountLikeFromDb = async(blogId:string)=>{
  const result = await LikeModel.find({blogId:blogId})
  return result
}
export const LikeService = {
    DoInteractionToBlogInDb,CheckInteractionByDb,CountLikeFromDb
}