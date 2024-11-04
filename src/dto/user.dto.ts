import { userInterface } from "../model/user";

export class userDTO{
    id:string
    name:string;
    email:string;
    constructor(userInfo:userInterface){
        this.id=userInfo._id.toString();
        this.name=userInfo.name;
        this.email=userInfo.email
    }
}