import { postInterface } from "../../model/post";
import postService from "../../services/post.service";
import userService from "../../services/user.service";
import { sendNotification } from "./notification.resolver";

export const postResolver = {
    Query:{
        getPosts: async()=> await postService.getAllPost()
    },
    Mutation:{
        createPost: async(_:any,args:postInterface,context:any)=>{
            if (!context.user) throw new Error("Authentication required");
            // console.log(context)
            const newArgs:any={...args,userId:context.user._id}
            const post=await postService.createPost(newArgs);
            const user=await userService.getUser(post.userId)
            // console.log(user.user_followers)
            user.user_followers.forEach((consumerId: string) => {
                sendNotification(consumerId,`${user.name} just posted a new post`);
            });
            return post
        }
    }
}