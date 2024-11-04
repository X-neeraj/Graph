import userDAO from "../dao/user.dao";
import { userDTO } from "../dto/user.dto";
import { userInterface } from "../model/user";

class userService{
    async newUser(userInfo:userInterface){
        const newUser=await userDAO.createUser(userInfo);
        return new userDTO(newUser);
    }
    async getUser(userId:string){
        const user:any = await userDAO.findUser(userId);
        return new userDTO(user);
    }
    async allUsers(){
        const users= await userDAO.getUsers();
        const res=users.map(user => new userDTO(user))
        return res;
    }
}

export default new userService();