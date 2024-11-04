import { postInterface } from "../../model/post";
import postService from "../../services/post.service";
import { sendNotification } from "./notification.resolver";

export const postResolver = {
    Query:{
        getPosts: async()=> await postService.getAllPost()
    },
    Mutation:{
        createPost: async(_:any,args:postInterface)=>{
            const post=await postService.createPost(args);
            sendNotification(`New post created: ${post.title}`);
            return post
        }
    }
}