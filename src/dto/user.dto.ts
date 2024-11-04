import { userInterface } from "../model/user";

export class userDTO{
    id:string
    name:string;
    email:string;
    user_following:any;
    user_followers:any;
    constructor(userInfo:userInterface){
        this.id=userInfo._id.toString();
        this.name=userInfo.name;
        this.email=userInfo.email;
        this.user_following=userInfo.user_following;
        this.user_followers=userInfo.user_followers;
    }
}