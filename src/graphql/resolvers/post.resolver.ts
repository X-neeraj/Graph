import { postInterface } from "../../model/post";
import postService from "../../services/post.service";

export const postResolver = {
    Query:{
        getPosts: async()=> await postService.getAllPost()
    },
    Mutation:{
        createPost: async(_:any,args:postInterface)=>{
            return await postService.createPost(args)
        }
    }
}