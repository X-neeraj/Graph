import userDAO from "../dao/user.dao";
import { userDTO } from "../dto/user.dto";
import { userInterface } from "../model/user";
import bcrypt from "bcrypt"
import { generateJwtToken } from "../utils/generateJwt";

class userService{
    async newUser(userInfo:userInterface){
        const userToCreate:any = { ...userInfo };
        const salt = await bcrypt.genSalt(10);
        userToCreate.password = await bcrypt.hash(userToCreate.password, salt);
        const newUser=await userDAO.createUser(userToCreate);
        const token = await generateJwtToken(newUser.email, newUser._id);
        console.log(token)
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
    async followUser(args:any){
        const {currUser,followUser}=args;
        const user:any=await userDAO.followUser(currUser,followUser);
        return new userDTO(user);
    }
    async loginUser(args:any){
         const { email , password }=args;
         const user = await userDAO.findUserByEmail(email);
         if (!user) {
            //  throw new appError("User not found",401);
             throw new Error("User not found");
         }
         const isPasswordValid = await this.comparePassword(password, user.password);
         if (!isPasswordValid) {
            //  throw new appError("Invalid credentials",404);
             throw new Error("Invalid credentials");
         }
         const userInfo = new userDTO(user);
        //  console.log(user)
         const token = await generateJwtToken(user.email, user._id.toString());
        console.log(token)
         return { userInfo };
    }
    async comparePassword(enteredPassword: string, savedPassword: string): Promise<boolean> {
        return bcrypt.compare(enteredPassword, savedPassword);
    }
}

export default new userService();