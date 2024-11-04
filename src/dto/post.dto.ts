import { postInterface } from "../model/post";

export class postDTO{
    userId:string;
    title:string;
    content:string;
    constructor(userInfo:postInterface){
        this.userId=userInfo.userId.toString();
        this.title=userInfo.title;
        this.content=userInfo.content
    }
}