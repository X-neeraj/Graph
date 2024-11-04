import { userInterface } from "../../model/user";
import userService from "../../services/user.service"
import { sendNotification } from "./notification.resolver";

export const userResolver = {
    Query:{
        getUsers: async ()=> await userService.allUsers(),
        getUserById: async (_:any,{id}:{id:string})=> await userService.getUser(id),
    },
    Mutation:{
        createUser: async (_:any,args:userInterface)=>{
            return await userService.newUser(args);
        },
        followUser: async (_:any,args:any)=>{
            return await userService.followUser(args);
        }
    }
}